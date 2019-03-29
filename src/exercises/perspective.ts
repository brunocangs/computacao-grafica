import {
  init,
  axes,
  initPerspective,
  square,
  line3D,
  controls
} from '../utils';
import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import { Object3D } from 'three';
import { LineBasicMaterial } from 'three';
import { Group } from 'three';
let x = 0,
  y = 0;

controls({
  'Seta para cima': 'Move o cubo uma célula para cima',
  'Seta para baixo': 'Move o cubo uma célula para baixo',
  'Seta para direita': 'Move o cubo uma célula para direita',
  'Seta para esquerda': 'Move o cubo uma célula para esquerda'
});

window.addEventListener('keydown', e => {
  switch (e.key) {
  case 'ArrowRight':
    x = Math.min(4, x + 1);
    break;
  case 'ArrowUp':
    y = Math.min(4, y + 1);
    break;
  case 'ArrowLeft':
    x = Math.max(0, x - 1);
    break;
  case 'ArrowDown':
    y = Math.max(0, y - 1);
    break;
  }
  console.log(e.key, x, y);
});

const [scene, renderer, camera, viewport] = initPerspective(
  60,
  16 / 9,
  1,
  1000,
  {
    camera: {
      lookAt: [25, 25, 0],
      position: [25, -25, 25]
    }
  }
);

const grid = () => {
  const Grid = new Group();
  for (let i = 0; i <= 50; i = i + 10) {
    const lineX = line3D([[i, 0, 0], [i, 50, 0]], {
      color: 0xffffff
    });
    const lineY = line3D([[0, i, 0], [50, i, 0]], {
      color: 0xffffff
    });
    Grid.add(lineX, lineY);
  }
  return Grid;
};

const geo = new BoxGeometry(10, 10, 10);
const mat = new MeshLambertMaterial({
  color: 0xff0000
});
const block = new Mesh(geo, mat);
block.position.set(5 + x * 10, 5 + y * 10, 5);
const Grid = grid();
scene.add(block, Grid);
const render = () => {
  requestAnimationFrame(render);
  block.position.set(5 + x * 10, 5 + y * 10, 5);
  renderer.render(scene, camera);
};

render();
