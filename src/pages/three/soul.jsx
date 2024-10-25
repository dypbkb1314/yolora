import * as THREE from 'three';
import './index.less';
// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75, // 摄像机视锥体垂直视野角度
  window.innerWidth / window.innerHeight, // 摄像机视锥体长宽比
  0.1, // 摄像机视锥体近端面
  1000, // 摄像机视锥体远端面
);

camera.position.set(0, 0, 14); // 摄像机所在位置
camera.lookAt(0, 0, 0); // 摄像机观看位置

// 创建渲染器
// WebGLRenderer将相机锥体中的三维图像转换成二维图像显示在画布中； antialies：是否抗锯齿，默认为false；alpha：是否背景透明，默认false
const renderer = new THREE.WebGLRenderer({ antialies: true, alpha: true });
// 设置canvas宽高
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// 设置背景颜色：颜色+透明度
renderer.setClearColor(0x000000, 0);
// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement);

// 创建球体
// SphereGeometry用于生成几何球体，三个参数分别表示半径、宽度分段（水平方向的分段数，最小值为3，默认32）、高度分段（垂直方向的分段数，最小值为2，默认16）
// 增加分割段数可以增加球体的平滑度
const sphereGeometry = new THREE.SphereGeometry(4.85, 16, 16);
const sphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: {
      value: new THREE.Color(0x000000),
    },
    opacity: {
      value: 0.8,
    },
  },
  vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
  fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying vec3 vNormal;
        void main() {
            float alpha = opacity * smoothstep(0.5, 1.0, vNormal.z);
            gl_FragColor = vec4(color, alpha);
        }
      `,
  transparent: true,
  side: THREE.FrontSide,
  depthWrite: false,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// 生成小球
const smallBallGeometry = new THREE.SphereGeometry(0.15, 16, 16);
// 小球集合
const smallBalls = [];
// 文字集合
const labelSprites = [];

const radius = 5;
const numPoints = 88;
const goldenRatio = (1 + Math.sqrt(5)) / 5;
const maxWidth = 160;
const textSpeed = 0.002;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function getRandomBrightColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40 + 10);
  const lightness = Math.floor(Math.random() * 40 + 40);

  const rgb = hslToRgb(hue, saturation, lightness);

  return (rgb.r << 16) | (rgb.g << 8) | rgb.b;
}

function getRandomNickname() {
  const adjectives = [
    'Cool',
    'Crazy',
    'Mysterious',
    'Happy',
    'Silly',
    'Brave',
    'Smart',
    'Swift',
    'Fierce',
    'Gentle',
  ];
  const nouns = [
    'Tiger',
    'Lion',
    'Dragon',
    'Wizard',
    'Ninja',
    'Pirate',
    'Hero',
    'Ghost',
    'Phantom',
    'Knight',
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const nickname = `${randomAdjective} ${randomNoun}`;

  if (nickname.length < 2) {
    return getRandomNickname();
  } else if (nickname.length > 22) {
    return nickname.slice(0, 22);
  }

  return nickname;
}

function createTextTexture(text, parameters = {}) {
  const {
    fontSize = 24,
    fontFace = 'PingFang SC, Microsoft YaHei, Noto Sans, Arial, sans-serif',
    textColor = 'white',
    backGroundColor = 'rgba(0, 0, 0, 0)',
    maxWidth = 160,
  } = parameters;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `${fontSize}px ${fontFace}`;

  // 计算当前文本下的文本宽度
  const textMetries = context.measureText(text);
  const textWidth = Math.ceil(textMetries.width);
  const textHeight = fontSize * 1.2;

  // 是否超出最大宽度，是否需要展示文字滚动展示效果
  const needMarquee = textWidth > maxWidth;

  let canvasWidth = maxWidth;
  if (needMarquee) {
    canvasWidth = textWidth + 60;
  }

  canvas.width = canvasWidth;
  canvas.height = textHeight;
  context.font = `${fontSize}px ${fontFace}`;
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = backGroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = textColor;
  context.textAlign = needMarquee ? 'left' : 'center';
  context.textBaseline = 'middle';

  if (needMarquee) {
    context.fillText(text, 0, canvas.height / 2);
  } else {
    context.fillText(text, maxWidth / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  if (needMarquee) {
    texture.wraps = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.x = maxWidth / canvas.width;
  } else {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
  }

  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return {
    texture,
    needMarquee,
    HWRate: textHeight / maxWidth,
  };
}

for (let i = 0; i < numPoints; i++) {
  const y = 1 - (i / (numPoints - 1)) * 2;
  const radiusAtY = Math.sqrt(1 - y * y);

  const theta = (2 * Math.PI * i) / goldenRatio;

  const x = Math.cos(theta) * radiusAtY;
  const z = Math.sin(theta) * radiusAtY;
  const smallBallMaterial = new THREE.MeshBasicMaterial({
    depthTest: true,
    depthWrite: true,
    side: THREE.FrontSide,
    color: getRandomBrightColor(),
  });
  const smallBall = new THREE.Mesh(smallBallGeometry, smallBallMaterial);
  smallBall.position.set(x * radius, y * radius, z * radius);
  sphere.add(smallBall);
  smallBalls.push(smallBall);

  const labelText = getRandomNickname();
  const { texture, needMarquee, HWRate } = createTextTexture(labelText, {
    fontSize: 28,
    fontFace: 'PingFang SC, Microsoft YaHei, Noto Sans, Arial, sans-serif',
    textColor: '#bbbbbb',
    maxWidth: maxWidth,
  });

  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: true,
    blending: THREE.NormalBlending,
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(1, HWRate, 1);
  labelSprites.push({
    sprite,
    smallBall,
    texture,
    needMarquee,
    labelText,
  });
  scene.add(sprite);
}

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const autoRotationSpeed = 0.0005;
let autoRotationAxis = new THREE.Vector3(0, 1, 0).normalize();
let currentAngularVelocity = autoRotationAxis
  .clone()
  .multiplyScalar(autoRotationSpeed);

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let lastDragDelta = { x: 0, y: 0 };

const decayRate = 0.92;
const increaseRate = 1.02;

// 鼠标事件处理
const onMouseDown = (event) => {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
};

const onMouseMove = (event) => {
  if (isDragging) {
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    lastDragDelta = { x: deltaX, y: deltaY };

    const rotationFactor = 0.005;

    const angleY = deltaX * rotationFactor;
    const angleX = deltaY * rotationFactor;

    const quaternionY = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angleY,
    );
    const quaternionX = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      angleX,
    );

    const deltaQuat = new THREE.Quaternion().multiplyQuaternions(
      quaternionY,
      quaternionX,
    );

    sphere.quaternion.multiplyQuaternions(deltaQuat, sphere.quaternion);

    const dragRotationAxis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
    const dragRotationSpeed =
      Math.sqrt(deltaX * deltaX + deltaY * deltaY) * rotationFactor;

    if (dragRotationAxis.length() > 0) {
      currentAngularVelocity
        .copy(dragRotationAxis)
        .multiplyScalar(dragRotationSpeed);
    }

    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }
};

const onMouseUp = () => {
  if (isDragging) {
    isDragging = false;

    const deltaX = lastDragDelta.x;
    const deltaY = lastDragDelta.y;

    if (deltaX !== 0 || deltaY !== 0) {
      const newAxis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
      if (newAxis.length() > 0) {
        autoRotationAxis.copy(newAxis);
      }

      const dragSpeed = currentAngularVelocity.length();
      if (dragSpeed > autoRotationSpeed) {
        // 维持当前旋转速度
      } else {
        currentAngularVelocity
          .copy(autoRotationAxis)
          .multiplyScalar(autoRotationSpeed);
      }
    }
  }
};

// 触摸事件处理
const onTouchStart = (event) => {
  isDragging = true;
  const touch = event.touches[0];
  previousMousePosition = {
    x: touch.clientX,
    y: touch.clientY,
  };
};

const onTouchMove = (event) => {
  event.preventDefault();
  if (isDragging) {
    const touch = event.touches[0];
    const deltaX = touch.clientX - previousMousePosition.x;
    const deltaY = touch.clientY - previousMousePosition.y;

    lastDragDelta = { x: deltaX, y: deltaY };

    const rotationFactor = 0.002;

    const angleY = deltaX * rotationFactor;
    const angleX = deltaY * rotationFactor;

    const quaternionY = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angleY,
    );
    const quaternionX = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      angleX,
    );

    const deltaQuat = new THREE.Quaternion().multiplyQuaternions(
      quaternionY,
      quaternionX,
    );

    sphere.quaternion.multiplyQuaternions(deltaQuat, sphere.quaternion);

    const dragRotationAxis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
    const dragRotationSpeed =
      Math.sqrt(deltaX * deltaX + deltaY * deltaY) * rotationFactor;

    if (dragRotationAxis.length() > 0) {
      currentAngularVelocity
        .copy(dragRotationAxis)
        .multiplyScalar(dragRotationSpeed);
    }

    previousMousePosition = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }
};

const onTouchEnd = (event) => {
  if (isDragging) {
    isDragging = false;

    const deltaX = lastDragDelta.x;
    const deltaY = lastDragDelta.y;

    if (deltaX !== 0 || deltaY !== 0) {
      const newAxis = new THREE.Vector3(deltaY, deltaX, 0).normalize();
      if (newAxis.length() > 0) {
        autoRotationAxis.copy(newAxis);
      }

      const dragSpeed = currentAngularVelocity.length();
      if (dragSpeed > autoRotationSpeed) {
        // 维持当前旋转速度
      } else {
        currentAngularVelocity
          .copy(autoRotationAxis)
          .multiplyScalar(autoRotationSpeed);
      }
    }
  }

  // 检查点击事件
  if (event.changedTouches.length > 0) {
    const touch = event.changedTouches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    checkIntersection();
  }
};

// 事件监听
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('touchstart', onTouchStart);
window.addEventListener('touchmove', onTouchMove);
window.addEventListener('touchend', onTouchEnd);
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

// 添加点击事件监听
window.addEventListener('click', onMouseClick);

// 处理窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function onMouseClick(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  console.log(event.clientX, mouse.x, mouse.y);

  checkIntersection();
}

function checkIntersection() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(smallBalls);

  if (intersects.length > 0) {
    const intersectedBall = intersects[0].object;
    const index = smallBalls.indexOf(intersectedBall);
    if (index !== -1) {
      const labelInfo = labelSprites[index];
      showLabelInfo(labelInfo);
    }
  }
}

function showLabelInfo(labelInfo) {
  alert(`点击的小球标签：${labelInfo.labelText}`);
}

function animate() {
  requestAnimationFrame(animate);

  if (!isDragging) {
    const deltaQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        currentAngularVelocity.x,
        currentAngularVelocity.y,
        currentAngularVelocity.z,
        'XYZ',
      ),
    );
    sphere.quaternion.multiplyQuaternions(deltaQuat, sphere.quaternion);

    const currentSpeed = currentAngularVelocity.length();

    if (currentSpeed > autoRotationSpeed) {
      currentAngularVelocity.multiplyScalar(decayRate);

      if (currentAngularVelocity.length() < autoRotationSpeed) {
        currentAngularVelocity
          .copy(autoRotationAxis)
          .multiplyScalar(autoRotationSpeed);
      }
    } else if (currentSpeed < autoRotationSpeed) {
      currentAngularVelocity.multiplyScalar(increaseRate);

      if (currentAngularVelocity.length() > autoRotationSpeed) {
        currentAngularVelocity
          .copy(autoRotationAxis)
          .multiplyScalar(autoRotationSpeed);
      }
    } else {
      currentAngularVelocity
        .copy(autoRotationAxis)
        .multiplyScalar(autoRotationSpeed);
    }
  }

  labelSprites.forEach(({ sprite, smallBall, texture, needMarquee }) => {
    smallBall.updateMatrixWorld();
    const smallBallWorldPos = new THREE.Vector3();
    smallBall.getWorldPosition(smallBallWorldPos);

    const upOffset = new THREE.Vector3(0, 0.3, 0);

    sprite.position.copy(smallBallWorldPos).add(upOffset);

    if (needMarquee) {
      texture.offset.x += textSpeed;

      if (texture.offset.x > 1) {
        texture.offset.x = 0;
      }
    }
  });

  renderer.render(scene, camera);
}
animate();
const Soul = () => {
  return null;
};

export default Soul;
