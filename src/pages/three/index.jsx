// import * as THREE from 'three';
// import img1 from './girl.png';
// import img2 from './bird.png';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// const width = 800;
// const height = 500;
// const scene = new THREE.Scene();
// const axesHelper = new THREE.AxesHelper(500);
// const texture = new THREE.TextureLoader();
// const renderer = new THREE.WebGLRenderer();
// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// // 创建光
// const light = new THREE.PointLight(0xffffff, 1, 0, 0);
// light.position.set(100, 100, 100);
// scene.add(light);
// // 设置光源辅助对象
// const pointLightHelper = new THREE.PointLightHelper(light, 1);
// scene.add(pointLightHelper);
// camera.position.set(300, 300, 400);
// const gh1 = texture.load(img1);
// const gh2 = texture.load(img2);
// const material1 = new THREE.MeshBasicMaterial({
//   map: gh1,
//   side: THREE.DoubleSide,
// });
// const material2 = new THREE.MeshBasicMaterial({
//   map: gh2,
//   side: THREE.DoubleSide,
// });
// const material3 = new THREE.MeshBasicMaterial({
//   map: gh1,
//   side: THREE.DoubleSide,
// });
// const material4 = new THREE.MeshBasicMaterial({
//   map: gh2,
//   side: THREE.DoubleSide,
// });
// const material5 = new THREE.MeshBasicMaterial({
//   map: gh1,
//   side: THREE.DoubleSide,
// });
// const material6 = new THREE.MeshBasicMaterial({
//   map: gh1,
//   side: THREE.DoubleSide,
// });
// const mesh = new THREE.Mesh(geometry, [
//   material1,
//   material2,
//   material3,
//   material4,
//   material5,
//   material6,
// ]);
// camera.lookAt(mesh.position); //指向mesh对应的位置
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', function () {
//   // 重新执行渲染操作
//   renderer.render(scene, camera);
// });
// controls.minDistance = 0;
// controls.maxDistance = 2000;

// // 摄像机放球体中心
// camera.position.set(-0.3, 0, 0);

// scene.add(axesHelper);
// scene.add(mesh);
// renderer.setSize(window.innerWidth, window.innerHeight); //设置three.js渲染区域的尺寸(像素px)const boxRef = useRef(null);

// renderer.render(scene, camera);
// document.body.appendChild(renderer.domElement);

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

// 查看帧率
const stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

// 设置gui控制器
const gui = new GUI();

const axesHelper = new THREE.AxesHelper(200); // 坐标轴
const scene = new THREE.Scene(); // 创建场景
// const geometry = new THREE.BoxGeometry(10, 10, 10); // 创建几何体形状
const geometry = new THREE.SphereGeometry(10, 16, 16); // 创建几何体形状
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.6,
  wireframe: true,
  side: THREE.DoubleSide,
}); // 创建几何体材质

geometry.translate(30,30,30)

// setTimeout(() => {
//     geometry.center(); // 居中，坐标原点
// }, 3000)

const vectories = new THREE.Vector3(1, 1,1)
vectories.normalize();

// 定点数据
const bufferGeometry = new THREE.BufferGeometry(); // 缓冲类型几何体

const pointArr = new Float32Array([ // 定义几何体的顶点坐标
    0, 0 , -50, // 0
    50, 0, -50, // 1
    50,50, -50, // 2
    0, 50, -50, // 3

    0, 0, 0, // 4
    50, 0, 0, // 5
    50, 50, 0, // 6
    0, 50, 0, // 7
])

const normals = new Float32Array([
    0, 0, -3,
    0, 0, -3,
    0, 0, -3,
    0, 0, -3,
    0, 0, 3,
    0, 0, 3,
    0, 0, 3,
    0, 0, 3,
])

const attribute = new THREE.BufferAttribute(pointArr, 3); // 生成顶点坐标的attribute属性

const indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7
]);

bufferGeometry.index = new THREE.BufferAttribute(indexes, 1);

bufferGeometry.attributes.position = attribute; // 赋值给缓冲几何体的position属性
bufferGeometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

// const pointMaterial = new THREE.PointsMaterial({ // 定义顶点材质
//     color: 'aqua',
//     size: 2,
// })
//
// const points = new THREE.Points(bufferGeometry, pointMaterial); // 生成顶点
//
// scene.add(points);

// 线模型对象

const pointMaterials = new THREE.MeshLambertMaterial({
    color: 'aqua',
    side: THREE.DoubleSide,
})

// const line = new THREE.Line(bufferGeometry, lineMaterial); // 顺序链接上面的缓冲几何体， 可能存在不闭合
// const line = new THREE.LineLoop(bufferGeometry, lineMaterial); // 连接并且闭合线条
// const line = new THREE.LineSegments(bufferGeometry, lineMaterial); // 非连续线条

const pointMesh = new THREE.Mesh(bufferGeometry, pointMaterials)

scene.add(pointMesh);

let mesh;

// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     mesh = new THREE.Mesh(geometry, material); // 创建网格对象模型
//     mesh.position.set(i * 30, 0, j * 30); // 设置模型在场景中的位置
//     scene.add(mesh);
//   }
// }

mesh = new THREE.Mesh(geometry, material); // 创建网格对象模型
mesh.position.set(0, 0, 0); // 设置模型在场景中的位置
scene.add(mesh);

mesh.translateOnAxis(vectories, 50)

scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(120, 1, 1, 1000); // 创建透视投影相机
camera.position.set(75, 50, 75); // 设置相机在场景中的位置
camera.lookAt(mesh.position); // 设置相机的拍摄目标

const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0); // 创建点光源
pointLight.position.set(75, 100, 75); // 设置点光源位置

const pointHelper = new THREE.PointLightHelper(pointLight, 10); // 设置光源辅助
scene.add(pointHelper); // 添加至场景
scene.add(pointLight); // 添加至场景

const renderer = new THREE.WebGLRenderer({
  antilias: true, // 设置抗锯齿
}); // 实例化渲染器
renderer.setSize(500, 500); // 设置大小 - canvas画布的大小
renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比
renderer.render(scene, camera); // 渲染之前声明的场景以及相机
renderer.setClearColor(0x444444, 0.7); // 设置画布背景色
document.body.appendChild(renderer.domElement); // 将渲染器添加至html页面中

new OrbitControls(camera, renderer.domElement); // 设置轨道控制器
// orbitControls.addEventListener('change', () => { // 设置了requestAnimationFrame就不需要监听change事件了
//   renderer.render(scene, camera);
// });

const isRotate = {
  bool: false,
};

// 物体参数
const materialFolder = gui.addFolder('物体参数');

materialFolder.add(mesh.position, 'x', 0, 180).name('X轴');
materialFolder.add(mesh.position, 'y', 0, 180).name('Y轴');
materialFolder.add(mesh.position, 'z', 0, 180).name('Z轴');
materialFolder
  .add(mesh.position, 'x', [10, 20, 30, 40])
  .name('X轴下拉选择数组');
materialFolder
  .add(mesh.position, 'x', {
    left: -10,
    center: 50,
    right: 110,
  })
  .name('X轴下拉选择对象');
materialFolder.add(mesh.scale, 'x', 0, 5).name('x轴方向缩放')
materialFolder.add(mesh.scale, 'y', 0, 5).name('y轴方向缩放')
materialFolder.add(mesh.scale, 'z', 0, 5).name('z轴方向缩放')

const materialColor = {
  color: 'aqua',
};

materialFolder
  .addColor(materialColor, 'color')
  .onChange((val) => {
    console.log(val);
    material.color.set(val);
  })
  .name('材质颜色');
materialFolder.add(isRotate, 'bool').name('是否旋转');

const lightFolder = gui.addFolder('光线参数');
lightFolder.close();
lightFolder.addColor(pointLight, 'color').name('光源颜色');

console.log('position', mesh.position)
console.log('rotation', mesh.rotation)
console.log('quaternion', mesh.quaternion)

const euler = new THREE.Euler(Math.PI / 4, 0, Math.PI / 3)
pointMesh.rotation.copy(euler)

const rotateVector = new THREE.Vector3(2,1,2)
const normallize = rotateVector.normalize();

pointMesh.rotateOnAxis(normallize, Math.PI / 6)

const color = new THREE.Color();
color.setStyle('#f53565')
color.setHex(0x00ff11)
color.setRGB(1,2,3)
pointMaterials.color.set(color)

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(50,50)
const planeMaterial = new THREE.MeshLambertMaterial({
    color: '#f33ff1'
})
planeMaterial.side = THREE.DoubleSide;
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.position.set(55, 55, 0)

scene.add(planeMesh)

const planeMesh2 = planeMesh.clone()
planeMesh2.material.wireframe = true;
planeMesh2.position.set(-50, -50,-50);
planeMesh2.rotateX(Math.PI / 3)
scene.add(planeMesh2)

console.log(planeMesh.geometry, planeMesh.material)

function render() {
  stats.update();
  if (isRotate.bool) {
    mesh.rotateY(0.01);
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}
render();

export default () => null;
