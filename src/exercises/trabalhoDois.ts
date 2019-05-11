import * as THREE from "three";
import {
  WebGLRenderer,
  Scene,
  Camera,
  BufferGeometry,
  PlaneGeometry,
  MeshStandardMaterial
} from "three";
import { PerspectiveCamera } from "three";
import { degToRad, axes } from "../utils";
import { PointLight } from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { MeshPhongMaterial } from "three";
import { Mesh } from "three";
import PlyLoader from "three-ply-loader-ts";
import { Group } from "three";
import throttle from "lodash.throttle";
import { AmbientLight } from "three";
import { Color } from "three";
import Stats from "stats-js";
import { DoubleSide } from "three";

const stats = new Stats();
const items = new Group();
const models = ["budda", "bunny", "cow", "dragon_full", "dragon", "snowman"];

let renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  light: PointLight,
  controls: OrbitControls,
  current: number = 0;

/**
 * Posiciona a camera na distancia correta para que o objeto pareça ter sempre o mesmo tamanho
 * @param camera Camera atual
 * @param obj Objeto para posicionar
 */
const placeCamera = (camera: PerspectiveCamera, obj: Mesh) => {
  const sphere = obj.geometry.boundingSphere;
  const pos = sphere.radius * 1.2;
  camera.position.set(pos, pos, pos);
  camera.lookAt(0, 0, 0);
  light.position.copy(camera.position);
};

const init = () => {
  const loader = new PlyLoader();
  renderer = new WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(stats.dom);
  scene = new Scene();
  Promise.all(
    models.map(
      item =>
        new Promise(res => {
          loader.load(require(`../models/ply/${item}.ply`), geo => {
            geo.computeVertexNormals();
            geo.computeBoundingSphere();
            const mat = new MeshStandardMaterial({
              color: new Color().setHSL(Math.random(), 0.6, 0.3),
              emissive: new Color().setHSL(0, 0, 0.1),
              metalness: 0,
              roughness: Math.random()
            });
            const mesh = new Mesh(geo, mat);
            mesh.visible = false;
            // Muda a posição para o centro da esfera de contenção
            mesh.position.copy(
              geo.boundingSphere.center.clone().multiplyScalar(-1)
            );
            items.add(mesh);
            res(mesh);
          });
        })
    )
  ).then(() => {
    const first = items.children[0] as Mesh;
    first.visible = true;
    placeCamera(camera, first);
    scene.add(items);
  });
  camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.set(1, 1, 1);
  camera.lookAt(0, 0, 0);
  scene.add(camera);
  light = new PointLight(0xffffff, 2);
  const pos = camera.position.clone();
  light.position.set(pos.x, pos.y, pos.z);
  scene.add(light);
  controls = new OrbitControls(camera, renderer.domElement, window);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  scene.add(axes());
};

const exercise = () => {};
const animate = throttle(() => {}, 1000 / 60);
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
      case "w":
        items.children.forEach(child => {
          // @ts-ignore
          const mat = child.material as MeshPhongMaterial;
          mat.wireframe = !mat.wireframe;
        });
        break;
      case "ArrowRight":
        items.children[current].visible = false;
        current = ++current % models.length;
        items.children[current].visible = true;
        placeCamera(camera, items.children[current] as Mesh);
        break;
      case "ArrowLeft":
        items.children[current].visible = false;
        current = (--current + models.length) % models.length;
        items.children[current].visible = true;
        placeCamera(camera, items.children[current] as Mesh);
        break;
      case "F12":
        e.preventDefault();
        if (document.fullscreen) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        break;
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
