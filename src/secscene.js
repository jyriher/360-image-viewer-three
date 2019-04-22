import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  // wireframe: true
});
const cubeModule = new THREE.Mesh(geometry, material);


const geometry2 = new THREE.BoxGeometry(10, 10, 10);
const material2 = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  // wireframe: true
});
const cubeModule2 = new THREE.Mesh(geometry2, material2);

export {cubeModule, cubeModule2};

