import React, { useEffect } from 'react';
import * as THREE from 'three';
import img1 from './girl.png';
import img2 from './bird.png';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function Three() {
  useEffect(() => {
    const width = 800;
    const height = 500;
    const scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(500);
    const texture = new THREE.TextureLoader();
    const renderer = new THREE.WebGLRenderer();
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
    // 创建光
    const light = new THREE.PointLight(0xffffff, 1, 0, 0);
    light.position.set(100, 100, 100);
    scene.add(light);
    // 设置光源辅助对象
    const pointLightHelper = new THREE.PointLightHelper(light, 1);
    scene.add(pointLightHelper);
    camera.position.set(300, 300, 400);
    const gh1 = texture.load(img1);
    const gh2 = texture.load(img2);
    const material1 = new THREE.MeshBasicMaterial({
      map: gh1,
      side: THREE.DoubleSide,
    });
    const material2 = new THREE.MeshBasicMaterial({
      map: gh2,
      side: THREE.DoubleSide,
    });
    const material3 = new THREE.MeshBasicMaterial({
      map: gh1,
      side: THREE.DoubleSide,
    });
    const material4 = new THREE.MeshBasicMaterial({
      map: gh2,
      side: THREE.DoubleSide,
    });
    const material5 = new THREE.MeshBasicMaterial({
      map: gh1,
      side: THREE.DoubleSide,
    });
    const material6 = new THREE.MeshBasicMaterial({
      map: gh1,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, [
      material1,
      material2,
      material3,
      material4,
      material5,
      material6,
    ]);
    camera.lookAt(mesh.position); //指向mesh对应的位置
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
      // 重新执行渲染操作
      renderer.render(scene, camera);
    });
    controls.minDistance = 1;
    // controls.maxDistance = 200;
    controls.maxDistance = 2;

    // 摄像机放球体中心
    // camera.position.set(10, 0, 0);
    camera.position.set(-0.3, 0, 0);

    scene.add(axesHelper);
    scene.add(mesh);
    renderer.setSize(window.innerWidth, window.innerHeight); //设置three.js渲染区域的尺寸(像素px)
    renderer.render(scene, camera);
    document.getElementById('canvas').children.length === 0 &&
      document.getElementById('canvas').appendChild(renderer.domElement);

    // const animate = () => {
    //   window.requestAnimationFrame(animate)
    //   mesh.rotation.x += 0.01;
    //   mesh.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    // }
    // animate();
  }, []);

  return <div id='canvas'></div>;
}
