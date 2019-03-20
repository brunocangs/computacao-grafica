import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;
const axisWidth = width / 2;
const axisHeight = height / 2;

export const axes = () => {
  let material = new THREE.LineBasicMaterial({ color: 0xffffff });
  let axes = new THREE.Geometry();
  axes.vertices.push(new THREE.Vector3(-axisWidth, 0, 0));
  axes.vertices.push(new THREE.Vector3(axisWidth, 0, 0));
  axes.vertices.push(new THREE.Vector3(0, 0, 0));
  axes.vertices.push(new THREE.Vector3(0, -axisHeight, 0));
  axes.vertices.push(new THREE.Vector3(0, axisHeight, 0));
  let line = new THREE.Line(axes, material);
  return line;
};

export const cube = (size: number, color: string | number | THREE.Color) => {
  var cube = new THREE.BoxBufferGeometry(size, size, size);
  cube.translate(10, 10, 0);
  let mesh = new THREE.Mesh(
    cube,
    new THREE.MeshBasicMaterial({
      color
    })
  );
  return mesh;
};
