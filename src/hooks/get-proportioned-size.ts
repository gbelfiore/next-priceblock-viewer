const getProportionedSize = (gridSize: number, size?: string) => {
  if (size?.includes('unit')) {
    return parseFloat(size) * (gridSize / 10) + 'px';
  }
};

export { getProportionedSize };
