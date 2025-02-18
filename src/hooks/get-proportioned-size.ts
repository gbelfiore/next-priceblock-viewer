const getProportionedSize = (gridSize: number, size?: string) => {
  size = size?.replace(',', '.');
  if (size?.includes('unit')) {
    return parseFloat(size) * (gridSize / 10) + 'px';
  }
  if (size?.includes('pt')) {
    return parseFloat(size);
  }
  return size;
};

export { getProportionedSize };
