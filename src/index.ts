import * as THREE from "three";
import {axes, cube} from "./utils";

const width = window.innerWidth;
const height = window.innerHeight;
const axisWidth = width / 2;
const axisHeight = height / 2;
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

let camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

let scene = new THREE.Scene();
scene.add(cube(100, 0xffffff));
scene.add(axes());
renderer.render(scene, camera);
