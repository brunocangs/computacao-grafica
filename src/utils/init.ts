import { WebGLRenderer, OrthographicCamera, Scene, PointLight } from 'three';
import { Point3D } from '.';
import { AmbientLight } from 'three';
type BoundingBox = {
  width: number;
  height: number;
  axisWidth: number;
  axisHeight: number;
};
type InitArgs = {
  camera: {
    position: Point3D;
    lookAt: Point3D;
  };
};
export const init: (
  fields?: InitArgs
) => [Scene, WebGLRenderer, OrthographicCamera, BoundingBox] = fields => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const axisWidth = width / 2;
  const axisHeight = height / 2;
  let renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  let camera = new OrthographicCamera(
    -axisWidth,
    axisWidth,
    axisHeight,
    -axisHeight,
    -1,
    9000
  );

  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  if (fields) {
    camera.position.set(...fields.camera.position);
    camera.lookAt(...fields.camera.lookAt);
  }
  let scene = new Scene();
  var ambientLight = new AmbientLight(0x000000);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new PointLight(0xffffff, 1, 0);
  lights[1] = new PointLight(0xffffff, 1, 0);
  lights[2] = new PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  return [scene, renderer, camera, { width, height, axisWidth, axisHeight }];
};