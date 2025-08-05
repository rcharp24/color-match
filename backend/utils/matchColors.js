// backend/utils/matchColors.js

function matchColors(imageColors, paletteColors) {
  // Basic Euclidean distance matching
  function colorDistance(color1, color2) {
    return Math.sqrt(
      Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
    );
  }

  const matched = paletteColors.map(paletteColor => {
    const closest = imageColors.reduce((prev, curr) => {
      return colorDistance(curr, paletteColor) < colorDistance(prev, paletteColor)
        ? curr
        : prev;
    });
    return {
      paletteColor,
      matchedColor: closest,
    };
  });

  return matched;
}

module.exports = matchColors;
