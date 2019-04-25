import {
  init,
  axes,
  degToRad,
  Point3D,
  download,
  upload,
  Title,
  controls as instructions
} from "../utils";
import model1 from "../../first.json";
import model2 from "../../second.json";
import model3 from "../../third.json";
import {
  OrthographicCamera,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  DoubleSide,
  PointLight
} from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { CircleGeometry } from "three";
import throttle from "lodash.throttle";
import { Group } from "three";
import { MeshPhongMaterial } from "three";
import { PerspectiveCamera } from "three";
import { Scene } from "three";
import { BoxGeometry } from "three";
import { Object3D } from "three";
import { Geometry } from "three";
instructions({
  "Setas dir/esq": "Muda grupo selecionado",
  "Setas cima/baixo": "Altera profundidade da seção",
  ", e . ": "Altera largura da seção",
  "s ": "Salva modelo atual",
  "l ": "Carrega um modelo salvo"
});
// Botões para carregar modelos
const button1 = document.createElement("button");
button1.innerText = "Modelo 1";
button1.onclick = () => {
  loadData(JSON.stringify(model1));
};
const button2 = document.createElement("button");
button2.innerText = "Modelo 2";
button2.onclick = () => {
  loadData(JSON.stringify(model2));
};
const button3 = document.createElement("button");
button3.innerText = "Modelo 3";
button3.onclick = () => {
  loadData(JSON.stringify(model3));
};
const wrapper = document.createElement("div");
wrapper.appendChild(button1);
wrapper.appendChild(button2);
wrapper.appendChild(button3);
wrapper.style.padding = "8px 6px";
wrapper.style.position = "fixed";
wrapper.style.top = "0";
wrapper.style.right = "0";
document.body.appendChild(wrapper);

// Sintaxe de desestruturação de vetor, dado que retorno é uma tupla de variáveis
let [
  zScene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();
// Variáveis globais
let depth = 1;
let boxWidth = 1;
let currentGroup = 0;
const title = new Title("");
// Camera da primeira viewport
const zCamera = new OrthographicCamera(-1, 1, 1, -1, -1000, 10000);
// Camera da segunda viewport, com aspect ratio correto para meia tela
const halfAspect = (width / 2 - 2) / height;
const perspectiveCamera = new PerspectiveCamera(60, halfAspect, 0.2, 1000);
perspectiveCamera.position.set(1.3, 1.3, 1.3);
perspectiveCamera.lookAt(0, 0, 0);
// Configura cena 3D com luzes posicionadas na camera e a 120 graus de rotacao dela
const pScene = new Scene();
const pLight = new PointLight(0xffffff, 1, 8, 2);
const pLight2 = new PointLight(0xffffff, 1, 8, 2);
pLight.position.copy(perspectiveCamera.position);
pLight2.position.copy(pLight.position);
pLight2.rotation.z = degToRad(120);
pScene.add(pLight);
pScene.add(pLight2);
// Adiciona eixos às cenas
zScene.add(axes());
pScene.add(axes());

// Cria grupos de controle e adiciona às telas
let perspectiveGroups = [new Group()];
let ortogonalGroups = [new Group()];
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

// Loop de renderização
const render = () => {
  requestAnimationFrame(render);
  title.set(
    `Grupo: ${currentGroup + 1} - Profundidade: ${depth} - Largura: ${boxWidth}`
  );
  // Atualiza controles da camera e limpa buffers de cor
  controls.update();
  pLight2.position.copy(pLight.position);
  pLight.position.copy(perspectiveCamera.position);
  renderer.clear();
  // Viewport da camera ortográfica de x = 1 até x / 2 - 1
  renderer.setViewport(1, 1, width / 2 - 2, height);
  renderer.render(zScene, zCamera);
  // Viewport da camera em perpectiva de x / 2 + 1 até x - 1
  renderer.setViewport(width / 2 + 1, 1, width / 2 - 2, height);
  renderer.render(pScene, perspectiveCamera);
};
render();

/**
 * Adiciona pontos parametrizados entre -1 e 1.
 * Criado para facilitar carregar arquivo para T1
 * @param points Vetor de pontos com [x,y,z]
 */
const addPoints = (points: [number, number, number, number][]) => {
  for (let point of points) {
    const [x, y, z, depth] = point;
    console.log([x, y, z], depth);
    const geo = new CircleGeometry(0.01, 16);
    const mat = new MeshBasicMaterial({
      color: 0xffffff
    });
    const circle = new Mesh(geo, mat);
    // Posiciona círculo no click e adiciona à tela
    // @ts-ignore
    circle.width = depth;
    circle.position.x = x;
    circle.position.y = y;
    circle.position.z = z;
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
      // Vetor perpendicular aos cliques
      const perpendicular = getPerpendicular(
        previous.position,
        current.position
      );
      // Cria uma nova caixa na origem
      let geometry = new BoxGeometry(1, 1, 1);
      // Reposiciona vérices na posição desejada
      positionVertices(geometry, current, previous, perpendicular, depth);

      // Cria plano já reposicionado e adiciona à cena em perspectiva
      var material = new MeshPhongMaterial({
        color: 0xffff00,
        side: DoubleSide,
        flatShading: true
      });
      var box = new Mesh(geometry, material);
      pGroup.add(box);
    }
  }
};

// Retorna o vetor perpendicular de módulo 0.02 a dois vetores
const getPerpendicular = (previous: Vector3, current: Vector3): Vector3 => {
  const perpendicular = new Vector3();
  // Calcula vetor deslocamento entre os dois cliques
  perpendicular.x = current.x - previous.x;
  perpendicular.y = current.y - previous.y;
  perpendicular.z = 0;
  // Rotaciona em 90° em relação à Z
  perpendicular.applyAxisAngle(new Vector3(0, 0, 1), degToRad(90));
  // Normaliza e coloca vetor com tamanho 0.05
  perpendicular.setLength(0.02);
  return perpendicular;
};

/**
 * Disposição dos vérices na geometria é:
 *                     ^ y
 *    4---1            | /
 *   /|  /|            |/
 *  5---0 3        ----/----> x
 *  | / |/            /|
 *  7---2            z |
 *
 * 6 'abaixo' de 4
 *
 * Utiliza 0-3 como base e extrude 4-7
 */
// Posiciona face frontal em Z = 0
const positionVertices = (
  geometry: Geometry,
  current: Object3D,
  previous: Object3D,
  perpendicular: Vector3,
  depth: number
) => {
  const { vertices } = geometry;
  /**
   *    5-prv-0  Face frontal
   *    |  |  |
   *    |  v  |
   *    7-crr-2
   */
  // Base de cima
  vertices[0].x = previous.position.x + perpendicular.x * depth;
  vertices[0].y = previous.position.y + perpendicular.y * depth;
  vertices[0].z = 0;
  vertices[5].x = previous.position.x - perpendicular.x * depth;
  vertices[5].y = previous.position.y - perpendicular.y * depth;
  vertices[5].z = 0;
  // Base de baixo
  vertices[2].x = current.position.x + perpendicular.x * depth;
  vertices[2].y = current.position.y + perpendicular.y * depth;
  vertices[2].z = 0;
  vertices[7].x = current.position.x - perpendicular.x * depth;
  vertices[7].y = current.position.y - perpendicular.y * depth;
  vertices[7].z = 0;
  /**
   *    4-prv-1  Face anterior
   *    |  |  |
   *    |  v  |
   *    6-crr-3
   */
  // Posiciona outra face em Z = altura
  // Base de cima
  vertices[1].x = previous.position.x + perpendicular.x * depth;
  vertices[1].y = previous.position.y + perpendicular.y * depth;
  vertices[1].z = previous.position.z;
  vertices[4].x = previous.position.x - perpendicular.x * depth;
  vertices[4].y = previous.position.y - perpendicular.y * depth;
  vertices[4].z = previous.position.z;
  // Base de baixo
  vertices[3].x = current.position.x + perpendicular.x * depth;
  vertices[3].y = current.position.y + perpendicular.y * depth;
  vertices[3].z = current.position.z;
  vertices[6].x = current.position.x - perpendicular.x * depth;
  vertices[6].y = current.position.y - perpendicular.y * depth;
  vertices[6].z = current.position.z;
  geometry.computeFaceNormals();
  geometry.computeBoundingBox();
  adjustPreviousBox(geometry, previous);
  geometry.computeBoundingSphere();
};
/**
 * Ajusta face de baixo do paralelepipedo anterior, se existir
 */

// Algoritmo para calcular interseção de duas retas. Obtido de http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
const checkLineIntersection = (
  line1StartX: number,
  line1StartY: number,
  line1EndX: number,
  line1EndY: number,
  line2StartX: number,
  line2StartY: number,
  line2EndX: number,
  line2EndY: number
): Point3D => {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  let denominator,
    a,
    b,
    numerator1,
    numerator2,
    x = line1StartX,
    y = line1StartY;
  denominator =
    (line2EndY - line2StartY) * (line1EndX - line1StartX) -
    (line2EndX - line2StartX) * (line1EndY - line1StartY);
  if (denominator == 0) {
    return [0, 0, 0];
  }
  a = line1StartY - line2StartY;
  b = line1StartX - line2StartX;
  numerator1 = (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
  numerator2 = (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b;
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  x = line1StartX + a * (line1EndX - line1StartX);
  y = line1StartY + a * (line1EndY - line1StartY);
  /*
      // it is worth noting that this should be the same as:
      x = line2StartX + (b * (line2EndX - line2StartX));
      y = line2StartX + (b * (line2EndY - line2StartY));
      */
  // if line1 and line2 are segments, they intersect if both of the above are true
  return [x, y, 0];
};

// Extende as faces até seu ponto de interseção para evitar mudanças estranhas
const adjustPreviousBox = (cGeo: Geometry, prev: Object3D) => {
  const [prevBox] = pGroup.children.slice(-1) as Mesh[];
  if (!prevBox) return;
  const pGeo = prevBox.geometry as Geometry;
  const pVert = pGeo.vertices;
  const pDir = new Vector3().subVectors(pVert[0], pVert[2]);
  const cVert = cGeo.vertices;
  const cDir = new Vector3().subVectors(cVert[0], cVert[2]);
  const intersect02 = checkLineIntersection(
    pVert[0].x,
    pVert[0].y,
    pVert[0].x + pDir.x,
    pVert[0].y + pDir.y,
    cVert[0].x,
    cVert[0].y,
    cVert[0].x + cDir.x,
    cVert[0].y + cDir.y
  );
  const intersect57 = checkLineIntersection(
    pVert[5].x,
    pVert[5].y,
    pVert[5].x + pDir.x,
    pVert[5].y + pDir.y,
    cVert[5].x,
    cVert[5].y,
    cVert[5].x + cDir.x,
    cVert[5].y + cDir.y
  );
  pVert[3].set(
    ...(pVert[2]
      .set(...intersect02)
      .clone()
      .setZ(pVert[3].z)
      .toArray() as Point3D)
  );
  pVert[6].set(
    ...(pVert[7]
      .set(...intersect57)
      .clone()
      .setZ(pVert[6].z)
      .toArray() as Point3D)
  );
  cVert[1].set(
    ...(cVert[0]
      .set(...intersect02)
      .clone()
      .setZ(cVert[1].z)
      .toArray() as Point3D)
  );
  cVert[4].set(
    ...(cVert[5]
      .set(...intersect57)
      .clone()
      .setZ(cVert[4].z)
      .toArray() as Point3D)
  );
  pGeo.verticesNeedUpdate = true;
  pGeo.computeBoundingBox();
  pGeo.computeBoundingSphere();
  pGeo.computeFaceNormals();
};

// Salva a informação dos groupos e potos atuais como JSON
const saveData = () => {
  // Group
  const data = ortogonalGroups.map(group => {
    return (
      group.children
        // Clique
        .map(dot => {
          // @ts-ignore
          return [...dot.position.toArray(), dot.width];
        })
        .filter(item => item.length > 0)
    );
  });
  download(data, "model.json");
};

// Carrega a informação salva anteriormente para a lógica interna do programa
const loadData = (data: string) => {
  for (let i in ortogonalGroups) {
    zScene.remove(ortogonalGroups[i]);
    pScene.remove(perspectiveGroups[i]);
  }
  ortogonalGroups = [];
  perspectiveGroups = [];
  currentGroup = -1;
  const dots = JSON.parse(data) as [number, number, number, number][][];
  for (let group of dots) {
    const next = currentGroup + 1;
    ortogonalGroups.push(new Group());
    perspectiveGroups.push(new Group());
    zScene.add(ortogonalGroups[next]);
    pScene.add(perspectiveGroups[next]);
    if (next === 0) {
      zGroup = ortogonalGroups[next];
      pGroup = perspectiveGroups[next];
      currentGroup++;
    } else {
      updateGroups(next);
    }
    boxWidth = depth;
    addPoints(group);
  }
};

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
    /**
     * Já deixa o ponto posicionado em Z para referenciar depois, como camera é Ortográfica
     * o que aparece na tela é igual, porém facilita para construir os quadrados com alturas
     * diferentes a seguir
     */
    addPoints([[x, y, 0.1 * depth, boxWidth]]);
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

/**
 * Atualiza as cores dos pontos e faces dos quadrados para mostrar qual grupo está selecionado atualmente
 * @param next Indice do próximo grupo
 */
const updateGroups = (next: number) => {
  const prev = currentGroup;
  ortogonalGroups[prev].children.forEach(child => {
    const obj = child as Mesh;
    const mat = obj.material as MeshPhongMaterial;
    mat.color.setHSL(0, 0, 0.2);
  });
  ortogonalGroups[next].children.forEach(child => {
    const obj = child as Mesh;
    const mat = obj.material as MeshPhongMaterial;
    mat.color.setHSL(0, 0, 1);
  });
  perspectiveGroups[prev].children.forEach(child => {
    const obj = child as Mesh;
    const mat = obj.material as MeshPhongMaterial;
    mat.color.setHSL(60 / 360, 1, 0.2);
  });
  perspectiveGroups[next].children.forEach(child => {
    const obj = child as Mesh;
    const mat = obj.material as MeshPhongMaterial;
    mat.color.setHex(0xffff00);
  });
  zGroup = ortogonalGroups[next];
  pGroup = perspectiveGroups[next];
  currentGroup = next;
};

const onKeydown = (e: KeyboardEvent) => {
  e.stopPropagation();
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      // Volta uma cena e atualiza variável global
      const next =
        // Controle de limite e evitando numero negativo
        (currentGroup - 1 + perspectiveGroups.length) %
        perspectiveGroups.length;
      updateGroups(next);
      break;
    case "ArrowRight":
      // Avança nas cenas e atualiza variável global
      const nextR = currentGroup + 1;
      if (nextR === perspectiveGroups.length) {
        ortogonalGroups.push(new Group());
        perspectiveGroups.push(new Group());
      }
      zScene.add(ortogonalGroups[nextR]);
      pScene.add(perspectiveGroups[nextR]);
      updateGroups(nextR);
      break;
    // Casos abaixos alteram profundidade
    case "ArrowUp":
      depth = ++depth % 10 || 1;
      break;
    case "ArrowDown":
      depth = (--depth + 10) % 10 || 9;
      break;
    case ".":
      boxWidth = ++boxWidth % 10 || 1;
      break;
    case ",":
      boxWidth = (--boxWidth + 10) % 10 || 9;
      break;
    case "F12":
      if (document.fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
      break;
    case "l":
      upload().then(loadData);
      break;
    case "s":
      saveData();
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
