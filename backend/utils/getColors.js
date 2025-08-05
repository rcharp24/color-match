const getColors = require('get-image-colors');

exports.extractDominantColor = async (buffer) => {
  const colors = await getColors(buffer, 'image/jpeg');
  return colors[0].hex();
};

exports.isAcceptable = (color) => {
  return color.startsWith('#00') || color.startsWith('#33');
};

exports.getSuggestedColors = async () => {
  return ['#0033FF', '#3366FF', '#3399FF'];
};