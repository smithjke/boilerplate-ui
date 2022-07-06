import ColorHash from 'color-hash';

const colorHash = new ColorHash({
  hue: { min: 60, max: 360 },
  lightness: 0.5,
  saturation: 0.5,
});

export function colorFromString(value: string): string {
  return colorHash.hex(value);
}
