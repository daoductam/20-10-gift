/**
 * THREE.JS 3D SCENE & ANIMATIONS
 * ------------------------------------------------------------
 * 1. Hộp quà 3D tinh xảo với nơ và ruy băng vàng lấp lánh ở màn mở đầu
 * 2. Cánh hoa hồng 3D lơ lửng, rơi xoay lượn sóng tự nhiên trong không gian
 * 3. Tương tác mượt mà với con trỏ chuột / cảm ứng
 */

class Romantic3DScene {
  constructor() {
    this.container = document.getElementById('webgl-canvas-container');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.petals = [];
    this.giftBoxGroup = null;
    this.lidGroup = null;
    this.isOpened = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    if (!this.container) return;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 32);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 3. Lighting
    this.setupLights();

    // 4. Create 3D Gift Box
    this.createGiftBox();

    // 5. Create 3D Rose Petals
    this.createPetals(75);

    // 6. Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));

    // 7. Start Animation Loop
    this.animate();
  }

  setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffe6eb, 0.9);
    this.scene.add(ambientLight);

    // Directional sunlight warm pink
    const dirLight1 = new THREE.DirectionalLight(0xffb6c1, 1.2);
    dirLight1.position.set(15, 20, 20);
    dirLight1.castShadow = true;
    this.scene.add(dirLight1);

    // Golden rim light
    const dirLight2 = new THREE.DirectionalLight(0xffdfba, 0.8);
    dirLight2.position.set(-15, -10, 15);
    this.scene.add(dirLight2);

    // Point light center for sparkling box (tập trung chiếu sáng hộp quà lơ lửng)
    this.sparkleLight = new THREE.PointLight(0xffdf88, 2.8, 35);
    this.sparkleLight.position.set(0, 6.5, 12);
    this.scene.add(this.sparkleLight);
  }

  createGiftBox() {
    this.giftBoxGroup = new THREE.Group();

    // Box Materials
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xe62858,
      roughness: 0.25,
      metalness: 0.15,
      emissive: 0x4a0a1a,
      emissiveIntensity: 0.4
    });

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xf5d061,
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0x73570c,
      emissiveIntensity: 0.3
    });

    // 1. Box Bottom Base (5 x 5 x 5)
    const baseGeo = new THREE.BoxGeometry(5.6, 5.2, 5.6);
    const baseMesh = new THREE.Mesh(baseGeo, boxMat);
    baseMesh.position.y = -0.5;
    this.giftBoxGroup.add(baseMesh);

    // Base Ribbons (vertical cross)
    const ribVert1 = new THREE.Mesh(new THREE.BoxGeometry(5.65, 5.25, 1.1), ribbonMat);
    ribVert1.position.y = -0.5;
    this.giftBoxGroup.add(ribVert1);

    const ribVert2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 5.25, 5.65), ribbonMat);
    ribVert2.position.y = -0.5;
    this.giftBoxGroup.add(ribVert2);

    // 2. Lid Group (Top cap + Ribbons + Bow)
    this.lidGroup = new THREE.Group();
    this.lidGroup.position.set(0, 2.2, 0);

    const lidCapGeo = new THREE.BoxGeometry(6.0, 1.2, 6.0);
    const lidCapMesh = new THREE.Mesh(lidCapGeo, boxMat);
    this.lidGroup.add(lidCapMesh);

    // Lid ribbons
    const lidRib1 = new THREE.Mesh(new THREE.BoxGeometry(6.05, 1.25, 1.1), ribbonMat);
    this.lidGroup.add(lidRib1);
    const lidRib2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.25, 6.05), ribbonMat);
    this.lidGroup.add(lidRib2);

    // 3. Ribbon Bow on top
    const bowGeo = new THREE.TorusGeometry(0.9, 0.22, 16, 32);
    const bow1 = new THREE.Mesh(bowGeo, ribbonMat);
    bow1.position.set(-0.7, 1.1, 0);
    bow1.rotation.y = Math.PI / 4;
    bow1.rotation.z = Math.PI / 3;
    this.lidGroup.add(bow1);

    const bow2 = new THREE.Mesh(bowGeo, ribbonMat);
    bow2.position.set(0.7, 1.1, 0);
    bow2.rotation.y = -Math.PI / 4;
    bow2.rotation.z = -Math.PI / 3;
    this.lidGroup.add(bow2);

    const bowKnot = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), ribbonMat);
    bowKnot.position.set(0, 0.8, 0);
    this.lidGroup.add(bowKnot);

    this.giftBoxGroup.add(this.lidGroup);

    // Vị trí đặt hộp quà ban đầu: Lơ lửng ở nửa trên màn hình, không bị thẻ che khuất
    this.baseGiftBoxY = window.innerWidth < 768 ? 4.4 : 5.2;
    this.giftBoxScale = window.innerWidth < 768 ? 1.05 : 1.35;
    this.giftBoxGroup.position.set(0, this.baseGiftBoxY, 7);
    this.giftBoxGroup.scale.setScalar(this.giftBoxScale);
    this.giftBoxGroup.rotation.y = Math.PI / 6;
    this.giftBoxGroup.rotation.x = 0.22;
    this.scene.add(this.giftBoxGroup);
  }

  createPetals(count = 75) {
    // Custom Petal Geometry: Mảnh cong hình cánh hoa hồng
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.5, 0.5, 0.8, 1.5, 0, 2.2);
    petalShape.bezierCurveTo(-0.8, 1.5, -0.5, 0.5, 0, 0);

    const extrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };

    const petalGeo = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    petalGeo.center();

    // 3 tông màu cánh hoa: hồng phớt, đỏ nhung, hồng sen
    const petalColors = [0xff758c, 0xff5e87, 0xf78ca0, 0xff9a9e, 0xfbc2eb];

    for (let i = 0; i < count; i++) {
      const color = petalColors[Math.floor(Math.random() * petalColors.length)];
      const petalMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.35,
        metalness: 0.05,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });

      const mesh = new THREE.Mesh(petalGeo, petalMat);
      const scale = 0.5 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      // Phân bố ngẫu nhiên trong không gian
      mesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 50 + 5,
        (Math.random() - 0.5) * 35 - 5
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Dynamic speeds
      this.petals.push({
        mesh: mesh,
        speedY: 0.04 + Math.random() * 0.06,
        speedX: (Math.random() - 0.5) * 0.02,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        swingSeed: Math.random() * 100
      });

      this.scene.add(mesh);
    }
  }

  openGiftBox(callback) {
    if (this.isOpened) return;
    this.isOpened = true;

    const startLidY = this.lidGroup.position.y;
    const startTime = performance.now();
    const duration = 1200;

    const animateOpen = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      if (this.lidGroup) {
        this.lidGroup.position.y = startLidY + ease * 12;
        this.lidGroup.position.z = -ease * 6;
        this.lidGroup.rotation.x = -ease * 1.5;
        this.lidGroup.rotation.y = ease * 0.8;
      }

      if (this.giftBoxGroup) {
        this.giftBoxGroup.scale.setScalar((this.giftBoxScale || 1.25) * (1 - ease * 0.95));
        this.giftBoxGroup.position.y = (this.baseGiftBoxY || 5.2) - ease * 8;
        this.giftBoxGroup.rotation.y += 0.08;
      }

      if (progress < 1) {
        requestAnimationFrame(animateOpen);
      } else {
        if (this.giftBoxGroup) {
          this.scene.remove(this.giftBoxGroup);
        }
        if (callback) callback();
      }
    };

    requestAnimationFrame(animateOpen);
  }

  onPointerMove(e) {
    this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Cập nhật vị trí hộp quà khi thay đổi kích thước màn hình
    if (this.giftBoxGroup && !this.isOpened) {
      this.baseGiftBoxY = window.innerWidth < 768 ? 4.4 : 5.4;
      this.giftBoxScale = window.innerWidth < 768 ? 1.05 : 1.35;
      this.giftBoxGroup.scale.setScalar(this.giftBoxScale);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Damping mouse look
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Nhẹ nhàng di chuyển camera theo chuột
    this.camera.position.x = this.mouseX * 3;
    this.camera.position.y = this.mouseY * 2;
    this.camera.lookAt(0, 0, 0);

    // Hộp quà đung đưa lơ lửng và xoay 360 độ rực rỡ ở nửa trên màn hình
    if (this.giftBoxGroup && !this.isOpened) {
      const targetY = this.baseGiftBoxY || (window.innerWidth < 768 ? 4.4 : 5.4);
      this.giftBoxGroup.rotation.y = time * 0.5;
      this.giftBoxGroup.rotation.x = 0.22 + Math.sin(time * 1.5) * 0.06;
      this.giftBoxGroup.position.y = targetY + Math.sin(time * 2.2) * 0.45;
      if (this.sparkleLight) {
        this.sparkleLight.intensity = 2.4 + Math.sin(time * 3.5) * 0.8;
      }
    }

    // Cánh hoa 3D rơi và xoay lượn tự nhiên
    const wind = Math.sin(time * 0.8) * 0.02 + this.mouseX * 0.03;
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.mesh.position.y -= p.speedY;
      p.mesh.position.x += p.speedX + Math.sin(time + p.swingSeed) * 0.03 + wind;
      p.mesh.position.z += Math.cos(time + p.swingSeed) * 0.02;

      p.mesh.rotation.x += p.rotSpeedX;
      p.mesh.rotation.y += p.rotSpeedY;
      p.mesh.rotation.z += p.rotSpeedZ;

      // Khi cánh hoa rơi chạm đáy, đưa lại lên đỉnh
      if (p.mesh.position.y < -25) {
        p.mesh.position.y = 25;
        p.mesh.position.x = (Math.random() - 0.5) * 45;
        p.mesh.position.z = (Math.random() - 0.5) * 35 - 5;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export let threeSceneInstance = null;

export function initThreeScene() {
  threeSceneInstance = new Romantic3DScene();
  return threeSceneInstance;
}
