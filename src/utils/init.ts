import { WebGLRenderer, OrthographicCamera, Scene, PointLight } from 'three';
import { Point3D } from '.';
import { AmbientLight } from 'three';
import { PerspectiveCamera } from 'three';
type BoundingBox = {
  width: number;
  height: number;
  axisWidth: number;
  axisHeight: number;
};
type InitArgs = {
  camera?: {
    position: Point3D;
    lookAt: Point3D;
  };
  lights?: {
    scale: number;
  };
};
export const init: (
  fields?: InitArgs
) => [Scene, WebGLRenderer, OrthographicCamera, BoundingBox] = fields => {
  // Define altura e largura da tela, alem o tamanho dos eixos
  const width = window.innerWidth;
  const height = window.innerHeight;
  const axisWidth = width / 2;
  const axisHeight = height / 2;
  // Cria e inicializa o renderizador
  let renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

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
  if (fields && fields.camera) {
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

  let scale = 1;
  if (fields && fields.lights) {
    scale = fields.lights.scale;
  }
  lights[0].position.set(0, 200 * scale, 0);
  lights[1].position.set(100 * scale, 300 * scale, 100 * scale);
  lights[2].position.set(-200 * scale, -200 * scale, -100 * scale);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  return [scene, renderer, camera, { width, height, axisWidth, axisHeight }];
};

export const initPerspective: (
  fov?: number,
  aspect?: number,
  near?: number,
  far?: number,
  fields?: InitArgs
) => [Scene, WebGLRenderer, PerspectiveCamera, BoundingBox] = (
  fov,
  aspect,
  near,
  far,
  fields
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const axisWidth = width / 2;
  const axisHeight = height / 2;
  let renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

  let camera = new PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);
  if (fields && fields.camera) {
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
  let scale = 1;
  if (fields && fields.lights) {
    scale = fields.lights.scale;
  }
  lights[0].position.set(0, 200 * scale, 0);
  lights[1].position.set(100 * scale, 300 * scale, 100 * scale);
  lights[2].position.set(-200 * scale, -200 * scale, -100 * scale);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  return [scene, renderer, camera, { width, height, axisWidth, axisHeight }];
};
