import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={scene} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
