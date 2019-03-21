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
  Line
} from 'three';
export { init } from './init';

export type Point2D = [number, number];
export type Point3D = [number, number, number];
export type PointArray2D = [number, number][];
export type PointArray3D = [number, number, number][];

export const axes = () => {
  let material = new THREE.LineBasicMaterial({ color: 0xffffff });
  let axes = new THREE.Geometry();
  axes.vertices.push(new THREE.Vector3(-9999, 0, 0));
  axes.vertices.push(new THREE.Vector3(9999, 0, 0));
  axes.vertices.push(new THREE.Vector3(0, 0, 0));
  axes.vertices.push(new THREE.Vector3(0, -9999, 0));
  axes.vertices.push(new THREE.Vector3(0, 9999, 0));
  axes.vertices.push(new THREE.Vector3(0, 0, 0));
  axes.vertices.push(new THREE.Vector3(0, 0, -9999));
  axes.vertices.push(new THREE.Vector3(0, 0, 9999));

  let line = new THREE.Line(axes, material);
  return line;
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
