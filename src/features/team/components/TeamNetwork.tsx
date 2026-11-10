import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import type { TeamMember } from '../types/team';
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
const NETWORK_HEIGHT = 620;
const CAMERA_DISTANCE = 760;

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

function createTeamPositions(count: number): Point3D[] {
  if (count === 1) return [{ x: 0, y: 0, z: 0 }];

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, index) => {
    const vertical = 1 - 2 * (index + 0.5) / count;
    const radius = Math.sqrt(1 - vertical * vertical);
    const angle = index * goldenAngle;

    return {
      x: Math.cos(angle) * radius * 208,
      y: vertical * 176,
      z: Math.sin(angle) * radius * 120,
    };
  });
}

function createNetworkEdges(count: number) {
  if (count < 2) return [];

  const edges = new Map<string, { from: number; to: number }>();
  const addEdge = (from: number, to: number) => {
    if (from === to) return;
    const start = Math.min(from, to);
    const end = Math.max(from, to);
    edges.set(`${start}:${end}`, { from: start, to: end });
  };

  for (let index = 0; index < count; index += 1) {
    addEdge(index, (index + 1) % count);
    if (count > 3) addEdge(index, (index + Math.floor(count / 2)) % count);
  }

  return [...edges.values()];
}

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
    let previousFrameTime = 0;
    let yaw = 0;
    let pitch = -0.08;
    let targetYaw = yaw;
    let targetPitch = pitch;
    let previousSelectedIndex = -1;
    let dragYaw = 0;
    let dragPitch = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    const previousNodePositions: Array<{ x: number; y: number; z: number } | undefined> = [];
    const teamPositions = createTeamPositions(members.length);
    const edges = createNetworkEdges(members.length);

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

    const onPointerMove = (event: PointerEvent) => {
      if (root.hasPointerCapture(event.pointerId)) {
        event.preventDefault();
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        dragYaw += dx * 0.006;
        dragPitch = Math.max(-0.75, Math.min(0.75, dragPitch + dy * 0.004));
        dragStartX = event.clientX;
        dragStartY = event.clientY;
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
      yaw = dragYaw;
      pitch = dragPitch;
      root.dataset.dragging = 'false';
      root.style.touchAction = 'pan-y';
    };

    const onTouchMove = (event: TouchEvent) => {
      if (root.dataset.dragging === 'true') event.preventDefault();
    };

    const onLostPointerCapture = () => {
      if (root.dataset.dragging !== 'true') return;
      yaw = dragYaw;
      pitch = dragPitch;
      root.dataset.dragging = 'false';
      root.style.touchAction = 'pan-y';
    };

    const renderFrame = (time: number) => {
      const frameDelta = previousFrameTime ? Math.min(time - previousFrameTime, 50) : 16.67;
      previousFrameTime = time;
      const bounds = root.getBoundingClientRect();
      const nextWidth = bounds.width;
      const nextHeight = bounds.height;
      if (nextWidth !== width || nextHeight !== height) resize();

      const unitScale = Math.min(width / NETWORK_WIDTH, height / NETWORK_HEIGHT);
      const isDragging = root.dataset.dragging === 'true';
      const selectedIndex = members.findIndex(member => member.id === selectedMemberIdRef.current);
      if (selectedIndex !== previousSelectedIndex) {
        previousSelectedIndex = selectedIndex;
        const selectedPosition = teamPositions[selectedIndex];
        if (selectedPosition) {
          const frontFacingYaw = Math.atan2(-selectedPosition.x, selectedPosition.z);
          const yawDifference = Math.atan2(Math.sin(frontFacingYaw - yaw), Math.cos(frontFacingYaw - yaw));
          targetYaw = yaw + yawDifference;
          targetPitch = Math.atan2(selectedPosition.y, Math.hypot(selectedPosition.x, selectedPosition.z));
        }
      }
      const desiredYaw = isDragging ? dragYaw : targetYaw;
      const desiredPitch = isDragging ? dragPitch : targetPitch;
      const easing = 1 - Math.exp(-frameDelta / (isDragging ? 55 : 180));
      const yawDifference = Math.atan2(Math.sin(desiredYaw - yaw), Math.cos(desiredYaw - yaw));
      yaw += yawDifference * easing;
      pitch += (desiredPitch - pitch) * easing;
      if (!isDragging && Math.abs(yawDifference) < 0.0001 && Math.abs(desiredPitch - pitch) < 0.0001) {
        yaw = desiredYaw;
        pitch = desiredPitch;
      }

      const projectedMembers = teamPositions.map(point => project(point, yaw, pitch, unitScale));
      const projectedParticles = PARTICLES.map(point => project(point, yaw, pitch, unitScale));
      const sortedMembers = projectedMembers
        .map((point, index) => ({ point, index }))
        .sort((left, right) => left.point.z - right.point.z);
      const originX = (width - NETWORK_WIDTH * unitScale) / 2;
      const originY = (height - NETWORK_HEIGHT * unitScale) / 2;

      sortedMembers.forEach(({ point, index }) => {
        const node = nodeRefs.current.get(index);
        if (node) node.style.zIndex = `${Math.round(point.z + 1000)}`;
      });

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
      context.translate(NETWORK_WIDTH * unitScale / 2, (NETWORK_HEIGHT - 35) * unitScale);
      context.scale(unitScale, unitScale);
      context.beginPath();
      context.ellipse(0, 0, 215, 34, 0, 0, Math.PI * 2);
      context.setLineDash([4, 5]);
      context.lineWidth = 1.8;
      context.strokeStyle = 'rgba(28, 145, 164, .6)';
      context.stroke();
      if (!reducedMotionRef.current) {
        const scanAngle = time * 0.00045;
        context.beginPath();
        context.ellipse(0, 0, 215, 34, 0, scanAngle, scanAngle + 1.05);
        context.setLineDash([]);
        context.lineWidth = 3;
        context.strokeStyle = 'rgba(28, 145, 164, .95)';
        context.shadowColor = 'rgba(28, 145, 164, .72)';
        context.shadowBlur = 16;
        context.stroke();
        context.shadowBlur = 0;
      }
      context.restore();

      edges.forEach((edge, index) => {
        const start = projectedMembers[edge.from];
        const end = projectedMembers[edge.to];
        const fromMember = members[edge.from];
        const toMember = members[edge.to];
        if (!start || !end || !fromMember || !toMember) return;

        const isActive = selectedIndex === edge.from || selectedIndex === edge.to;
        const gradient = context.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, isActive ? fromMember.accentColor : 'rgba(35, 145, 164, .72)');
        gradient.addColorStop(1, isActive ? toMember.accentColor : 'rgba(104, 31, 234, .58)');
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = gradient;
        context.lineWidth = isActive ? 2 : 1.8;
        context.globalAlpha = isActive ? 0.88 : 0.82;
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
          context.fillStyle = isActive ? fromMember.accentColor : '#38B8CA';
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
        context.fillStyle = index % 2 === 0 ? '#38B8CA' : '#8B35E8';
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
      {members.map(member => {
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
      <p className="team-network__hint">Select a founder to explore their role</p>
    </div>
  );
}
