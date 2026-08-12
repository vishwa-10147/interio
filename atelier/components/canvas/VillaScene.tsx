"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Sparkles,
  Edges,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * VillaScene
 * A stylized, procedurally-built villa (no external .glb required).
 * Signature interaction: scrollProgress (0 -> 1) drives a blueprint
 * wireframe -> rendered solid transition, a slow orbit, and a zoom-in,
 * so scrolling reads as "the drawing becomes the building".
 *
 * scrollProgress and pointer are refs (mutable objects) rather than state,
 * so we can update them every frame from outside React without re-rendering.
 */

type Refs = {
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
};

function Volume({
  position,
  size,
  reveal,
}: {
  position: [number, number, number];
  size: [number, number, number];
  reveal: React.MutableRefObject<number>;
}) {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const r = reveal.current;
    if (solidRef.current) {
      const mat = solidRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.smoothstep(r, 0.15, 0.85);
    }
    if (wireRef.current) {
      const mat = wireRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 1 - THREE.MathUtils.smoothstep(r, 0.35, 0.95) * 0.92;
    }
  });

  return (
    <group position={position}>
      <mesh ref={solidRef} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#E7E0D2"
          roughness={0.55}
          metalness={0.05}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh ref={wireRef}>
        <boxGeometry args={size} />
        <meshBasicMaterial
          color="#B08D57"
          wireframe
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}

function GlassPlane({
  position,
  size,
  reveal,
}: {
  position: [number, number, number];
  size: [number, number];
  reveal: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshPhysicalMaterial;
      mat.opacity = THREE.MathUtils.smoothstep(reveal.current, 0.3, 0.9) * 0.55;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={size} />
      <meshPhysicalMaterial
        color="#BFD9E8"
        roughness={0.05}
        metalness={0.1}
        transmission={0.6}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

function Tree({
  position,
  scale = 1,
  windOffset = 0,
}: {
  position: [number, number, number];
  scale?: number;
  windOffset?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + windOffset;
      ref.current.rotation.z = Math.sin(t * 0.6) * 0.035;
      ref.current.rotation.x = Math.cos(t * 0.5) * 0.02;
    }
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.09, 1.2, 6]} />
        <meshStandardMaterial color="#3E3A2E" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.55, 1.4, 7]} />
        <meshStandardMaterial color="#3F4A34" roughness={0.85} />
      </mesh>
    </group>
  );
}

function Rig({ scrollProgress, pointer }: Refs) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 1.1, 0));

  useFrame(() => {
    const p = scrollProgress.current;
    // orbit angle: slow constant drift + scroll-driven sweep
    const angle = Math.PI * 0.22 + p * Math.PI * 0.55;
    const radius = THREE.MathUtils.lerp(9.5, 4.2, p);
    const height = THREE.MathUtils.lerp(3.4, 1.7, p);

    const mouseInfluence = 0.35;
    const targetX =
      Math.sin(angle) * radius + pointer.current.x * mouseInfluence;
    const targetZ = Math.cos(angle) * radius;
    const targetY = height - pointer.current.y * 0.25;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.lookAt(target.current);
  });

  return null;
}

function Scene({ scrollProgress, pointer }: Refs) {
  const trees = useMemo(
    () => [
      { position: [-3.4, 0, 1.8] as [number, number, number], scale: 1.1, offset: 0 },
      { position: [3.6, 0, -1.2] as [number, number, number], scale: 0.9, offset: 1.4 },
      { position: [-2.6, 0, -2.6] as [number, number, number], scale: 0.75, offset: 2.7 },
    ],
    []
  );

  return (
    <>
      <Rig scrollProgress={scrollProgress} pointer={pointer} />

      <ambientLight intensity={0.35} color="#EDE7DA" />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.4}
        color="#FFE8C2"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.25} color="#7A93A8" />

      <Environment preset="city" environmentIntensity={0.4} />

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
        <circleGeometry args={[14, 48]} />
        <meshStandardMaterial color="#181712" roughness={1} />
      </mesh>
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.55}
        scale={16}
        blur={2.4}
        far={4}
      />

      <Float speed={0.6} floatIntensity={0.15} rotationIntensity={0.05}>
        <group>
          {/* base volume */}
          <Volume position={[0, 0.6, 0]} size={[3.6, 1.2, 2.4]} reveal={scrollProgress} />
          {/* cantilevered upper volume */}
          <Volume position={[0.6, 1.7, -0.2]} size={[2.6, 1, 2.9]} reveal={scrollProgress} />
          {/* roof slab */}
          <Volume position={[0.6, 2.28, -0.2]} size={[2.8, 0.08, 3.1]} reveal={scrollProgress} />
          {/* glass front */}
          <GlassPlane position={[1.85, 1.7, -0.2]} size={[2.85, 0.95]} reveal={scrollProgress} />
        </group>
      </Float>

      {trees.map((t, i) => (
        <Tree key={i} position={t.position} scale={t.scale} windOffset={t.offset} />
      ))}

      <Sparkles count={40} scale={[10, 4, 10]} size={1.4} speed={0.15} opacity={0.25} color="#D9B77F" />
    </>
  );
}

export default function VillaScene({ scrollProgress, pointer }: Refs) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [3.4, 3.2, 8.6], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#14140F"]} />
      <fog attach="fog" args={["#14140F", 10, 20]} />
      <Scene scrollProgress={scrollProgress} pointer={pointer} />
    </Canvas>
  );
}
