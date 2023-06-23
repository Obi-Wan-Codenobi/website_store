// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the Earth mesh
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/earth.jpg');
const normalTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/earth_normal.jpg');
const displacementTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/earth_displacement.jpg');
const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: earthTexture,
  normalMap: normalTexture,
  displacementMap: displacementTexture,
  displacementScale: 0.2,
  displacementBias: -0.2,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add animation to the Earth mesh
function animateEarth() {
  earthMesh.rotation.y += 0.01;
  earthMesh.rotation.z += 0.005;
  requestAnimationFrame(animateEarth);
}

animateEarth();

// Handle the store button click event
const storeButton = document.getElementById('store-button');
storeButton.addEventListener('click', () => {
  window.location.href = 'store.html';
});

// Render the scene
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
