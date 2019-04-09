import { init, axes, initPerspective } from "../utils";
import {
  OrthographicCamera,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  DoubleSide,
  PlaneGeometry,
  MeshLambertMaterial,
  PointLight
} from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { CircleGeometry } from "three";
import throttle from "lodash.throttle";
import { Group } from "three";
// Sintaxe de desestruturação de vetor, dado que retorno é uma tupla de variáveis
let [
  zScene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();
// Variáveis globais
let depth = 1;
let currentGroup = 0;
// Camera da primeira viewport
const zCamera = new OrthographicCamera(-1, 1, 1, -1, -1000, 10000);
// Camera da segunda viewport, com aspect ratio correto para meia tela
const halfAspect = (width / 2 - 2) / height;
const [pScene, pRenderer, perspectiveCamera] = initPerspective(
  60,
  halfAspect,
  0.2,
  1000,
  // Cena da segunda viewport com luzes mais próximas e camera inicialmente em (2,2,2)
  {
    camera: {
      position: [2, 2, 2],
      lookAt: [0, 0, 0]
    },
    lights: {
      scale: 0.01
    }
  }
);
// Adiciona eixos às cenas
zScene.add(axes());
pScene.add(axes());

// Cria grupos de controle e adiciona às telas
const perspectiveGroups = [new Group(), new Group(), new Group()];
const ortogonalGroups = [new Group(), new Group(), new Group()];
/**
 * Sintaxe de spread de vetor para parametro. Equivale a
 * zScene.add(ortogonalGroups[0], ortogonalGroups[1], ortogonalGroups[2])
 * pScene.add(perspectiveGroups[0], perspectiveGroups[1], perspectiveGroups[2])
 */
zScene.add(...ortogonalGroups);
pScene.add(...perspectiveGroups);
let pGroup = perspectiveGroups[currentGroup];
let zGroup = ortogonalGroups[currentGroup];

// Controles para a camera com mouse. Importado de [OrbitControls](https://threejs.org/docs/#examples/controls/OrbitControls)
const controls = new OrbitControls(
  perspectiveCamera,
  renderer.domElement,
  window
);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Settings do renderizador
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

// Atualizador do título
const updateTitle = () => {
  document.title = `Grupo: ${currentGroup + 1} - Altura: ${depth}`;
};

// Loop de renderização
const render = () => {
  requestAnimationFrame(render);
  // Atualiza título
  updateTitle();
  // Atualiza controles da camera e limpa buffers de cor
  controls.update();
  renderer.clear();
  // Viewport da camera ortográfica de x = 1 até x / 2 - 1
  renderer.setViewport(1, 1, width / 2 - 2, height);
  renderer.render(zScene, zCamera);
  // Viewport da camera em perpectiva de x / 2 + 1 até x - 1
  renderer.setViewport(width / 2 + 1, 1, width / 2 - 2, height);
  renderer.render(pScene, perspectiveCamera);
};
render();

// Eventos mouse/teclado

// Clique na tela
function onMouseDown(event: MouseEvent) {
  /**
   * Botões (event.which):
   * 1 - Botão esquerdo
   * 2 - Botão do meio
   * 3 - Botão direito
   */
  // Se botão usado for 3, chame o handler correto
  if (event.which === 3) return onRightClick(event);
  // Normaliza clique de -1 a 1 na tela inteira
  let x = (event.clientX / window.innerWidth) * 2 - 1;
  // Orientação de Y é de baixo para cima
  let y = -(event.clientY / window.innerHeight) * 2 + 1;
  // Se clique é na primeira metade,  -1 <= x <= 0
  if (x < 0) {
    // Re-normaliza intervalo [-1, 0] pra [-1, 1]
    x = (x + 0.5) * 2;
    // Cria o ponto da cena ortográfica
    const geo = new CircleGeometry(0.01, 16);
    const mat = new MeshBasicMaterial({
      // Muda cor dos pontos dependendo da profundidade
      /**
       * 1 => Branco
       * 2 => Vermelho
       * 3 => Verde
       */
      color:
        currentGroup === 0
          ? 0xffffff
          : currentGroup === 1
          ? 0xff0000
          : 0x00ff00,
      side: DoubleSide
    });
    const circle = new Mesh(geo, mat);
    // Posiciona círculo no click e adiciona à tela
    circle.position.x = x;
    circle.position.y = y;
    /**
     * Já deixa o ponto posicionado em Z para referenciar depois, como camera é Ortográfica
     * o que aparece na tela é igual, porém facilita para construir os quadrados com alturas
     * diferentes a seguir
     */
    circle.position.z = -0.3 * depth;
    zGroup.add(circle);
    // Seleciona os pontos dentro do grupo
    const dots = zGroup.children;
    // Adiciona retangulo na segunda cena se a primeira contiver mais de dois pontos
    if (dots.length >= 2) {
      // slice(-2) => Pega ultimos 2 vertices
      /**
       * [previous, current] = ...
       * Desestrutura o vetor em variáveis novas. Equivale à
       * const previous = dots.slice(-2)[0];
       * const current = dots.slice(-2)[1];
       */
      const [previous, current] = dots.slice(-2);
      // Cria um novo plano na origem
      var geometry = new PlaneGeometry(1, 1);
      // Reposiciona vérices na posição desejada
      /**
       * Disposição dos vérices na geometria é:
       *  0---1
       *  | / |
       *  2---3
       *
       * Ulitiza 0/2 como base e extrude 1/3
       */
      const vertices = geometry.vertices;
      // Posiciona os dois primeiros vertices na posição do clique anterior com um extrudido
      vertices[0].x = vertices[1].x = previous.position.x;
      vertices[0].y = vertices[1].y = previous.position.y;
      vertices[0].z = 0;
      vertices[1].z = previous.position.z;

      // Posiciona os dois ultimos vertices como onde clicou e o novo extrudido em profundidade
      vertices[2].x = vertices[3].x = current.position.x;
      vertices[2].y = vertices[3].y = current.position.y;
      vertices[2].z = 0;
      vertices[3].z = current.position.z;

      // Cria plano já reposicionado e adiciona à cena em perspectiva
      var material = new MeshLambertMaterial({
        color: 0xffff00,
        side: DoubleSide
      });
      var plane = new Mesh(geometry, material);
      pGroup.add(plane);
    }
  }
}

const onRightClick = (e: MouseEvent) => {
  // Remove o ponto da primeira cena e deleta sua geometria
  const dots = zGroup.children;
  // Pega o ultimo elemento, slice() retorna um vetor
  const lastChild = dots.slice(-1)[0] as Mesh;
  if (!lastChild) return;
  zGroup.remove(lastChild);
  // Deleta a geometria para liberar memória
  lastChild.geometry.dispose();

  // Remove plano da segunda cena e deleta sua geometria tal como acima
  const planes = pGroup.children;
  // Conflitos de tipo
  const lastPlane = planes.slice(-1)[0] as Mesh;
  if (!lastPlane) return;
  pGroup.remove(lastPlane);
  lastPlane.geometry.dispose();
};

const onKeydown = (e: KeyboardEvent) => {
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      // Avança nas cenas e atualiza variável global
      currentGroup = (currentGroup - 1 + 3) % 3;
      zGroup = ortogonalGroups[currentGroup];
      pGroup = perspectiveGroups[currentGroup];
      break;
    case "ArrowRight":
      // Volta uma cena e atualiza variável global
      currentGroup = (currentGroup + 1) % 3;
      zGroup = ortogonalGroups[currentGroup];
      pGroup = perspectiveGroups[currentGroup];
      break;
    // Casos abaixos alteram profundidade
    case "1":
      depth = 1;
      break;
    case "2":
      depth = 2;
      break;
    case "3":
      depth = 3;
      break;
  }
};

const basicOnMouseWheel = (e: Event) => {
  // Obtem posições atuais da camera
  // Sintaxe de desconstrução de objeto. Equivale à
  /**
   * const x = perspectiveCamera.position.x;
   * const y = perspectiveCamera.position.y;
   * const z = perspectiveCamera.position.z;
   */
  const { x, y, z } = perspectiveCamera.position;
  // Conflito de tipo
  if ((e as WheelEvent).deltaY < 0) {
    // Afasta em 5%
    perspectiveCamera.position.set(x * 1.05, y * 1.05, z * 1.05);
  } else {
    // Aproxima em 5%
    perspectiveCamera.position.set(x * 0.95, y * 0.95, z * 0.95);
  }
};

// Limita chamadas de evento a 60 fps para scroll mais natural. Função importada de [lodash.throttle](https://lodash.com/docs/4.17.11#throttle)
const onMouseWheel = throttle(basicOnMouseWheel, 1000 / 60);

const onWindowResize = () => {
  height = window.innerHeight;
  width = window.innerWidth;
  const halfAspect = (width / 2 - 2) / height;
  perspectiveCamera.aspect = halfAspect;
  perspectiveCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("keydown", onKeydown, false);
window.addEventListener("mousewheel", onMouseWheel, false);
