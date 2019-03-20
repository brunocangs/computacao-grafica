import * as THREE from "three";
import {axes, shape, square, line2D} from "../utils";

const width = window.innerWidth;
const height = window.innerHeight;
const axisWidth = width / 2;
const axisHeight = height / 2;
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

let camera = new THREE.OrthographicCamera(
  -axisWidth,
  axisWidth,
  axisHeight,
  -axisHeight,
  1,
  1000
);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

let scene = new THREE.Scene();
scene.add(axes());
scene.add(line2D([
  [0,0],
  [150, 300],
  [300, 300],
  [300, 150]
], {
  color: 0xff0000
}))
renderer.render(scene, camera);
