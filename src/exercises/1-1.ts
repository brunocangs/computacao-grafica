import { init, axes, shape } from '../utils';
import {
  Scene,
  Geometry,
  Vector3,
  LineBasicMaterial,
  Line,
  LineLoop
} from 'three';
// @ts-ignore
const [
  baseScene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();
document.body.appendChild(renderer.domElement);

let currentScene = 0;

const scenes = [new Scene(), new Scene(), new Scene(), new Scene()];

let scene: Scene;
// Primeira cena
scene = scenes[0];
const firstSceneTriangle = shape(
  [
    [0, 0],
    [100, 0],
    [100 * Math.cos((60 * Math.PI) / 180), 100 * Math.sin((60 * Math.PI) / 180)]
  ],
  { color: 0xff0000 }
);
scene.add(firstSceneTriangle);

// Segunda scena
scene = scenes[1];
const tiragleLineGeometry = new Geometry();
tiragleLineGeometry.vertices.push(
  new Vector3(0, 0, 2),
  new Vector3(100, 0, 2),
  new Vector3(
    100 * Math.cos((60 * Math.PI) / 180),
    100 * Math.sin((60 * Math.PI) / 180),
    2
  )
);
const triangleLineMaterial = new LineBasicMaterial({ color: 0xff0000 });
const triangleLine = new LineLoop(tiragleLineGeometry, triangleLineMaterial);

scene.add(triangleLine);

// Terceira cena
scene = scenes[2];
scene.add(new LineLoop(tiragleLineGeometry, triangleLineMaterial));

const thirdSceneTriangle = shape(
  [
    [0, 0],
    [-100, 0],
    [
      -100 * Math.cos((60 * Math.PI) / 180),
      -100 * Math.sin((60 * Math.PI) / 180)
    ]
  ],
  { color: 0xff0000 }
);
scene.add(thirdSceneTriangle);

// Quarta cena
scene = scenes[3];

// Primeiro ponto, rotacionado 60 graus acima do eixo X, distancia 100;
const x = (angle: number) => 100 * Math.cos((angle * Math.PI) / 180);
const y = (angle: number) => 100 * Math.sin((angle * Math.PI) / 180);
// Primeiro ponto no angulo de 60
const initalAngle = 60;
const geo = new Geometry();
const mat = new LineBasicMaterial({ color: 0xffffff });
// Rotaciona para baixo de 60 em 60 graus adicionando vértice
for (let i = 0; i < 6; i++) {
  geo.vertices.push(
    new Vector3(x(initalAngle + i * -60), y(initalAngle + i * -60), 1)
  );
}
const lin = new Line(geo, mat);
scene.add(lin);

for (let scene of scenes) {
  scene.add(axes());
}

// Inicializa o ciclo de renderização
const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();

// Escuta em keydown
window.addEventListener('keydown', ev => {
  switch (ev.key) {
  case 'ArrowRight':
    scene = scenes[currentScene++ % 4];
    break;
  case 'ArrowLeft':
    scene = scenes[(currentScene = currentScene + 3) % 4];
    break;
  }
});
