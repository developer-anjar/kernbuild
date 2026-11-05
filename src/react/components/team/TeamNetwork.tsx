import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import type { TeamMember } from '../../types/team';
import './TeamNetwork.css';

interface TeamNetworkProps {
  members: TeamMember[];
  selectedMemberId: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  scale: number;
}

const NETWORK_WIDTH = 620;
const NETWORK_HEIGHT = 560;
const CAMERA_DISTANCE = 760;
const POINTER_YAW_RANGE = 0.42;
const TEAM_POSITIONS: Point3D[] = [
  { x: -28, y: -170, z: 96 },
  { x: 166, y: -12, z: -82 },
  { x: 22, y: 166, z: 78 },
  { x: -166, y: 18, z: -74 },
];

const PARTICLES: Point3D[] = [
  { x: -98, y: -204, z: -80 },
  { x: 112, y: -191, z: 34 },
  { x: 250, y: -92, z: 72 },
  { x: 243, y: 98, z: -62 },
  { x: 100, y: 208, z: 96 },
  { x: -104, y: 201, z: -36 },
  { x: -250, y: 100, z: 48 },
  { x: -244, y: -98, z: -92 },
  { x: 0, y: 0, z: 124 },
  { x: -74, y: -90, z: 12 },
  { x: 86, y: 88, z: -28 },
  { x: -82, y: 92, z: 66 },
];

const EDGES = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 3 },
];

function project(point: Point3D, yaw: number, pitch: number, scale: number): ProjectedPoint {
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);
  const rotatedX = point.x * cosYaw + point.z * sinYaw;
  const rotatedZ = -point.x * sinYaw + point.z * cosYaw;
  const rotatedY = point.y * cosPitch - rotatedZ * sinPitch;
  const depth = point.y * sinPitch + rotatedZ * cosPitch;
  const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - depth);

  return {
    x: (NETWORK_WIDTH / 2 + rotatedX * perspective) * scale,
    y: (NETWORK_HEIGHT / 2 + rotatedY * perspective) * scale,
    z: depth,
    scale: perspective * scale,
  };
}

function getInitials(name: string) {
  return name.split(/\s+/).map(part => part[0]).join('').slice(0, 2);
}

export function TeamNetwork({ members, selectedMemberId, onSelect, reducedMotion }: TeamNetworkProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef(new Map<number, HTMLButtonElement>());
  const selectedMemberIdRef = useRef(selectedMemberId);
  const reducedMotionRef = useRef(reducedMotion);
  const [unavailableProfiles, setUnavailableProfiles] = useState<Set<string>>(() => new Set());

  selectedMemberIdRef.current = selectedMemberId;
  reducedMotionRef.current = reducedMotion;

  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, memberId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(memberId);
    }
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || (event.target as Element).closest('.team-network__node-overlay')) return;
    event.preventDefault();
    const root = rootRef.current;
    if (!root) return;
    root.dataset.dragging = 'true';
    root.style.touchAction = 'none';
    root.setPointerCapture(event.pointerId);
  };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!root || !canvas || !context) return;

    let frameId = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastTime = 0;
    let yaw = 0;
    let pitch = -0.08;
    let automaticYawOffset = 0;
    let mouseX = 0;
    let mouseY = 0;
    let dragYaw = 0;
    let dragPitch = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    let pointerOnNode = false;
    const previousNodePositions: Array<{ x: number; y: number; z: number } | undefined> = [];

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      mouseX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      mouseY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (root.hasPointerCapture(event.pointerId)) {
        event.preventDefault();
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        dragYaw += dx * 0.006;
        dragPitch = Math.max(-0.75, Math.min(0.75, dragPitch + dy * 0.004));
        dragStartX = event.clientX;
        dragStartY = event.clientY;
      } else if ((event.target as Element).closest('.team-network__node-overlay')) {
        if (!pointerOnNode) {
          pointerOnNode = true;
          mouseX = (yaw - automaticYawOffset - (reducedMotionRef.current ? 0 : lastTime * 0.000009))
            / POINTER_YAW_RANGE;
          mouseY = (pitch + 0.08) / 0.2;
        }
      } else {
        pointerOnNode = false;
        updatePointer(event);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || (event.target as Element).closest('.team-network__node-overlay')) return;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragYaw = yaw;
      dragPitch = pitch;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (root.dataset.dragging !== 'true') return;
      if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
      automaticYawOffset = yaw - (reducedMotionRef.current ? 0 : lastTime * 0.000009);
      root.dataset.dragging = 'false';
      root.style.touchAction = 'pan-y';
      mouseX = 0;
      mouseY = 0;
      pointerOnNode = false;
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (!root.hasPointerCapture(event.pointerId)) {
        mouseX = 0;
        mouseY = 0;
        pointerOnNode = false;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (root.dataset.dragging === 'true') event.preventDefault();
    };

    const onLostPointerCapture = () => {
      if (root.dataset.dragging !== 'true') return;
      automaticYawOffset = yaw - (reducedMotionRef.current ? 0 : lastTime * 0.000009);
      root.dataset.dragging = 'false';
      root.style.touchAction = 'pan-y';
      mouseX = 0;
      mouseY = 0;
      pointerOnNode = false;
    };

    const renderFrame = (time: number) => {
      lastTime = time;
      const bounds = root.getBoundingClientRect();
      const nextWidth = bounds.width;
      const nextHeight = bounds.height;
      if (nextWidth !== width || nextHeight !== height) resize();

      const unitScale = Math.min(width / NETWORK_WIDTH, height / NETWORK_HEIGHT);
      const isDragging = root.dataset.dragging === 'true';
      const automaticYaw = reducedMotionRef.current ? 0 : time * 0.000009;
      const targetYaw = isDragging ? dragYaw : automaticYawOffset + automaticYaw + mouseX * POINTER_YAW_RANGE;
      const targetPitch = isDragging ? dragPitch : -0.08 + mouseY * 0.2;
      const easing = isDragging ? 0.24 : 0.075;
      yaw += (targetYaw - yaw) * easing;
      pitch += (targetPitch - pitch) * easing;

      const projectedMembers = TEAM_POSITIONS.map(point => project(point, yaw, pitch, unitScale));
      const projectedParticles = PARTICLES.map(point => project(point, yaw, pitch, unitScale));
      const selectedIndex = members.findIndex(member => member.id === selectedMemberIdRef.current);
      const originX = (width - NETWORK_WIDTH * unitScale) / 2;
      const originY = (height - NETWORK_HEIGHT * unitScale) / 2;

      nodeRefs.current.forEach((node, index) => {
        const point = projectedMembers[index];
        if (!point) return;
        const x = originX + point.x;
        const y = originY + point.y;
        const previous = previousNodePositions[index];
        if (!previous || Math.abs(x - previous.x) >= 0.35 || Math.abs(y - previous.y) >= 0.35) {
          node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          previousNodePositions[index] = { x, y, z: point.z };
        }
        if (!previous || Math.abs(point.z - previous.z) >= 1) {
          node.style.zIndex = `${Math.round(point.z + 1000)}`;
          const renderedPosition = previousNodePositions[index];
          previousNodePositions[index] = {
            x: renderedPosition?.x ?? x,
            y: renderedPosition?.y ?? y,
            z: point.z,
          };
        }
      });

      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(originX, originY);

      context.save();
      context.translate(NETWORK_WIDTH * unitScale / 2, NETWORK_HEIGHT * unitScale / 2);
      context.scale(unitScale, unitScale);
      context.rotate(yaw * 0.38);
      context.beginPath();
      context.ellipse(0, 0, 234, 112, 0, 0, Math.PI * 2);
      context.setLineDash([3, 8]);
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(104, 31, 234, .12)';
      context.stroke();
      context.restore();

      EDGES.forEach((edge, index) => {
        const start = projectedMembers[edge.from];
        const end = projectedMembers[edge.to];
        const fromMember = members[edge.from];
        const toMember = members[edge.to];
        if (!start || !end || !fromMember || !toMember) return;

        const isActive = selectedIndex === edge.from || selectedIndex === edge.to;
        const gradient = context.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, isActive ? fromMember.accentColor : 'rgba(104, 31, 234, .24)');
        gradient.addColorStop(1, isActive ? toMember.accentColor : 'rgba(255, 90, 31, .2)');
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = gradient;
        context.lineWidth = isActive ? 2 : 1.25;
        context.globalAlpha = isActive ? 0.88 : 0.46;
        context.setLineDash([5, 7]);
        context.lineDashOffset = reducedMotionRef.current ? 0 : -time * 0.012;
        context.stroke();
        context.setLineDash([]);

        if (!reducedMotionRef.current) {
          const progress = (time * 0.00016 + index * 0.19) % 1;
          const x = start.x + (end.x - start.x) * progress;
          const y = start.y + (end.y - start.y) * progress;
          context.beginPath();
          context.arc(x, y, isActive ? 3 : 2.2, 0, Math.PI * 2);
          context.fillStyle = isActive ? '#FF5A1F' : '#8B35E8';
          context.shadowColor = context.fillStyle;
          context.shadowBlur = isActive ? 11 : 7;
          context.globalAlpha = 0.95;
          context.fill();
          context.shadowBlur = 0;
        }
      });

      projectedParticles.forEach((point, index) => {
        context.beginPath();
        context.arc(point.x, point.y, (index % 3 === 0 ? 2 : 1.4) * point.scale, 0, Math.PI * 2);
        context.fillStyle = index % 2 === 0 ? '#8B35E8' : '#FF8A00';
        context.globalAlpha = reducedMotionRef.current
          ? 0.4
          : 0.26 + (Math.sin(time * 0.0015 + index) + 1) * 0.18;
        context.fill();
      });

      context.restore();
      context.globalAlpha = 1;
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);
    root.addEventListener('pointerleave', onPointerLeave);
    root.addEventListener('lostpointercapture', onLostPointerCapture);
    root.addEventListener('touchmove', onTouchMove, { passive: false });
    resize();
    frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerUp);
      root.removeEventListener('pointerleave', onPointerLeave);
      root.removeEventListener('lostpointercapture', onLostPointerCapture);
      root.removeEventListener('touchmove', onTouchMove);
      root.style.touchAction = '';
      delete root.dataset.dragging;
    };
  }, [members]);

  return (
    <div
      ref={rootRef}
      className="team-network"
      data-dragging="false"
      aria-label="Interactive founding team network. Move or drag to rotate."
      onPointerDown={startDrag}
    >
      <canvas ref={canvasRef} className="team-network__canvas" aria-hidden="true" />
      {members.slice(0, TEAM_POSITIONS.length).map(member => {
        const hasImage = member.profileImage !== '/images/team/placeholder-avatar.svg'
          && !unavailableProfiles.has(member.id);
        const selected = member.id === selectedMemberId;

        return (
          <button
            key={member.id}
            ref={node => {
              if (node) nodeRefs.current.set(members.indexOf(member), node);
              else nodeRefs.current.delete(members.indexOf(member));
            }}
            className={selected ? 'team-network__node-overlay is-active' : 'team-network__node-overlay'}
            style={{ '--team-accent': member.accentColor } as CSSProperties}
            type="button"
            aria-label={`View ${member.name}, ${member.designation}`}
            aria-pressed={selected}
            onClick={() => onSelect(member.id)}
            onKeyDown={event => selectWithKeyboard(event, member.id)}
          >
            <span className="team-network__portrait">
              {hasImage ? (
                <img
                  src={member.profileImage}
                  alt=""
                  draggable={false}
                  onError={() => setUnavailableProfiles(previous => new Set(previous).add(member.id))}
                />
              ) : (
                <span aria-hidden="true">{getInitials(member.name)}</span>
              )}
            </span>
            <span className="team-network__name">{member.name}</span>
            <span className="team-network__designation">{member.designation}</span>
          </button>
        );
      })}
      <p className="team-network__hint"><span aria-hidden="true">✦</span> Move or drag to rotate. Select a founder to explore their role</p>
    </div>
  );
}
