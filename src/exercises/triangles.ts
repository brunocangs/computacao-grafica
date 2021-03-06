import { init, lineLoop, Point3D, controls } from '../utils';
import { Geometry, Vector3, Face3 } from 'three';
import { LineBasicMaterial } from 'three';
import { Object3D } from 'three';

controls({
  'Seta para a direita': 'Adiciona mais um polígono',
  'Seta para cima': 'Adiciona um véric em cada polígono',
  '-': 'Diminúi FPS',
  '=': 'Aumenta FPS'
});

// Variáveis globais
const size = 250;
let after: null | Date = null;
let now = new Date();
let fps = 60;
let quantity = 2;
let dots = 3;
let colors = new Array(quantity).fill(null).map(() => Math.random() * 0xffffff);

// Escutando cliques no teclado
window.addEventListener('keydown', e => {
  switch (e.key) {
  case 'ArrowUp':
    addVertex();
    break;
  case 'ArrowRight':
    addPolygon();
    break;
  case '-':
    fps = Math.max(15, fps / 2);
    break;
  case '=':
    fps = Math.min(60, fps * 2);
    break;
  }
});

const limitFps = (fps: number, callback: () => any) => {
  const frameTime = 1000 / fps;
  if (after && after.getTime() - now.getTime() >= frameTime) {
    now = after;
    callback();
  }
  after = new Date();
};

const randomNegative = () => {
  return Math.random() >= 0.5 ? -1 : 1;
};

const randomCoords = (limit: number, floor?: boolean): Point3D => {
  return floor
    ? [
      Math.floor(Math.random() * limit) * randomNegative(),
      Math.floor(Math.random() * limit) * randomNegative(),
      0
    ]
    : [
      Math.random() * limit * randomNegative(),
      Math.random() * limit * randomNegative(),
      0
    ];
};

const addVertex = () => {
  coordinates = coordinates.map(polygon => {
    return polygon.concat([randomCoords(size, true)]);
  });
  speeds = speeds.map(speed => {
    return speed.concat([randomCoords(3)]);
  });
  dots++;
};

const addPolygon = () => {
  coordinates.push(
    new Array(dots).fill(null).map(() => randomCoords(size, true))
  );
  speeds.push(new Array(dots).fill(null).map(() => randomCoords(3)));
  colors.push(Math.random() * 0xffffff);
  quantity++;
};

let coordinates = new Array(quantity)
  .fill(null)
  .map(() => new Array(dots).fill(null).map(() => randomCoords(size, true)));

let speeds = new Array(quantity)
  .fill(null)
  .map(() => new Array(dots).fill(null).map(() => randomCoords(3)));

const [
  scene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();

document.body.appendChild(renderer.domElement);

const material = new LineBasicMaterial({
  color: 0xff00ff
});

const start = (): Object3D[] => {
  let limitBox = lineLoop(
    [[size, size, 0], [size, -size, 0], [-size, -size, 0], [-size, size, 0]],
    {
      color: 0xffffff
    }
  );
  let triangles = coordinates.map((coord, index) =>
    lineLoop(coord, { color: colors[index] })
  );
  return [limitBox, ...triangles];
};

const update = () => {
  // Para cada triangulo
  for (let item in coordinates) {
    const triangle = coordinates[item];
    const tSpeed = speeds[item];
    // Para cada vértice
    for (let tIndex in triangle) {
      const point = triangle[tIndex];
      const pSpeeds = tSpeed[tIndex];
      // Para cada coordenada
      for (let cIndex in point) {
        const pos = point[cIndex];
        const delta = pSpeeds[cIndex];
        let nPos = pos + delta;
        if (Math.abs(nPos) >= size) {
          nPos = pos - delta;
          speeds[item][tIndex][cIndex] *= -1;
        }
        coordinates[item][tIndex][cIndex] = nPos;
      }
    }
  }
};

const render = () => {
  after = new Date();
  // @ts-ignore
  requestAnimationFrame(render);
  update();
  const components = start();
  scene.add(...components);
  limitFps(fps, () => {
    renderer.render(scene, camera);
  });
  scene.remove(...components);
};
render();
