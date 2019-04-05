import * as THREE from 'three';
import {
  Shape,
  Vector2,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  Geometry,
  Vector3,
  LineBasicMaterial,
  Line,
  Group,
  LineLoop
} from 'three';
import { LineBasicMaterialParameters } from 'three';
export { init, initPerspective } from './init';

export type Point2D = [number, number];
export type Point3D = [number, number, number];
export type PointArray2D = [number, number][];
export type PointArray3D = [number, number, number][];

export const axes = () => {
  // Cria 3 linhas, uma para cada eixo de -9999 a 9999 e as adiciona à um Group
  let xMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  let yMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  let zMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  let xAxis = new THREE.Geometry();
  let yAxis = new THREE.Geometry();
  let zAxis = new THREE.Geometry();
  xAxis.vertices.push(new THREE.Vector3(-9999, 0, 0));
  xAxis.vertices.push(new THREE.Vector3(9999, 0, 0));
  // axes.vertices.push(new THREE.Vector3(0, 0, 0));
  yAxis.vertices.push(new THREE.Vector3(0, -9999, 0));
  yAxis.vertices.push(new THREE.Vector3(0, 9999, 0));
  // axes.vertices.push(new THREE.Vector3(0, 0, 0));
  zAxis.vertices.push(new THREE.Vector3(0, 0, -9999));
  zAxis.vertices.push(new THREE.Vector3(0, 0, 9999));

  let xLine = new THREE.Line(xAxis, xMaterial);
  let yLine = new THREE.Line(yAxis, yMaterial);
  let zLine = new THREE.Line(zAxis, zMaterial);
  const axes = new Group();
  return axes.add(xLine, yLine, zLine);
};

export const square = (
  x0: number,
  y0: number,
  size: number,
  params: THREE.MeshBasicMaterialParameters
) => {
  return shape(
    [[x0, y0], [x0 + size, y0], [x0 + size, y0 + size], [x0, y0 + size]],
    params
  );
};

export const shape = (
  points: PointArray2D,
  params: THREE.MeshBasicMaterialParameters
) => {
  const shape = new Shape(points.map(item => new Vector2(...item)));
  const geo = new ShapeGeometry(shape);
  const mat = new MeshBasicMaterial(params);
  const plane = new Mesh(geo, mat);
  return plane;
};

export const line2D = (
  points: PointArray2D,
  params: THREE.LineBasicMaterialParameters
) => {
  const geo = new Geometry();
  geo.vertices.push(...points.map(point => new Vector3(...point, 0)));
  const mat = new LineBasicMaterial(params);
  const line = new Line(geo, mat);
  return line;
};

export const line3D = (
  points: PointArray3D,
  params: THREE.LineBasicMaterialParameters
) => {
  const geo = new Geometry();
  geo.vertices.push(...points.map(point => new Vector3(...point)));
  const mat = new LineBasicMaterial(params);
  const line = new Line(geo, mat);
  return line;
};

// Transforma graus para radianos
export const degToRad = (deg: number) => (deg * Math.PI) / 180;

export const lineLoop = (
  points: PointArray3D,
  options: LineBasicMaterialParameters
) => {
  const lineLoopGeometry = new Geometry();
  const lineLoopMaterial = new LineBasicMaterial(options);
  lineLoopGeometry.vertices.push(
    ...points.map(coords => new Vector3(...coords))
  );
  return new LineLoop(lineLoopGeometry, lineLoopMaterial);
};

type KeyMap = {
  [key: string]: string;
};

// Mapeia JSON de controles para interface
export const controls = (keyMap: KeyMap) => {
  const keys = Object.keys(keyMap);
  const instructionBlock = document.createElement('div');
  instructionBlock.innerText = 'Controles:';
  keys.forEach(key => {
    const instruction = keyMap[key];
    const paragraph = document.createElement('p');
    paragraph.innerText = `${key}: ${instruction}`;
    instructionBlock.appendChild(paragraph);
  });
  instructionBlock.style.padding = '6px 14px';
  instructionBlock.style.position = 'fixed';
  instructionBlock.style.bottom = '0';
  instructionBlock.style.right = '0';
  instructionBlock.style.backgroundColor = 'rgba(255,255,255,0.2)';
  instructionBlock.style.color = 'white';
  instructionBlock.style.fontFamily = 'sans-serif';
  instructionBlock.style.userSelect = 'none';
  instructionBlock.style.textAlign = 'left';
  document.body.appendChild(instructionBlock);
};
