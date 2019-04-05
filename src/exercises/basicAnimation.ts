import * as THREE from 'three';
import { axes, shape, square, line2D, init } from '../utils';
import { Vector3, BufferGeometry, Line, LineBasicMaterial } from 'three';

const [
  scene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();
scene.add(axes());

document.body.appendChild(renderer.domElement);

let x0 = -axisWidth;

const MAX_POINTS = 5000;

var geometry = new THREE.BufferGeometry();

// attributes
var positions = new Float32Array(
  new Array(MAX_POINTS * 3).fill(0).map((item, index) => {
    const x = x0 + index / 3;
    // Cada vértice são 3 posições do vetor
    switch (index % 3) {
    // Um vértice é, basicamente [x, y, z] = [case 0, case 1, case 2]
    case 0:
      return x;
    case 1:
      return Math.sin(x / 30) * 30;
    case 2:
      return 0;
    default:
      return 0;
    }
  })
); // 3 vertices per point
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

let drawCount = 3; // draw the first 2 points, only
geometry.setDrawRange(0, 2);

const line = new Line(geometry, new LineBasicMaterial({ color: 0xff0000 }));
scene.add(line);

let now = Date.now();
let last = Date.now();

const render = () => {
  now = Date.now();
  drawCount = Math.min(drawCount + 10, MAX_POINTS);
  (line.geometry as BufferGeometry).setDrawRange(0, drawCount);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();
