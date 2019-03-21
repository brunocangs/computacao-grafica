import { init, axes } from '../utils';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import { Mesh } from 'three';

const [
  scene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init({
  camera: {
    position: [100, 100, 100],
    lookAt: [0, 0, 0]
  }
});

var geometry = new BoxGeometry(100, 100, 100);
var material = new MeshBasicMaterial({ color: 0xffff00 });
geometry.scale(2, 0.5, 0.5);
var cubes = [];
cubes[0] = new Mesh(geometry, material);
cubes[1] = new Mesh(geometry, material);
cubes[0].geometry.translate(100, 0, 0);
cubes[1].geometry.translate(210, 0, 0);
scene.add(cubes[0]);
scene.add(cubes[1]);
scene.add(axes());
const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();
