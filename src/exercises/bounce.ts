import { init, axes, initPerspective, controls } from '../utils';
import {
  Geometry,
  Vector3,
  Face3,
  CircleGeometry,
  MeshLambertMaterial,
  MeshBasicMaterial
} from 'three';
import { Mesh } from 'three';
let x = 0;
let y = 25;
let speedX = 0.01;
let speedY = 0;
let now = new Date();
let after: null | Date = null;
let accelY = -0.001;
let fps = 60;
controls({
  '-': 'Diminui FPS',
  '=': 'Aumenta FPS'
});
window.addEventListener('keydown', e => {
  switch (e.key) {
  case '-':
    fps = Math.max(15, fps / 2);
    break;
  case '=':
    fps = Math.min(60, fps * 2);
    break;
  }
});

const [
  scene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = initPerspective(60, 16 / 9, 1, 1000, {
  camera: {
    position: [25, 20, 40],
    lookAt: [25, 20, 0]
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

const pos = (t: number): number => {
  speedY = speedY + accelY * t;
  let newpos = y + (speedY / 2) * t;
  if (newpos < 1) {
    newpos = 1;
    speedY *= -0.95;
    speedX *= 0.95;
  }
  return newpos;
};

const geo = new CircleGeometry(1, 30);
const mat = new MeshBasicMaterial({
  color: 0xffffff
});

const circle = new Mesh(geo, mat);

scene.add(circle);
scene.add(axes());

let tick = 0;
const render = () => {
  requestAnimationFrame(render);
  after = new Date();
  limitFps(fps, () => {
    renderer.render(scene, camera);
  });
  tick = tick + 0.1;
  circle.position.x = x = x + speedX * tick;
  circle.position.y = y = pos(tick);
};
render();
