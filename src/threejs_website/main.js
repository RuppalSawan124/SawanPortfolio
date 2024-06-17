import * as THREE from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const width = 1000;
const height = 1000;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Green color
const camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);

camera.position.set(10, 0, 0); // Set camera position
camera.lookAt(0, 0, 0); // Make the camera look at the origin

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White light with intensity of 0.5
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const path = "./model.glb";
const gltfLoader = new GLTFLoader();
let model = null;
gltfLoader.load(path, (gltfObject) => {
    model = gltfObject.scene;
    model.scale.setScalar(0.5); // Adjust the scale if needed
    model.position.set(0, 0, 0); // Ensure the model is centered at the origin
    model.rotation.y = Math.PI; // Rotate 180 degrees around the Y-axis to face the camera (adjust as needed)
    console.log(model);
    scene.add(model);
});

const rotationSensitivity = 1;

let rotationX = 0;
let rotationY = 0;

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const ratioX = x / window.innerWidth;
    const ratioY = y / window.innerHeight;

    const offsetX = 0
    const offsetY = 0.5

    rotationX = (ratioX - offsetX) * rotationSensitivity
    rotationY = (ratioY - offsetY) * rotationSensitivity
});

// Add a plane to the scene
const geometry = new THREE.PlaneGeometry(50, 50);
const material = new THREE.MeshBasicMaterial({
    color: 0x0, side: THREE.DoubleSide, transparent: true,
    opacity: 0.5
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.y = Math.PI / 2;
plane.position.x = 5;
scene.add(plane);

// Track mouse movement
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onMouseMove(event) {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate the point in 3D space where the ray intersects the scene's plane
    const intersects = raycaster.intersectObject(plane);

    if (intersects.length > 0) {
        // Make the cube look at the intersection point
        console.log(intersects[0].point);
        model.lookAt(intersects[0].point);
        // model.rotation.y += Math.PI; // Rotate 180 degrees around the Y-axis to face the camera (adjust as needed)
    }
}

window.addEventListener('mousemove', onMouseMove, false);


function animate() {
    renderer.render(scene, camera);

    if (model) {
        // model.rotation.y = rotationX - Math.PI; // Rotate the model
        // model.rotation.x = - rotationY; // Rotate the model
    }
}
