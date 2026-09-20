import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Star field + drifting particles. Pure geometry: nothing is fetched. */
const Stars: React.FC<{ count: number; color: string }> = ({ count, color }) => {
  const geo = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 14 + Math.random() * 26;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.6;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);
  const ref = React.useRef<THREE.Points>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.01;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.14} color={color} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
};

/** Particles that gather towards the book. */
const Motes: React.FC<{ color: string; count: number }> = ({ color, count }) => {
  const ref = React.useRef<THREE.Points>(null);
  const { geo, seeds } = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const s: number[] = [];
    for (let i = 0; i < count; i++) {
      s.push(Math.random() * Math.PI * 2, 2 + Math.random() * 5, Math.random() * 2 - 1);
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo: g, seeds: s };
  }, [count]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const a = seeds[i * 3] + t * 0.18;
      const r = seeds[i * 3 + 1] * (0.55 + 0.45 * Math.sin(t * 0.35 + i));
      arr[i * 3] = r * Math.cos(a);
      arr[i * 3 + 1] = seeds[i * 3 + 2] * 2 + Math.sin(t * 0.6 + i) * 0.4;
      arr[i * 3 + 2] = r * Math.sin(a);
    }
    geo.attributes.position.needsUpdate = true;
    if (ref.current) ref.current.rotation.y = t * 0.05;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.09} color={color} transparent opacity={0.9} />
    </points>
  );
};

const Book: React.FC<{ open: boolean; accent: string; accent2: string }> = ({ open, accent, accent2 }) => {
  const group = React.useRef<THREE.Group>(null);
  const left = React.useRef<THREE.Group>(null);
  const right = React.useRef<THREE.Group>(null);
  const progress = React.useRef(0);
  useFrame((state, d) => {
    progress.current += ((open ? 1 : 0) - progress.current) * Math.min(1, d * 2.2);
    const p = progress.current;
    if (left.current) left.current.rotation.y = -p * 1.5;
    if (right.current) right.current.rotation.y = p * 1.5;
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = Math.sin(t * 0.25) * 0.28 + p * 0.1;
      group.current.rotation.x = -0.35 + Math.sin(t * 0.4) * 0.03 - p * 0.12;
      group.current.position.y = Math.sin(t * 0.7) * 0.09;
    }
  });
  const cover = (
    <meshStandardMaterial color="#1b2338" roughness={0.55} metalness={0.45} emissive={new THREE.Color(accent).multiplyScalar(0.06)} />
  );
  return (
    <group ref={group} scale={1.25}>
      {/* spine */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 2.6, 0.5]} />
        <meshStandardMaterial color="#2a3350" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* left cover + pages */}
      <group ref={left} position={[-0.11, 0, 0]}>
        <mesh position={[-0.95, 0, 0]}>
          <boxGeometry args={[1.9, 2.6, 0.09]} />
          {cover}
        </mesh>
        <mesh position={[-0.94, 0, 0.07]}>
          <boxGeometry args={[1.8, 2.45, 0.06]} />
          <meshStandardMaterial color="#efe9d8" roughness={0.9} />
        </mesh>
      </group>
      {/* right cover + pages */}
      <group ref={right} position={[0.11, 0, 0]}>
        <mesh position={[0.95, 0, 0]}>
          <boxGeometry args={[1.9, 2.6, 0.09]} />
          {cover}
        </mesh>
        <mesh position={[0.94, 0, 0.07]}>
          <boxGeometry args={[1.8, 2.45, 0.06]} />
          <meshStandardMaterial color="#efe9d8" roughness={0.9} />
        </mesh>
      </group>
      {/* orbital ring above the book */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, 1.7, 0]}>
        <torusGeometry args={[1.25, 0.012, 8, 90]} />
        <meshBasicMaterial color={accent} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, 0.6, 0]} position={[0, 1.7, 0]}>
        <torusGeometry args={[0.85, 0.01, 8, 80]} />
        <meshBasicMaterial color={accent2} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

export const BookScene: React.FC<{ open: boolean; accent: string; accent2: string; star: string; quality: "high" | "balanced" }> = ({
  open, accent, accent2, star, quality,
}) => (
  <Canvas
    camera={{ position: [0, 0.6, 7], fov: 42 }}
    dpr={quality === "high" ? [1, 2] : 1}
    gl={{ antialias: quality === "high", powerPreference: "high-performance" }}
    style={{ position: "absolute", inset: 0 }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[4, 6, 5]} intensity={1.3} color={accent} />
    <directionalLight position={[-5, -2, -3]} intensity={0.7} color={accent2} />
    <Stars count={quality === "high" ? 900 : 350} color={star} />
    <Motes count={quality === "high" ? 260 : 90} color={accent} />
    <Book open={open} accent={accent} accent2={accent2} />
  </Canvas>
);

export default BookScene;
