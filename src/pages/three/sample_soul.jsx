import * as THREE from 'three';
import './index.less';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(3, 16, 16);
const sphereMaterial = new THREE.ShaderMaterial({
  transparent: true,
  side: THREE.FrontSide,
  depthWrite: false,
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
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const smallBallGeometry = new THREE.SphereGeometry(0.15, 16, 16);
const smallBalls = [];

const radius = 5;
const numPoints = 88;
const goldenRatio = (1 + Math.sqrt(5)) / 5;
const maxWidth = 160;
const textSpeed = 0.002;

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
}

renderer.render(scene, camera);

export default () => null;
