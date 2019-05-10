import { WebGLRenderer, Scene, Camera, SphereGeometry, Color } from "three";
import { PerspectiveCamera } from "three";
import { axes, degToRad } from "../utils";
import { AmbientLight } from "three";
import { PointLight } from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { MeshPhongMaterial } from "three";
import { Mesh } from "three";
import throttle from "lodash.throttle";
import { VertexColors } from "three";
import { TorusGeometry } from "three";

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
  scene.add(axes());
  scene.add(new AmbientLight());
  controls = new OrbitControls(camera, renderer.domElement, window);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
};

const exercise = () => {
  const geo = new TorusGeometry(0.2, 0.05, 20, 200);
  const material = new MeshPhongMaterial({
    color: new Color().setHSL(0.3, 0.5, 0.2)
  });
  const sphere = new Mesh(geo, material);
  scene.add(sphere);
};

const render = () => {
  requestAnimationFrame(render);
  controls.update();
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
