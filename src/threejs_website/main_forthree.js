import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(10, 5, 2); // Set camera position
camera.lookAt(0, 0, 0); // Make the camera look at the origin

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // White light with intensity of 0.5
scene.add(ambientLight);

const path = "/models/scene.gltf";
const gltfLoader = new GLTFLoader();
let model = null;
gltfLoader.load(path, (gltfObject) => {
    model = gltfObject.scene;
    model.scale.setScalar(4); // Adjust the scale if needed
    model.position.set(0, 0, 0); // Ensure the model is centered at the origin
    model.rotation.y = Math.PI; // Rotate 180 degrees around the Y-axis to face the camera (adjust as needed)
    console.log(model);
    scene.add(model);
});

function animate() {
    renderer.render(scene, camera);
}
