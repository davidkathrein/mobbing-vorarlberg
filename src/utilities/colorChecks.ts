/**
 * Converts hex color to RGB using regex
 * @param hex - Hex color string (with or without #)
 * @returns RGB object or null if invalid
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function isColorLight(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex) || { r: 0, g: 0, b: 0 }
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b
  return brightness > 186
}

// // Usage:
// console.log(isColorLight('#ffffff')) // true
// console.log(isColorLight('#000000')) // false
// console.log(isColorLight('#ff8800')) // false
