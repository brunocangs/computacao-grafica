import { WebGLRenderer, OrthographicCamera, Scene, PointLight } from 'three';
import { Point3D } from '.';
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
    1,
    9000
  );

  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  if (fields) {
    camera.position.set(...fields.camera.position);
    camera.lookAt(...fields.camera.lookAt);
  }
  let scene = new Scene();
  var light = new PointLight(0xff0000, 1, 100);
  light.position.set(50, 50, 50);
  scene.add(light);
  return [scene, renderer, camera, { width, height, axisWidth, axisHeight }];
};
