import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useApp } from "../../context/AppContext";

const themeColors = {
  light: {
    coreCage: "#C8A15A",      // Luxury Gold
    vertexDot: "#B58E4E",     // Amber Glow nodes
    ringColor: "#E3C177",     // Warm Gold
    projector: "#C8A15A",     // Gold Projector
    particles: "#E2C27A",     // Gold particles
    bg: "#F7F3EB",
    light1: "#C8A15A",
    light2: "#BD8565",
    light3: "#EBE9DF"
  },
  dark: {
    coreCage: "#C8A15A",      // Luxury Gold
    vertexDot: "#E2C27A",     // Bright Gold Glow nodes
    ringColor: "#E3C177",     // Warm Gold
    projector: "#C8A15A",     // Projector Base
    particles: "#FFD98A",     // Glowing nodes/dots
    bg: "#161616",
    light1: "#C8A15A",
    light2: "#C8A15A",
    light3: "#E2C27A"
  }
};

// Reusable component representing an orbital ring along with its particle flow
function OrbitalRing({ radius, tubeRadius = 0.006, color, speed, rotation, particleCount = 80, clockwise = true, prefersReduced, isDark }) {
  const ringRef = useRef();
  const particlesRef = useRef();

  const [positions, initialAngles, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const angles = new Float32Array(particleCount);
    const sp = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.1;
      angles[i] = angle;
      sp[i] = (0.75 + Math.random() * 0.5) * (clockwise ? 1 : -1);

      const spread = 0.05;
      const r = radius + (Math.random() - 0.5) * spread;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = 0;
    }
    return [pos, angles, sp];
  }, [radius, particleCount, clockwise]);

  useFrame((state) => {
    if (prefersReduced) return;
    const time = state.clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.z = time * speed * 0.25;
    }

    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const posArr = posAttr.array;
      for (let i = 0; i < particleCount; i++) {
        const currentAngle = initialAngles[i] + time * speed * speeds[i] * 0.4;
        const r = radius + Math.sin(time * 2 + i) * 0.015;
        posArr[i * 3] = Math.cos(currentAngle) * r;
        posArr[i * 3 + 1] = Math.sin(currentAngle) * r;
        posArr[i * 3 + 2] = Math.sin(currentAngle * 2 + time * speeds[i]) * 0.035;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group rotation={rotation}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, tubeRadius, 8, 120]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDark ? 2.5 : 0.3}
          transparent
          opacity={isDark ? 0.35 : 0.65}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={color}
          transparent
          opacity={isDark ? 0.85 : 0.8}
          sizeAttenuation
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

// Element 1: Double-Layered Geodesic Network Core with Solid Globe
function NetworkCore({ theme, prefersReduced }) {
  const outerCageRef = useRef();
  const pulseRef = useRef();
  const nodeRef = useRef();

  const palette = themeColors[theme] || themeColors.light;
  const isDark = theme === "dark";

  // Compute vertices of outer icosahedron (detail 2) to draw clean junction points
  const outerVertices = useMemo(() => {
    const tempGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const posAttr = tempGeo.attributes.position;
    const verts = [];
    const seen = new Set();
    for (let i = 0; i < posAttr.count; i++) {
      const x = Number(posAttr.getX(i).toFixed(4));
      const y = Number(posAttr.getY(i).toFixed(4));
      const z = Number(posAttr.getZ(i).toFixed(4));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        verts.push(new THREE.Vector3(x, y, z));
      }
    }
    tempGeo.dispose();

    const arr = new Float32Array(verts.length * 3);
    verts.forEach((pos, idx) => {
      arr[idx * 3] = pos.x;
      arr[idx * 3 + 1] = pos.y;
      arr[idx * 3 + 2] = pos.z;
    });
    return arr;
  }, []);

  useFrame((state) => {
    if (prefersReduced) return;
    const time = state.clock.getElapsedTime();

    // Outer wireframe geodesic cage rotates independently at 360 degrees every 110s (Math.PI / 55)
    if (outerCageRef.current) {
      outerCageRef.current.rotation.y = time * (Math.PI / 55);
    }

    // Central graphite globe and world map rotate very slowly at 360 degrees every 80s (Math.PI / 40)
    if (pulseRef.current) {
      pulseRef.current.rotation.y = time * (Math.PI / 40);
    }

    // Gold nodes softly pulse: opacity shifts by 10% (0.80 to 0.90)
    if (nodeRef.current) {
      nodeRef.current.opacity = 0.85 + Math.sin(time * 2.0) * 0.05;
    }
  });

  // Render Premium Luxury Central Graphite Globe inside Gold Geodesic Cage for all themes
  return (
    <group>
      {/* 1. Outer Geodesic Cage (Gold Wireframe Lattice) */}
      <group ref={outerCageRef}>
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial
            wireframe
            color="#C8A15A" // Metallic Gold
            roughness={0.2}
            metalness={1.0}
            transparent
            opacity={0.35}
            blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[outerVertices, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={nodeRef}
            size={0.06}
            color="#FFD98A" // Node color FFD98A
            transparent
            opacity={0.85}
            sizeAttenuation
            blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          />
        </points>
      </group>

      {/* 2. Rotating Globe & World Map Group (rotates very slowly) */}
      <group ref={pulseRef}>
        {/* Graphite Globe (Solid Shaded Sphere) */}
        <mesh>
          <sphereGeometry args={[0.80, 32, 32]} />
          <meshStandardMaterial
            color="#232323" // Graphite globe color
            roughness={0.45}
            metalness={0.15}
          />
        </mesh>
        {/* World Map Points Overlay */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[earthPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[earthColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            vertexColors
            transparent
            opacity={0.9}
            sizeAttenuation={true}
            depthWrite={false}
            blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          />
        </points>
      </group>
    </group>
  );
}

// Subtle flowing golden signal pulses moving back and forth between the globe and the user nodes
function DataPackets({ userPositions, prefersReduced }) {
  const pointsRef = useRef();
  const packetsCount = userPositions.length * 2;

  const positions = useMemo(() => {
    return new Float32Array(packetsCount * 3);
  }, [packetsCount]);

  useFrame((state) => {
    if (prefersReduced) return;
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const posArr = posAttr.array;

      userPositions.forEach((pos, idx) => {
        // Packet 1: moving from globe to user node
        const t1 = (time * 0.45 + idx * 0.2) % 1.0;
        const p1 = new THREE.Vector3().lerpVectors(
          pos.clone().multiplyScalar(0.43), // globe surface boundary
          pos,
          t1
        );
        posArr[idx * 6] = p1.x;
        posArr[idx * 6 + 1] = p1.y;
        posArr[idx * 6 + 2] = p1.z;

        // Packet 2: moving from user node to globe surface
        const t2 = (time * 0.4 + idx * 0.2 + 0.5) % 1.0;
        const p2 = new THREE.Vector3().lerpVectors(
          pos,
          pos.clone().multiplyScalar(0.43),
          t2
        );
        posArr[idx * 6 + 3] = p2.x;
        posArr[idx * 6 + 4] = p2.y;
        posArr[idx * 6 + 5] = p2.z;
      });

      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#FFD98A"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Global Network of connected User Icons orbiting the Globe
function ConnectedUsers({ theme, prefersReduced }) {
  const groupRef = useRef();
  const userCount = 5;

  const isDark = theme === "dark";

  const userPositions = useMemo(() => {
    const pos = [];
    const R = 1.85; // Orbit Radius
    for (let i = 0; i < userCount; i++) {
      const angle = (i / userCount) * Math.PI * 2;
      const x = Math.cos(angle) * R;
      const z = Math.sin(angle) * R;
      const y = Math.sin(angle * 2) * 0.2; // slight wave pattern height
      pos.push(new THREE.Vector3(x, y, z));
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (prefersReduced) return;
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Orbit rotates slowly: 360 degrees every 65 seconds (Math.PI / 32.5)
      groupRef.current.rotation.y = time * (Math.PI / 32.5);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Faint, elegant outer containment ring matching user orbit boundary */}
      <mesh rotation={[Math.PI / 12, 0, 0]}>
        <torusGeometry args={[1.85, 0.003, 6, 80]} />
        <meshStandardMaterial
          color="#C8A15A"
          transparent
          opacity={isDark ? 0.15 : 0.25}
          depthWrite={false}
        />
      </mesh>

      {/* Pulsing connection data packets */}
      {!prefersReduced && <DataPackets userPositions={userPositions} prefersReduced={prefersReduced} />}

      {userPositions.map((pos, idx) => (
        <group key={idx}>
          {/* Thin connection line between the user icon and globe core */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  pos.x * 0.43, pos.y * 0.43, pos.z * 0.43, // start at globe surface
                  pos.x, pos.y, pos.z
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#C8A15A" transparent opacity={0.35} />
          </line>

          {/* Golden wireframe User Outline Icon */}
          <group position={[pos.x, pos.y, pos.z]}>
            {/* Head circle */}
            <mesh position={[0, 0.07, 0]}>
              <torusGeometry args={[0.045, 0.003, 6, 24]} />
              <meshStandardMaterial color="#FFD98A" emissive="#FFD98A" emissiveIntensity={0.8} />
            </mesh>
            {/* Shoulder arch */}
            <mesh position={[0, -0.05, 0]} rotation={[Math.PI, 0, 0]}>
              <torusGeometry args={[0.08, 0.003, 6, 24, Math.PI]} />
              <meshStandardMaterial color="#FFD98A" emissive="#FFD98A" emissiveIntensity={0.8} />
            </mesh>
            {/* Small node dot */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial color="#FFD98A" emissive="#FFD98A" emissiveIntensity={1.5} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

// Circular Projector Base and concentric platform rings
function ProjectorBase({ theme, prefersReduced }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  const isDark = theme === "dark";
  const palette = themeColors[theme] || themeColors.dark;

  useFrame((state) => {
    if (prefersReduced) return;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = -time * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.3, 0]}>
      {/* Emitter platform */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 32]} />
        <meshStandardMaterial
          color={palette.projector || palette.outline}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Concentric Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.008, 8, 80]} />
        <meshStandardMaterial
          color={palette.ringColor || palette.outline}
          emissive={palette.ringColor || palette.outline}
          emissiveIntensity={isDark ? 1.0 : 0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer Concentric Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.006, 8, 100]} />
        <meshStandardMaterial
          color={palette.ringColor || palette.outline}
          emissive={palette.ringColor || palette.outline}
          emissiveIntensity={isDark ? 0.8 : 0.05}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

// Rising holographic light particles
function ProjectorParticles({ theme, prefersReduced }) {
  const pointsRef = useRef();
  const count = 65;

  const isDark = theme === "dark";
  const palette = themeColors[theme] || themeColors.dark;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.85;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = -1.3 + Math.random() * 2.0;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      sp[i] = 0.006 + Math.random() * 0.008;
    }
    return [pos, sp];
  }, []);

  useFrame((state) => {
    if (prefersReduced) return;
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const posArr = posAttr.array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] += speeds[i];
        if (posArr[i * 3 + 1] > 0.8) {
          posArr[i * 3 + 1] = -1.3; // loop at base
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={palette.particles}
        transparent
        opacity={isDark ? 0.75 : 0.45}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

// Orbit Rings (exactly 3 warm gold elliptical rings)
function ProjectorOrbits({ theme, prefersReduced }) {
  const isDark = theme === "dark";

  if (!isDark) return null;

  return (
    <group>
      <OrbitalRing
        radius={2.0}
        tubeRadius={0.006}
        color="#E3C177"
        speed={Math.PI / 27.5}
        rotation={[Math.PI / 4.0, Math.PI / 8.0, 0]}
        particleCount={80}
        clockwise={true}
        prefersReduced={prefersReduced}
        isDark={isDark}
      />
      <OrbitalRing
        radius={2.3}
        tubeRadius={0.006}
        color="#E3C177"
        speed={-Math.PI / 37.5}
        rotation={[Math.PI / 2.2, -Math.PI / 6.0, 0]}
        particleCount={80}
        clockwise={false}
        prefersReduced={prefersReduced}
        isDark={isDark}
      />
      <OrbitalRing
        radius={2.6}
        tubeRadius={0.006}
        color="#E3C177"
        speed={Math.PI / 47.5}
        rotation={[-Math.PI / 3.2, Math.PI / 4.5, 0]}
        particleCount={80}
        clockwise={true}
        prefersReduced={prefersReduced}
        isDark={isDark}
      />
    </group>
  );
}

// High-fidelity geographical continent boundary checker
function isEarthLand(lat, lon) {
  // 1. Antarctica
  if (lat < -60) return true;

  // 2. Greenland
  if (lat >= 60 && lat <= 83 && lon >= -75 && lon <= -15) return true;

  // 3. North America
  if (lat >= 15 && lat < 75 && lon >= -168 && lon <= -50) {
    if (lat < 30 && lon > -90) return false;
    return true;
  }
  if (lat >= 7 && lat < 15 && lon >= -90 && lon <= -77) return true;

  // 4. South America
  if (lat >= -56 && lat < 13 && lon >= -82 && lon <= -34) {
    if (lat < -20 && lon > -50 - (lat + 20) * 0.5) return false;
    if (lat < -20 && lon < -75 + (lat + 20) * 0.1) return false;
    return true;
  }

  // 5. Africa
  if (lat >= -35 && lat < 38 && lon >= -18 && lon <= 52) {
    if (lat < 12 && lat > -5 && lon > 42 + (lat + 5) * 1.5) return false;
    if (lat > 15 && lon > 32 + (lat - 15) * 0.6 && lon < 43) return false;
    if (lat >= -26 && lat <= -12 && lon >= 43 && lon <= 51) return true;
    if (lat > 5) return lon >= -18 && lon <= 40;
    return lon >= 10 && lon <= 40;
  }

  // 6. Europe & Asia (Eurasia)
  if (lat >= 1 && lat <= 78 && lon >= -10 && lon <= 180) {
    if (lon < 40) {
      if (lat < 36) return false;
      if (lat > 55 && lon < 5) return false;
      return true;
    }
    if (lat >= 12 && lat < 35 && lon >= 35 && lon <= 60) {
      if (lat < 30 && lon > 50 + (lat - 12) * 0.8) return false;
      return true;
    }
    if (lat >= 8 && lat < 30 && lon >= 68 && lon <= 90) {
      if (lat < 22 && lon < 68 + (22 - lat) * 0.7) return false;
      if (lat < 22 && lon > 90 - (22 - lat) * 0.7) return false;
      return true;
    }
    if (lat >= 1 && lat < 22 && lon >= 95 && lon <= 110) return true;
    if (lat >= -10 && lat < 8 && lon >= 95 && lon <= 141) return true;
    if (lat >= 30 && lat <= 46 && lon >= 130 && lon <= 146) return true;
    if (lat >= 20) return true;
  }

  // 7. Australia & New Zealand
  if (lat >= -39 && lat <= -10 && lon >= 113 && lon <= 154) return true;
  if (lat >= -47 && lat <= -34 && lon >= 165 && lon <= 179) return true;

  // 8. United Kingdom
  if (lat >= 50 && lat <= 60 && lon >= -10 && lon <= 2) return true;

  return false;
}

// Earth Continent Point-Cloud generator (3500 points for dense map layouts)
const EARTH_POINTS_COUNT = 3500;
const [earthPositions, earthColors] = (() => {
  const pos = new Float32Array(EARTH_POINTS_COUNT * 3);
  const col = new Float32Array(EARTH_POINTS_COUNT * 3);

  for (let i = 0; i < EARTH_POINTS_COUNT; i++) {
    const offset = 2 / EARTH_POINTS_COUNT;
    const increment = Math.PI * (3 - Math.sqrt(5));

    const y = ((i * offset) - 1) + (offset / 2);
    const radius = Math.sqrt(1 - y * y);
    const phi = i * increment;

    const x = Math.cos(phi) * radius;
    const z = Math.sin(phi) * radius;

    const R = 0.812;
    pos[i * 3] = x * R;
    pos[i * 3 + 1] = y * R;
    pos[i * 3 + 2] = z * R;

    const lat = Math.asin(y) * (180 / Math.PI);
    const lon = Math.atan2(z, x) * (180 / Math.PI);

    const isLand = isEarthLand(lat, lon);
    if (isLand) {
      col[i * 3] = 0.88;
      col[i * 3 + 1] = 0.76;
      col[i * 3 + 2] = 0.48;
    } else {
      col[i * 3] = 0.20;
      col[i * 3 + 1] = 0.17;
      col[i * 3 + 2] = 0.10;
    }
  }
  return [pos, col];
})();

// Background slow drift particles (floating gold dust)
const DUST_COUNT = 180;
const [dustPositions, dustColors] = (() => {
  const pos = new Float32Array(DUST_COUNT * 3);
  const col = new Float32Array(DUST_COUNT * 3);
  for (let i = 0; i < DUST_COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 8.5;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8.5;

    const isBright = Math.random() < 0.3;
    if (isBright) {
      col[i * 3] = 0.88;
      col[i * 3 + 1] = 0.76;
      col[i * 3 + 2] = 0.48;
    } else {
      col[i * 3] = 0.78;
      col[i * 3 + 1] = 0.63;
      col[i * 3 + 2] = 0.35;
    }
  }
  return [pos, col];
})();

function FloatingGoldDust({ theme, prefersReduced }) {
  const pointsRef = useRef();

  useFrame((state) => {
    if (prefersReduced) return;
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const posArr = posAttr.array;
      for (let i = 0; i < DUST_COUNT; i++) {
        posArr[i * 3 + 1] += 0.002;
        if (posArr[i * 3 + 1] > 3.25) {
          posArr[i * 3 + 1] = -3.25;
        }
        posArr[i * 3] += Math.sin(time * 0.5 + i) * 0.001;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Scene Content Wrapper to leverage R3F hooks
function SceneContent({ theme }) {
  const groupRef = useRef();
  const prefersReduced = useReducedMotion();

  useFrame((state) => {
    if (prefersReduced) return;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gently floating up and down by exactly 8px (0.08 units in R3F space) with 8 seconds loop period (Math.PI / 4.0)
      groupRef.current.position.y = Math.sin(time * (Math.PI / 4.0)) * 0.08;

      const pointer = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, -0.26 + pointer.x * 0.15, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.26 + pointer.y * -0.1, 0.05);
    }
  });

  const isDark = theme === "dark";

  return (
    <group ref={groupRef} rotation={[0.26, -0.26, 0]} position={[0, 0, 0]}>
      {/* 1. Projector base platform and concentric circles */}
      <ProjectorBase theme={theme} prefersReduced={prefersReduced} />

      {/* 2. Rising projector particles */}
      <ProjectorParticles theme={theme} prefersReduced={prefersReduced} />

      {/* 3. Global Network Globe centerpiece */}
      <NetworkCore theme={theme} prefersReduced={prefersReduced} />

      {/* 4. Orbiting connected user icons */}
      <ConnectedUsers theme={theme} prefersReduced={prefersReduced} />

      {/* 5. Concentric Independent Orbit Rings (Removed for cleaner global network look) */}
      {/* <ProjectorOrbits theme={theme} prefersReduced={prefersReduced} /> */}

      {/* 6. Gold Ambient Twinkling Dust */}
      {isDark && <FloatingGoldDust theme={theme} prefersReduced={prefersReduced} />}
    </group>
  );
}

export default function HeroScene() {
  const prefersReduced = useReducedMotion();
  const { theme } = useApp();
  const palette = themeColors[theme] || themeColors.light;

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ fov: 45, position: [0, 0, 6.2] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        shadows={false}
        className="w-full h-full"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={theme === "dark" ? 0.7 : 0.95} color="white" />
          
          <pointLight position={[3, 3, 3]} color={palette.light1} intensity={theme === "dark" ? 12 : 16} distance={15} />
          <pointLight position={[-3, -3, 3]} color={palette.light2} intensity={theme === "dark" ? 8 : 12} distance={12} />
          <pointLight position={[0, 0, -4]} color={palette.light3} intensity={theme === "dark" ? 5 : 8} distance={10} />

          <SceneContent theme={theme} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!prefersReduced}
            autoRotateSpeed={1.0}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
