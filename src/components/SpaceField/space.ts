// Pure simulation for the background sky. No DOM here, so it can be tested.

export type Rng = () => number;

export type Star = {
  x: number;
  y: number;
  /** Depth 0 (far) … 1 (near). Nearer stars are bigger, brighter, move more. */
  z: number;
  r: number;
  twinkleSpeed: number;
  phase: number;
  /** Index into STAR_TINTS: real stars range from blue-white to orange. */
  tint: number;
};

/**
 * Star colors by spectral class, weighted roughly as the eye sees them:
 * mostly white and blue-white, some pale yellow, a few orange.
 */
export const STAR_TINTS = ["255,255,255", "205,222,255", "255,244,224", "255,214,170"] as const;
const TINT_WEIGHTS = [0.42, 0.3, 0.18, 0.1];

function pickTint(r: number): number {
  let acc = 0;
  for (let i = 0; i < TINT_WEIGHTS.length; i++) {
    acc += TINT_WEIGHTS[i];
    if (r < acc) return i;
  }
  return 0;
}

export type Dust = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Seconds lived / total lifetime. */
  age: number;
  life: number;
  size: number;
  hue: 0 | 1 | 2;
};

export type Streak = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  length: number;
};

export type Satellite = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * The photographed Milky Way already supplies the dense background, so the
 * live layer only needs a sparse set of nearer stars: about one per 7,000 px².
 */
export function starCount(width: number, height: number): number {
  return Math.min(320, Math.round((width * height) / 7000));
}

export function createStars(width: number, height: number, rng: Rng = Math.random): Star[] {
  return Array.from({ length: starCount(width, height) }, () => {
    // Most stars are far away; only a few are near and bright.
    const z = rng() ** 2.2;
    return {
      x: rng() * width,
      y: rng() * height,
      z,
      r: 0.3 + z * 1.1,
      // Scintillation is subtle and slow for most stars.
      twinkleSpeed: 0.3 + rng() * 1.1,
      phase: rng() * Math.PI * 2,
      tint: pickTint(rng()),
    };
  });
}

/** Wraps a coordinate into [0, size), so drifting stars re-enter on the other side. */
export function wrap(value: number, size: number): number {
  return ((value % size) + size) % size;
}

/** How many dust motes to emit for a pointer move of `distance` px. */
export function dustToEmit(distance: number, coarsePointer: boolean): number {
  const perPixel = coarsePointer ? 1 / 14 : 1 / 6;
  return Math.min(coarsePointer ? 4 : 10, Math.floor(distance * perPixel));
}

export function createDust(
  x: number,
  y: number,
  pointerVx: number,
  pointerVy: number,
  rng: Rng = Math.random,
): Dust {
  const angle = rng() * Math.PI * 2;
  const speed = 8 + rng() * 34;
  return {
    x: x + (rng() - 0.5) * 6,
    y: y + (rng() - 0.5) * 6,
    // Inherit a little of the pointer's velocity so the trail flows with the hand.
    vx: Math.cos(angle) * speed + pointerVx * 0.06,
    vy: Math.sin(angle) * speed + pointerVy * 0.06,
    age: 0,
    life: 0.7 + rng() * 1.1,
    size: 0.6 + rng() * 1.6,
    hue: rng() < 0.62 ? 0 : rng() < 0.75 ? 1 : 2,
  };
}

/**
 * Advances one mote by `dt` seconds. Motes slow down, drift upward a touch,
 * and are gently pulled toward the pointer so the dust follows it.
 * Returns false once the mote has faded out.
 */
export function stepDust(d: Dust, dt: number, pointerX: number | null, pointerY: number | null): boolean {
  d.age += dt;
  if (d.age >= d.life) return false;

  if (pointerX !== null && pointerY !== null) {
    d.vx += (pointerX - d.x) * 0.9 * dt;
    d.vy += (pointerY - d.y) * 0.9 * dt;
  }
  const drag = Math.exp(-2.4 * dt);
  d.vx *= drag;
  d.vy = d.vy * drag - 6 * dt;
  d.x += d.vx * dt;
  d.y += d.vy * dt;
  return true;
}

/** 0 → 1 → 0 over a mote's life: quick fade in, long fade out. */
export function dustAlpha(d: Dust): number {
  const t = d.age / d.life;
  return t < 0.12 ? t / 0.12 : 1 - (t - 0.12) / 0.88;
}

export function createStreak(width: number, height: number, rng: Rng = Math.random): Streak {
  const fromLeft = rng() < 0.5;
  const angle = (fromLeft ? 0.18 : Math.PI - 0.18) + (rng() - 0.5) * 0.3;
  const speed = 900 + rng() * 700;
  return {
    x: fromLeft ? rng() * width * 0.6 : width * (0.4 + rng() * 0.6),
    y: rng() * height * 0.45,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    age: 0,
    life: 0.6 + rng() * 0.5,
    length: 90 + rng() * 140,
  };
}

export function createSatellite(width: number, height: number, rng: Rng = Math.random): Satellite {
  const leftToRight = rng() < 0.5;
  // Crosses the screen in roughly 25–40 seconds, on a slight diagonal.
  const speed = width / (25 + rng() * 15);
  return {
    x: leftToRight ? -10 : width + 10,
    y: height * (0.1 + rng() * 0.6),
    vx: leftToRight ? speed : -speed,
    vy: (rng() - 0.5) * speed * 0.35,
  };
}
