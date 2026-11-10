import * as THREE from 'three';

/** Original wire lattice. No portrait, no character. */
export function mountWire(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
  camera.position.z = 4.4;

  const globe = new THREE.IcosahedronGeometry(1.55, 2);
  const wires = new THREE.LineSegments(
    new THREE.WireframeGeometry(globe),
    new THREE.LineBasicMaterial({ color: 0x9a93a3, transparent: true, opacity: 0.8 }),
  );
  const nodes = new THREE.Points(
    globe,
    new THREE.PointsMaterial({ color: 0xc8102e, size: 0.028, sizeAttenuation: true }),
  );
  scene.add(wires);
  scene.add(nodes);

  let targetX = 0;
  let targetY = 0;
  let spinX = 0;
  let spinY = 0;
  const onMove = (event: PointerEvent) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 0.7;
    targetY = (event.clientY / window.innerHeight - 0.5) * 0.45;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const resize = () => {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  let frame = 0;
  const loop = (time: number) => {
    frame = requestAnimationFrame(loop);
    spinX += (targetX - spinX) * 0.04;
    spinY += (targetY - spinY) * 0.04;
    const scale = 1 + Math.sin(time * 0.00035) * 0.045;
    wires.rotation.y = time * 0.00012 + spinX;
    wires.rotation.x = spinY * 0.7;
    wires.scale.setScalar(scale);
    nodes.rotation.copy(wires.rotation);
    nodes.scale.copy(wires.scale);
    renderer.render(scene, camera);
  };
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('resize', resize);
    wires.geometry.dispose();
    (wires.material as THREE.Material).dispose();
    (nodes.material as THREE.Material).dispose();
    renderer.dispose();
  };
}
