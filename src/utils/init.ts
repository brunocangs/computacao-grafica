import { WebGLRenderer, OrthographicCamera, Scene } from 'three';
type BoundingBox = {
  width: number;
  height: number;
  axisWidth: number;
  axisHeight: number;
};
export const init: () => [
Scene,
WebGLRenderer,
OrthographicCamera,
BoundingBox
] = () => {
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
    1000
  );

  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  let scene = new Scene();
  return [scene, renderer, camera, { width, height, axisWidth, axisHeight }];
};
