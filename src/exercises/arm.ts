import { init, axes, degToRad } from '../utils';
import {
  BoxGeometry,
  MeshBasicMaterial,
  MeshNormalMaterial,
  MeshLambertMaterial,
  Vector3,
  DoubleSide,
  Object3D
} from 'three';
import { Mesh, Group } from 'three';
let x = 1300,
  y = 800,
  z = 1300,
  angle = 60;
const axies = axes();
const [
  scene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init({
  camera: {
    position: [x, y, z],
    lookAt: [0, 0, 0]
  }
});
let armsRotation = [0, 0, 0];
let currentArm = 0;
let clawOpening = 0;
const geometry = new BoxGeometry(30, 30, 30);
const material = new MeshLambertMaterial({
  color: 0xffff00,
  side: DoubleSide
});
const clawMaterial = new MeshLambertMaterial({
  color: 0xff0000,
  side: DoubleSide
});
geometry.scale(2, 0.5, 0.5);
window.addEventListener('keydown', ev => {
  console.log(ev.key);
  switch (ev.key) {
  case 'q':
    armsRotation[currentArm] += degToRad(5);
    break;
  case 'e':
    armsRotation[currentArm] -= degToRad(5);
    break;
  case '1':
    currentArm = 0;
    break;
  case '2':
    currentArm = 1;
    break;
  case '3':
    currentArm = 2;
    break;
  case 'ArrowUp':
    clawOpening += degToRad(5);
    break;
  case 'ArrowDown':
    clawOpening -= degToRad(5);
    break;
  }
});
const claw = (): Group => {
  const firstBottomGeometry = geometry
    .clone()
    .translate(30, 0, 0)
    .rotateZ(degToRad(35))
    .translate(-60 * Math.cos(degToRad(35)), 0, 0);
  const secondBottomGeometry = firstBottomGeometry.clone().scale(-1, 1, 1);
  const firstBottom = new Mesh(firstBottomGeometry, clawMaterial);
  const secondBottom = new Mesh(secondBottomGeometry, clawMaterial);
  const firstTopGeometry = firstBottomGeometry.clone().scale(1, -1, 1);
  const secondTopGeometry = secondBottomGeometry.clone().scale(1, -1, 1);
  const firstTop = new Mesh(firstTopGeometry, clawMaterial);
  const secondTop = new Mesh(secondTopGeometry, clawMaterial);
  const ClawBottom = new Group();
  ClawBottom.add(firstBottom, secondBottom);
  ClawBottom.rotateZ(clawOpening);
  ClawBottom.translateX(60 * Math.cos(degToRad(35)));
  const ClawTop = new Group();
  ClawTop.add(firstTop, secondTop);
  ClawTop.rotateZ(-clawOpening);
  ClawTop.translateX(60 * Math.cos(degToRad(35)));
  const Claw = new Group();
  Claw.add(ClawTop, ClawBottom);
  Claw.translateX(30 * Math.cos(degToRad(35)));
  return Claw;
};
const start = () => {
  const Claw = claw();
  // Claw.translateX(30);
  const thirdArmGeometry = geometry.clone();
  const thirdArmBase = new Mesh(thirdArmGeometry, material);
  const thirdArm = new Group();
  thirdArm.add(thirdArmBase, Claw);
  thirdArm.translateX(30);
  thirdArm.rotateZ(armsRotation[2]);
  thirdArm.translateX(30);
  const secondArmGeometry = geometry.clone();
  const secondArmBase = new Mesh(secondArmGeometry, material);
  const secondArm = new Group();
  secondArm.translateX(30);
  secondArm.rotateZ(armsRotation[1]);
  secondArm.translateX(30);
  secondArm.add(secondArmBase, thirdArm);
  const firstArmGeometry = geometry.clone();
  const firstArmBase = new Mesh(firstArmGeometry, material);
  const firstArm = new Group();
  firstArm.add(firstArmBase, secondArm);
  firstArm.rotateZ(armsRotation[0]);
  firstArm.translateX(30);
  return [firstArm, axies];
};

const render = () => {
  requestAnimationFrame(render);
  angle += 0.1;
  const components: Object3D[] = start();
  camera.position.set(
    x * Math.cos(degToRad(angle)),
    y,
    x * Math.sin(degToRad(angle))
  );
  scene.add(...components);
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  scene.remove(...components);
};

render();
