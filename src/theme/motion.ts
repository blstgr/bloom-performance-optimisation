/**
 * Shared motion tokens.
 *
 * Springs are described by physics rather than duration, so a value that travels further takes
 * proportionally longer — which is what makes a sliding indicator feel like one object moving
 * rather than a set of independent fades.
 */
export const springs = {
  /** Shared-layout glides: pills and indicators morphing between positions. Damped enough to
   * settle without overshoot, so an indicator never visibly bounces past the item it landed on. */
  slidingIndicator: { damping: 32, mass: 0.6, stiffness: 360 },
} as const;

/** Colour cross-fades that accompany a spring-driven move. Springs can't drive an interpolated
 * colour directly, so these run on a timing curve chosen to finish about when the spring settles. */
export const durations = {
  indicatorCrossFadeMs: 180,
} as const;
