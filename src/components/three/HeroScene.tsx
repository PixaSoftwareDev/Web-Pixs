"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Icosahedron } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

/**
 * Esfera icosaédrica wireframe con leve distorsión y float.
 * Reemplazable por un modelo .glb cuando lo cargues en public/assets/models/.
 */
function CyberSphere() {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.25;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <group>
        {/* Núcleo sólido sutil */}
        <Icosahedron args={[1.6, 4]} ref={mesh}>
          <meshStandardMaterial
            color="#0a0d14"
            emissive="#8b5cf6"
            emissiveIntensity={0.25}
            roughness={0.4}
            metalness={0.8}
          />
        </Icosahedron>
        {/* Wireframe cyan */}
        <Icosahedron args={[1.72, 2]}>
          <meshBasicMaterial wireframe color="#00f0ff" transparent opacity={0.6} />
        </Icosahedron>
        {/* Halo magenta exterior */}
        <Icosahedron args={[2.05, 1]}>
          <meshBasicMaterial wireframe color="#ff00d4" transparent opacity={0.18} />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-5, -3, -2]} intensity={0.8} color="#ff00d4" />
      <Suspense fallback={null}>
        <CyberSphere />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
