import * as THREE from "three";
import { WebGLRenderer, Scene, Camera, BufferGeometry } from "three";
import { PerspectiveCamera } from "three";
import { degToRad, axes } from "../utils";
import { AmbientLight } from "three";
import { PointLight } from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { MeshPhongMaterial } from "three";
import { Mesh } from "three";
import { PlaneBufferGeometry } from "three";
import PlyLoader from "three-ply-loader-ts";
let renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  light: PointLight,
  controls: OrbitControls;
const init = () => {
  renderer = new WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene = new Scene();
  camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 1);
  camera.lookAt(0, 0, 0);
  scene.add(camera);
  light = new PointLight(0xffffff);
  const pos = camera.position.clone();
  light.position.set(pos.x, pos.y, pos.z);
  scene.add(light);
  scene.add(new AmbientLight());
  controls = new OrbitControls(camera, renderer.domElement, window);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  scene.add(axes());
};

const exercise = () => {
  const loader = new PlyLoader();
  loader.load(require("../models/ply/budda.ply"), (geo: BufferGeometry) => {
    geo.computeVertexNormals();
    geo.computeBoundingBox();
    geo.computeBoundingSphere();
    const mesh = new Mesh(geo);
    scene.add(mesh);
  });
};

const render = () => {
  requestAnimationFrame(render);
  // controls.update();
  const pos = camera.position.clone();
  light.position.set(pos.x, pos.y, pos.z);
  animate();
  renderer.render(scene, camera);
};

const animate = () => {
  light.rotateZ(degToRad(10));
};

init();
exercise();
render();
