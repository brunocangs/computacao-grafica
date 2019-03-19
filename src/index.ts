
import * as THREE from 'three';
import {axes} from './utils'
const width = window.innerWidth;
const height = window.innerHeight;
const axisWidth = width / 2;
const axisHeight = height / 2;

let renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

let scene = new THREE.Scene();



scene.add( axes );
renderer.render( scene, camera );