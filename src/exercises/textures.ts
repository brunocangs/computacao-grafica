import {
  WebGLRenderer,
  Scene,
  MeshStandardMaterial,
  TextureLoader,
  AmbientLight,
  BoxGeometry,
  PlaneGeometry,
  RepeatWrapping,
  MirroredRepeatWrapping,
  CubeCamera,
  Texture,
  Vector3
} from "three";
import { PerspectiveCamera } from "three";
import { degToRad, axes } from "../utils";
import { PointLight } from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import throttle from "lodash.throttle";
import Stats from "stats-js";
import { Mesh } from "three";
import { SphereGeometry } from "three";
import { PlaneBufferGeometry } from "three";
import { SphereBufferGeometry } from "three";
const loader = new TextureLoader();
const stats = new Stats();

let renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  light: PointLight,
  controls: OrbitControls;

const init = () => {
  renderer = new WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(stats.dom);
  scene = new Scene();
  camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.set(1, 1, 1);
  camera.lookAt(0, 0, 0);
  scene.add(camera);
  scene.add(new AmbientLight());
  light = new PointLight(0xffffff, 2);
  const pos = camera.position.clone();
  light.position.set(pos.x, pos.y, pos.z);
  scene.add(light);
  controls = new OrbitControls(camera, renderer.domElement, window);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  scene.add(axes());
};

const exercise = () => {
  let tex = loader.load(
    require("../textures/floor/Metal_Plate_019_basecolor.jpg")
  );
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(100, 100);
  const floor = new Mesh(
    new PlaneBufferGeometry(100, 100),
    new MeshStandardMaterial({
      map: tex
    })
  );
  floor.rotateX(-Math.PI / 2);
  scene.add(floor);
  // tex = loader.load(require("../textures/fabric.jpg"));
  // const cube = new Mesh(
  //   new SphereGeometry(0.2, 15, 15),
  //   new MeshStandardMaterial({
  //     map: tex,
  //     bumpMap: tex,
  //     bumpScale: 0.1
  //   })
  // );
  // scene.add(cube);
  const camera = new CubeCamera(0.001, 1000, 256);
  // @ts-ignore
  const reflection = camera.renderTarget as Texture;
  const ball = new Mesh(
    new SphereBufferGeometry(0.4, 20, 20),
    new MeshStandardMaterial({
      metalness: 1,
      roughness: 0,
      envMap: reflection
    })
  );
  ball.position.set(0, 0.4, 0);
  const randomInt = () => (!Math.round(Math.random()) ? 1 : -1) * Math.random();
  ball.onBeforeRender = (r, s) => {
    ball.position.add(new Vector3(randomInt() * 0.05, 0, randomInt() * 0.05));
    camera.position.copy(ball.position);
    ball.visible = false;
    camera.update(r, s);
    ball.visible = true;
  };
  scene.add(ball);
};
const doAnimate = () => {};
const animate = throttle(doAnimate, 1000 / 60);
const render = () => {
  stats.begin();
  controls.update();
  light.position.copy(camera.position);
  // const pos = camera.position.clone();
  // light.position.set(pos.x, pos.y, pos.z);
  animate();
  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(render);
};

const bindActions = () => {
  // Tecla
  window.addEventListener("keydown", e => {
    switch (e.key) {
    }
  });

  // Scroll do mouse
  const basicOnMouseWheel = (e: Event) => {
    const { x, y, z } = camera.position;
    if ((e as WheelEvent).deltaY < 0) {
      camera.position.set(x * 1.05, y * 1.05, z * 1.05);
    } else {
      camera.position.set(x * 0.95, y * 0.95, z * 0.95);
    }
  };
  const onMouseWheel = throttle(basicOnMouseWheel, 1000 / 60);
  window.addEventListener("wheel", onMouseWheel);

  // Resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

init();
exercise();
bindActions();
render();
