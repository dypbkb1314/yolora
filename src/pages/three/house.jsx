import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import img1 from './girl.png';

const group1 = new THREE.Group();
group1.name = '主体';

const textureLoader = new THREE.TextureLoader();
const loaderImg = textureLoader.load(img1);
loaderImg.wrapS = THREE.RepeatWrapping;
loaderImg.wrapT = THREE.RepeatWrapping;
loaderImg.repeat.set(10, 10)
loaderImg.offset.x += 10;

const houseMaterial = new THREE.MeshBasicMaterial({
    // color: '#35f59b',
    side: THREE.DoubleSide,
    map: loaderImg,
})
const houseGeomery = new THREE.PlaneGeometry(300, 150)
// const houseGeomery = new THREE.SphereGeometry(50)
// const houseGeomery = new THREE.BoxGeometry(100, 100, 100)
const mesh = new THREE.Mesh(houseGeomery, houseMaterial);
// console.log(houseGeomery.attributes.uv)

// const uvs = new Float32Array([
//     0.3, 0,
//     0.6, 0,
//     0.6, 1,
//     0.3, 1,
// ])
// houseGeomery.attributes.uv = new THREE.BufferAttribute(uvs, 2)
// mesh.position.set(100, 50, 0)
mesh.rotateX(-Math.PI / 2)
mesh.position.y = 1;
// group1.add(mesh)

export default mesh;
