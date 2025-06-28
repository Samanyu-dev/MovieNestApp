
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, shape = 'sphere' }: { 
  position: [number, number, number]; 
  color: string; 
  shape?: 'sphere' | 'box' | 'torus' 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  if (shape === 'box') {
    return (
      <Box ref={meshRef} position={position} args={[1, 1, 1]}>
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Box>
    );
  }

  if (shape === 'torus') {
    return (
      <Torus ref={meshRef} position={position} args={[0.5, 0.2, 16, 100]}>
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Torus>
    );
  }

  return (
    <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </Sphere>
  );
};

const FloatingElements3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <FloatingShape position={[-8, 2, -5]} color="#8b5cf6" shape="sphere" />
        <FloatingShape position={[8, -2, -3]} color="#ec4899" shape="box" />
        <FloatingShape position={[-6, -3, -4]} color="#06b6d4" shape="torus" />
        <FloatingShape position={[6, 3, -6]} color="#f59e0b" shape="sphere" />
        <FloatingShape position={[0, -5, -7]} color="#10b981" shape="box" />
        <FloatingShape position={[-10, 0, -8]} color="#ef4444" shape="torus" />
        <FloatingShape position={[10, 1, -2]} color="#8b5cf6" shape="sphere" />
      </Canvas>
    </div>
  );
};

export default FloatingElements3D;
