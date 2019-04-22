import * as THREE from 'three';

let SECSCENE = require('../src/secscene.js');



// create a scene
let scene1 = new THREE.Scene();

let raycaster;


raycaster = new THREE.Raycaster();

let mouse = new THREE.Vector2(), INTERSECTED;

let geometry = new THREE.SphereBufferGeometry(500, 60, 40);
// invert the geometry on the x-axis so that all of the faces point inward
geometry.scale(- 1, 1, 1);


const texture = new THREE.TextureLoader().load('assets/V1020145.JPG');
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);


scene1.add(mesh);

let scene2 = new THREE.Scene();

const texture2 = new THREE.TextureLoader().load('assets/V1040147.JPG');

const material2 = new THREE.MeshBasicMaterial({ map: texture2 });

const mesh2 = new THREE.Mesh(geometry, material2);

scene2.add(mesh2); // so note need to be able to switch this on 

// Choosing default scene as scene1
let scene = scene1;


const onMouseMove = (event) => {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

};

geometry = new THREE.BoxGeometry(10, 10, 10);
const materialfirst = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  // wireframe: true
});

const materialsec = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  // wireframe: true
});
const materialthird = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  // wireframe: true
});
const cube = new THREE.Mesh(geometry, materialfirst);






//cube.name if want only one in raycast
cube.tag = 'hotspot';
scene.add(cube);

const cubesec = new THREE.Mesh(geometry, materialsec);
cubesec.tag = 'hotspot';
scene.add(cubesec);


const cubethird = new THREE.Mesh(geometry, materialthird);
cubethird.tag = 'hotspot';
scene.add(cubethird);


SECSCENE.cubeModule2.tag = 'hotspot';

scene2.add(SECSCENE.cubeModule2);

SECSCENE.cubeModule.tag = 'hotspot';

scene2.add(SECSCENE.cubeModule);


// add some light
const light = new THREE.PointLight(0xffabba);
light.position.set(10, 10, 35);
light.intensity = 2;
scene.add(light);


const light2 = new THREE.PointLight(0xffabba);
light2.position.set(10, 10, 35);
light2.intensity = 2;
scene2.add(light2);

// create a camera and set position
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 1000);
camera.target = new THREE.Vector3(0, 0, 0);
console.log(scene);
camera.position.z = 100;

// create a renderer & add to DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let isUserInteracting = false,
  onMouseDownMouseX = 0, onMouseDownMouseY = 0,
  lon = 0, onMouseDownLon = 0,
  lat = 0, onMouseDownLat = 0,
  phi = 0, theta = 0;



document.addEventListener('dragover', function (event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}, false);
document.addEventListener('dragenter', function () {
  console.log('enter');
  document.body.style.opacity = 0.5;
}, false);
document.addEventListener('dragleave', function () {
  document.body.style.opacity = 1;
}, false);
document.addEventListener('drop', function (event) {
  event.preventDefault();
  const reader = new FileReader();
  reader.addEventListener('load', function (event) {
    material.map.image.src = event.target.result;
    material.map.needsUpdate = true;
  }, false);
  reader.readAsDataURL(event.dataTransfer.files[0]);
  document.body.style.opacity = 1;
}, false);

const onPointerStart = (event) => {

  isUserInteracting = true;
  let clientX = event.clientX || event.touches[0].clientX;
  let clientY = event.clientY || event.touches[0].clientY;
  onMouseDownMouseX = clientX;
  onMouseDownMouseY = clientY;
  onMouseDownLon = lon;
  onMouseDownLat = lat;
  console.log('tapahtuu');
};
const onPointerMove = (event) => {
  if (isUserInteracting === true) {
    var clientX = event.clientX || event.touches[0].clientX;
    var clientY = event.clientY || event.touches[0].clientY;
    lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
    lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
  }
};
const onPointerUp = () => {
  isUserInteracting = false;
};
const onDocumentMouseWheel = (event) => {
  const fov = camera.fov + event.deltaY * 0.05;
  camera.fov = THREE.Math.clamp(fov, 10, 75);
  camera.updateProjectionMatrix();
};



document.addEventListener('mousedown', onPointerStart, false);
document.addEventListener('mousemove', onPointerMove, false);
document.addEventListener('mouseup', onPointerUp, false);
document.addEventListener('wheel', onDocumentMouseWheel, false);
document.addEventListener('touchstart', onPointerStart, false);
document.addEventListener('touchmove', onPointerMove, false);
document.addEventListener('touchend', onPointerUp, false);

// set & start rendering the scene
const render = () => {
  requestAnimationFrame(render);

  cube.position.x = 0;
  cube.position.y = 0;
  cube.position.z = 0;
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.03;
  cube.rotation.z += 0.05;

  cubesec.position.x = 100;
  cubesec.position.y = 0;
  cubesec.position.z = 0;
  cubesec.rotation.x += 0.02;
  cubesec.rotation.y += 0.03;
  cubesec.rotation.z += 0.05;

  cubethird.position.x = 200;
  cubethird.position.y = 0;
  cubethird.position.z = 150;
  cubethird.rotation.x += 0.02;
  cubethird.rotation.y += 0.03;
  cubethird.rotation.z += 0.05;

  SECSCENE.cubeModule2.position.x = 150;
  SECSCENE.cubeModule2.position.y = 0;
  SECSCENE.cubeModule2.position.z = 0;
  SECSCENE.cubeModule2.rotation.x += 0.02;
  SECSCENE.cubeModule2.rotation.y += 0.03;
  SECSCENE.cubeModule2.rotation.z += 0.05;

  SECSCENE.cubeModule.position.x = 200;
  SECSCENE.cubeModule.position.y = 0;
  SECSCENE.cubeModule.position.z = 150;

  SECSCENE.cubeModule.rotation.x += 0.02;
  SECSCENE.cubeModule.rotation.y += 0.03;
  SECSCENE.cubeModule.rotation.z += 0.05;


  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);


  cube.name = 'firstOne';
  cubesec.name = 'secondOne';
  cubethird.name = 'thirdOne';

  SECSCENE.cubeModule.name = 'fifthOne';

  SECSCENE.cubeModule2.name = 'sixthOne';


  document.querySelector('#scene2').addEventListener('click', () => {
    scene = scene2;
    console.log(scene2);
    
    document.querySelector('.text').style.display = 'none';

  });


  document.querySelector('#scene1').addEventListener('click', () => {
    scene = scene1;
    document.querySelector('.text').style.display = 'none';
  });



  if (intersects.length > 1) {
    
    if (intersects[0].object.tag === 'hotspot') {



      if (intersects[0].object.name === 'firstOne') {
        intersects[0].object.scale.x = 5;

        document.querySelector('.text').style.display = 'block';

        document.querySelector('.innerText').innerHTML = 'The average person walks the equivalent of 5 laps around the world during their lifetime.';


        setTimeout(function () {
          document.querySelector('.text').style.display = 'none';
          intersects[0].object.scale.x = 1;
        }, 3500);
      }


      if (intersects[0].object.name === 'secondOne') {
        intersects[0].object.scale.x = 5;
        intersects[0].object.scale.y = 5;

        document.querySelector('.text').style.display = 'block';

        document.querySelector('.innerText').innerHTML = 'Globally, only 2 percent of the population has green eyes.';

        setTimeout(function () {
          document.querySelector('.text').style.display = 'none';

          intersects[0].object.scale.x = 1;
          intersects[0].object.scale.y = 1;
        }, 3500);
      }

      if (intersects[0].object.name === 'thirdOne') {
        intersects[0].object.scale.x = 5;
        intersects[0].object.scale.y = 5;
        intersects[0].object.scale.z = 5;

        document.querySelector('.text').style.display = 'block';

        document.querySelector('.innerText').innerHTML = 'Talking to yourself makes your brain work more efficiently.';

        setTimeout(function () {
          document.querySelector('.text').style.display = 'none';

          intersects[0].object.scale.x = 1;
          intersects[0].object.scale.y = 1;
          intersects[0].object.scale.z = 1;
        }, 3500);
      }


      if (intersects[0].object.name === 'fifthOne') {
        intersects[0].object.scale.x = 5;
        intersects[0].object.scale.y = 5;

        document.querySelector('.text').style.display = 'block';

        document.querySelector('.innerText').innerHTML = '3 out of 4 Americans use an emoji in text messaging every single day.';

        setTimeout(function () {
          document.querySelector('.text').style.display = 'none';

          intersects[0].object.scale.x = 1;
          intersects[0].object.scale.y = 1;
        }, 3500);

      }

      if (intersects[0].object.name === 'sixthOne') {
        intersects[0].object.scale.x = 5;

        document.querySelector('.text').style.display = 'block';

        document.querySelector('.innerText').innerHTML = 'Simply taking 1 step uses over 200 muscles in the body.';

        setTimeout(function () {
          document.querySelector('.text').style.display = 'none';

          intersects[0].object.scale.x = 1;
        }, 3500);

      }
      
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      console.log(INTERSECTED.material);
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0x0000ff);
      console.log('color changed');
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;

  }

  window.addEventListener('mousemove', onMouseMove, false);


  renderer.render(scene, camera);
};
render();


console.log('Here is your scene', scene);

const update = () => {
  if (isUserInteracting === false) {
    lon += 0.1;
  }

  if (THREE.Math !== undefined) {
    lat = Math.max(- 85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);
  }
  /*
  // distortion
  camera.position.copy( camera.target ).negate();
  */
  renderer.render(scene, camera);
};

const animate = () => {
  requestAnimationFrame(animate);
  update();
};

animate();


// adapt camera & renderer to browser window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
