import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { DoubleSide, type Group } from 'three';

const VIOLET = '#c4b5fd';
const GLOW = '#c084fc';
const RADIUS = 1.28;

const NODE_SEEDS: Array<[number, number, number]> = [
  [0.55, 0.78, 0.36],
  [-0.82, 0.24, 0.46],
  [0.18, -0.7, 0.72],
  [-0.28, 0.22, -0.9],
  [0.9, -0.18, -0.28],
  [-0.15, 0.92, -0.2],
];

function onSphere(p: [number, number, number], radius: number): [number, number, number] {
  const len = Math.hypot(p[0], p[1], p[2]) || 1;
  return [(p[0] / len) * radius, (p[1] / len) * radius, (p[2] / len) * radius];
}

function parallel(y: number, radius: number, segments = 96): Array<[number, number, number]> {
  const ring = Math.sqrt(Math.max(0, radius * radius - y * y));
  const pts: Array<[number, number, number]> = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(a) * ring, y, Math.sin(a) * ring]);
  }
  return pts;
}

function meridian(angle: number, radius: number, segments = 96): Array<[number, number, number]> {
  const pts: Array<[number, number, number]> = [];
  for (let i = 0; i <= segments; i++) {
    const p = (i / segments) * Math.PI - Math.PI / 2;
    const y = Math.sin(p) * radius;
    const ring = Math.cos(p) * radius;
    pts.push([Math.cos(angle) * ring, y, Math.sin(angle) * ring]);
  }
  return pts;
}

function shellPoints(count: number, radius: number) {
  const arr = new Float32Array(count * 3);
  let seed = 0xdec0de;
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);
  }
  return arr;
}

function Graticule({ points, opacity }: { points: Array<[number, number, number]>; opacity: number }) {
  const position = useMemo(() => new Float32Array(points.flat()), [points]);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[position, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={VIOLET} transparent opacity={opacity} />
    </line>
  );
}

function Globe() {
  const parallels = useMemo(
    () => [-0.78, -0.4, 0, 0.4, 0.78].map((y) => parallel(y, RADIUS)),
    [],
  );
  const meridians = useMemo(
    () => [0, 1, 2, 3, 4, 5].map((i) => meridian((i / 6) * Math.PI, RADIUS)),
    [],
  );
  const points = useMemo(() => shellPoints(72, RADIUS), []);
  const nodes = useMemo(() => NODE_SEEDS.map((p) => onSphere(p, RADIUS * 1.02)), []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.98, 48, 32]} />
        <meshBasicMaterial color="#2a1248" transparent opacity={0.55} />
      </mesh>
      {parallels.map((pts, i) => (
        <Graticule key={`p-${i}`} points={pts} opacity={i === 2 ? 0.7 : 0.28} />
      ))}
      {meridians.map((pts, i) => (
        <Graticule key={`m-${i}`} points={pts} opacity={0.32} />
      ))}
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color="#f3e8ff"
          size={0.028}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </points>
      {nodes.map((position, i) => (
        <group key={i} position={position}>
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={VIOLET} transparent opacity={0.2} depthWrite={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.026, 16, 16]} />
            <meshBasicMaterial color="#f5e9ff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ScopeRings() {
  return (
    <group>
      <mesh>
        <ringGeometry args={[1.52, 1.534, 96]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.55} side={DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.7, 1.71, 96]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.22} side={DoubleSide} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle) => (
        <mesh key={angle} position={[Math.cos(angle) * 1.61, Math.sin(angle) * 1.61, 0]} rotation={[0, 0, angle]}>
          <planeGeometry args={[0.012, 0.11]} />
          <meshBasicMaterial color={GLOW} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;
    const onMove = (event: Event) => {
      const pe = event as PointerEvent;
      if (pe.pointerType && pe.pointerType !== 'mouse') return;
      const rect = hero.getBoundingClientRect();
      pointer.current.x = ((pe.clientX - rect.left) / rect.width - 0.5) * 0.45;
      pointer.current.y = -((pe.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    hero.addEventListener('pointermove', onMove);
    return () => hero.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    if (spin.current) spin.current.rotation.y += step * 0.16;
    if (tilt.current) {
      tilt.current.rotation.y += (pointer.current.x - tilt.current.rotation.y) * Math.min(1, step * 2.4);
      tilt.current.rotation.x += (pointer.current.y - tilt.current.rotation.x) * Math.min(1, step * 2.4);
    }
  });

  return (
    <group ref={tilt}>
      <Float speed={1} rotationIntensity={0.04} floatIntensity={0.28} floatingRange={[-0.04, 0.04]}>
        <group ref={spin}>
          <Globe />
        </group>
      </Float>
      <ScopeRings />
    </group>
  );
}

export function ScopeScene({
  active,
  onReady,
}: {
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 4.85], fov: 34 }}
      frameloop={active ? 'always' : 'never'}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady();
      }}
    >
      <Rig />
    </Canvas>
  );
}
