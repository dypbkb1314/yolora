import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

// 1、创建场景
var scene = new THREE.Scene();

// 2、创建相机（透视投影相机）
var camera = new THREE.PerspectiveCamera(
  50, // 相机视野
  window.innerWidth / window.innerHeight, // 水平方向和竖直方向长度的比值
  0.1, // 近端渲染距离
  1000, // 远端渲染距离
);
// 2.1 设置相机位置
// camera.position.x = 5;
// camera.position.y = 10;
// camera.position.z = 10;
// 2.1 设置相机位置简写方式：
camera.position.set(5, 10, 10);

// 3、创建渲染器
var renderer = new THREE.WebGLRenderer();
// 3.1 设置渲染器的大小（长宽）（设置渲染器为全屏）
renderer.setSize(window.innerWidth, window.innerHeight);
// 3.2 将渲染结果展示到页面上
document.body.appendChild(renderer.domElement);
// 10.1 定义对象，设置需要修改的数据
var controls = {
  positionX: 0,
  positionY: 0,
  positionZ: 0,
};
// 4、创建几何体模型（立方几何体）
var geometry = new THREE.BoxGeometry(4, 4, 4);

// 5、创建材质（基础网格材质和法线网格材质）
// 5.1 创建基础网格材质
var materialBasic = new THREE.MeshBasicMaterial({
  color: 0xffffff, // 白色
  wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
});
// 5.2 创建法线网格材质
var materialNormal = new THREE.MeshNormalMaterial();

// 6、创建多种网格（因为有多个材质）
// 第一个参数是几何模型，第二参数是材质
console.log(THREE);
var cube = new THREE.SceneUtils.createMultiMaterialObject(geometry, [
  materialBasic,
  materialNormal,
]);
// 6.1 让相机 看向（对着）物体（拍摄对象）的位置（默认状态下，相机将指向三维坐标系的原点。）
camera.lookAt(cube.position);
// 6.2、将网格添加到场景中
scene.add(cube);
// 7、创建光源
var spotLight = new THREE.SpotLight(0xffffff);
// 7.1 设置光源位置
spotLight.position.set(0, 20, 20);
// 7.2 设置光源照射的强度，默认值为 1
spotLight.intensity = 5;
// 7.3 将光源添加到场景中
scene.add(spotLight);
// 8、为了方便观察3D图像，添加三维坐标系对象
// var axes = new THREE.AxisHelper(6);
// scene.add(axes);
// 9、创建动画循环渲染函数
function animate() {
  // 9.1 循环调用函数
  requestAnimationFrame(animate);
  // 每一次animate函数调用，都让网格比上一次 X 轴、Y 轴各旋转增加 0.01 弧度
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // 3.3 结合场景和相机进行渲染，即用摄像机拍下此刻的场景
  renderer.render(scene, camera);
}
// 调用动画函数
animate();

// 10.2 实例化dat.GUI对象
var gui = new GUI();
// 10.3 把需要修改的配置添加dat.GUI对象中
gui.add(controls, 'positionX', -10, 10).onChange(updatePosition);
gui.add(controls, 'positionY', -10, 10).onChange(updatePosition);
gui.add(controls, 'positionZ', -1, 1).onChange(updatePosition);
// 10.4 定义更新模型位置函数
function updatePosition() {
  cube.position.set(controls.positionX, controls.positionY, controls.positionZ);
}
