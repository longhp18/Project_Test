"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
// Dữ liệu mảng
var data = [
    { position: "1", team: "Red Bull", points: "321" },
    { position: "2", team: "Mercedes", points: "167" },
    { position: "3", team: "Aston Martin", points: "154" },
    { position: "4", team: "Ferrari", points: "122" },
    { position: "5", team: "Alpine F1 Team", points: "44" },
    { position: "6", team: "McLaren", points: "17" },
    { position: "7", team: "Alfa Romeo", points: "9" },
    { position: "8", team: "Haas F1 Team", points: "8" },
    { position: "9", team: "Williams", points: "7" },
    { position: "10", team: "AlphaTauri", points: "2" }
];
// Tạo Scene
var scene = new THREE.Scene();
// Tạo Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// Tạo Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Tạo Geometry và Material
var geometry = new THREE.BoxGeometry(1, 1, 1);
// Lặp qua dữ liệu và tạo Mesh cho mỗi mục
data.forEach(function (item) {
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    // Vị trí và góc xoay của mỗi cube
    cube.position.x = parseFloat(item.position);
    cube.position.y = parseFloat(item.points);
    cube.position.z = 0;
    // Thêm cube vào Scene
    scene.add(cube);
});
// Render Scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
