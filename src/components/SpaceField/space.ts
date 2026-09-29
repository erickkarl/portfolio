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
};

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
  /** Sparkle: each mote shimmers at its own rate. */
  sparkleSpeed: number;
  phase: number;
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

/** Roughly one star per 2,600 px², capped so huge screens stay cheap. */
export function starCount(width: number, height: number): number {
  return Math.min(900, Math.round((width * height) / 2600));
}

export function createStars(width: number, height: number, rng: Rng = Math.random): Star[] {
  return Array.from({ length: starCount(width, height) }, () => {
    // Most stars are far away; only a few are near and bright.
    const z = rng() ** 2.2;
    return {
      x: rng() * width,
      y: rng() * height,
      z,
      r: 0.35 + z * 1.25,
      twinkleSpeed: 0.4 + rng() * 1.6,
      phase: rng() * Math.PI * 2,
    };
  });
}

/** Wraps a coordinate into [0, size), so drifting stars re-enter on the other side. */
export function wrap(value: number, size: number): number {
  return ((value % size) + size) % size;
}

/**
 * How many motes to emit for a pointer move of `distance` px. Fine dust means
 * many small motes: about one every 3 px, fewer for touch.
 */
export function dustToEmit(distance: number, coarsePointer: boolean): number {
  const perPixel = coarsePointer ? 1 / 8 : 1 / 3;
  return Math.min(coarsePointer ? 6 : 16, Math.floor(distance * perPixel));
}

/**
 * One mote of stardust. Most are sub-pixel; a few are just big enough to
 * catch the light. They start almost still, keep a hint of the hand's motion
 * and live long enough to hang in the air behind the cursor.
 */
export function createDust(
  x: number,
  y: number,
  pointerVx: number,
  pointerVy: number,
  rng: Rng = Math.random,
): Dust {
  const angle = rng() * Math.PI * 2;
  const speed = 2 + rng() * 12;
  return {
    x: x + (rng() - 0.5) * 10,
    y: y + (rng() - 0.5) * 10,
    vx: Math.cos(angle) * speed + pointerVx * 0.025,
    vy: Math.sin(angle) * speed + pointerVy * 0.025,
    age: 0,
    life: 1.2 + rng() * 1.6,
    size: 0.35 + rng() ** 2 * 1.05,
    hue: rng() < 0.55 ? 1 : rng() < 0.8 ? 0 : 2,
    sparkleSpeed: 6 + rng() * 10,
    phase: rng() * Math.PI * 2,
  };
}

/**
 * Advances one mote by `dt` seconds: its launch speed bleeds away, then it
 * wanders slowly and rises a touch, like dust in a light beam.
 * Returns false once the mote has faded out.
 */
export function stepDust(d: Dust, dt: number, rng: Rng = Math.random): boolean {
  d.age += dt;
  if (d.age >= d.life) return false;

  const drag = Math.exp(-1.6 * dt);
  d.vx = d.vx * drag + (rng() - 0.5) * 18 * dt;
  d.vy = d.vy * drag + (rng() - 0.5) * 18 * dt - 3 * dt;
  d.x += d.vx * dt;
  d.y += d.vy * dt;
  return true;
}

/**
 * Brightness over a mote's life: a quick fade in, then a long, easing fade
 * out, with a shimmer on top so the dust glitters rather than glows.
 */
export function dustAlpha(d: Dust): number {
  const t = d.age / d.life;
  const envelope = t < 0.08 ? t / 0.08 : (1 - (t - 0.08) / 0.92) ** 1.6;
  const sparkle = 0.6 + 0.4 * Math.sin(d.age * d.sparkleSpeed + d.phase);
  return envelope * sparkle;
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
