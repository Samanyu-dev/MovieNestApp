
import { useState, useEffect } from 'react';
import { Star, Film, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

interface SplashScreenProps {
  onComplete: () => void;
}

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 800);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showContent, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Content */}
      <div className={`text-center z-10 transition-all duration-1000 ${
        showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Film className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-6xl font-bold text-white mb-2">MovieNest</h1>
            <p className="text-purple-300 text-xl">Your Cinema Universe</p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-8">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          <p className="text-white text-lg">Discover • Curate • Experience</p>
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>

        {/* Progress Bar */}
        <div className="w-80 bg-gray-800 rounded-full h-2 mb-4 mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-400">{progress}% Loading...</p>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 animate-bounce">
          <Star className="w-8 h-8 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Film className="w-6 h-6 text-purple-400 opacity-60" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-bounce" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-7 h-7 text-pink-400 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
