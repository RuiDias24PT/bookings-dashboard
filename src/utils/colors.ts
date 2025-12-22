export function generateHslColors(count: number, options = { s: 70, l: 55 }) {
  if (count <= 0) return [];

  return Array.from(
    { length: count },
    (_, i) =>
      `hsl(${Math.round((360 / count) * i)}, ${options.s}%, ${options.l}%)`
  );
}
