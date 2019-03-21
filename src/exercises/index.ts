import { init } from '../utils';
import { Geometry, Vector3, Face3 } from 'three';

const [
  scene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();
