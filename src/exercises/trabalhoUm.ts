import { init, axes, initPerspective } from '../utils';
import {
  OrthographicCamera,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  DoubleSide,
  PlaneGeometry,
  MeshLambertMaterial
} from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { CircleGeometry } from 'three';
let [
  zScene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();
let depth = 1;
// Camera da primeira viewport
const zCamera = new OrthographicCamera(-1, 1, 1, -1, -1000, 10000);
// Camera da segunda viewport, com aspect ratio correto
const halfAspect = (width / 2 - 2) / height;
const [perspectiveScene, pRenderer, perspectiveCamera] = initPerspective(
  60,
  halfAspect,
  0.1,
  1000,
  // Cena da segunda viewport com luzes mais próximas
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
zScene.add(axes());
perspectiveScene.add(axes());
// Controles para a camera com mouse
const controls = new OrbitControls(perspectiveCamera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
// Settings do renderizador
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;

const render = () => {
  requestAnimationFrame(render);
  // on update
  controls.update();
  renderer.clear();
  // Viewport da camera ortográfica de x = 1 até x/2 - 1
  renderer.setViewport(1, 1, width / 2 - 2, height);
  renderer.render(zScene, zCamera);
  // Viewport da camera em perpectiva de x / 2 + 1 até x - 1
  renderer.setViewport(width / 2 + 1, 1, width / 2 - 2, height);
  renderer.render(perspectiveScene, perspectiveCamera);
};
render();
// Eventos mouse/teclado
// Clique na tela
function onMouseDown(event: MouseEvent) {
  // Normaliza clique de -1 a 1 na tela
  let x = (event.clientX / window.innerWidth) * 2 - 1;
  // Orientação de Y é de baixo para cima
  let y = -(event.clientY / window.innerHeight) * 2 + 1;
  // Clique na primeira metade -1 <= x <= 0
  if (x < 0) {
    // Re-normaliza pra primeira metade
    x = (x + 0.5) * 2;
    // Cria o ponto da primeira cena
    const geo = new CircleGeometry(0.01, 16);
    const mat = new MeshBasicMaterial({
      color: 0xffffff,
      side: DoubleSide
    });
    const circle = new Mesh(geo, mat);
    // Posiciona ele no click e adiciona á tela
    circle.position.x = x;
    circle.position.y = y;
    circle.position.z = 0.3 * depth;
    zScene.add(circle);
    // Seleciona somente os pontos (ignora as luzes e eixo)
    const dots = zScene.children.slice(5);
    // Adiciona retangulo na segunda cena se a primeira contiver mais de dois pontos
    if (dots.length >= 2) {
      // Pega ultimos 2 vertices
      const [previous, current] = dots.slice(-2);
      // Cria um novo plano na origem
      var geometry = new PlaneGeometry(1, 1);
      // Reposiciona vérices na posição desejada
      /**
       * Disposição dos vérices é:
       *  0--1
       *  2--3
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
      var material = new MeshLambertMaterial({
        color: 0xffff00,
        side: DoubleSide
      });
      var plane = new Mesh(geometry, material);
      perspectiveScene.add(plane);
    }
  }
}
const onKeydown = (e: KeyboardEvent) => {
  const key = e.key;
  switch (key) {
  case 'ArrowLeft':
    // Remove o ponto da primeira cena e deleta sua geometria
    const dots = zScene.children.slice(5);
    const lastChild = dots.slice(-1)[0] as Mesh;
    if (!lastChild) return;
    zScene.remove(lastChild);
    lastChild.geometry.dispose();
    // Remove plano da segunda cena e deleta sua geometria
    const planes = perspectiveScene.children.slice(5);
    break;
  case '1':
    depth = 1;
    break;
  case '2':
    depth = 2;
    break;
  case '3':
    depth = 3;
    break;
  }
};
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('keydown', onKeydown, false);
