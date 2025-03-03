const parseValueAndUm = (str: string): { value: number; um: string } | null => {
  const res = str.match(/(-?[\d.]+)([a-z%]*)/);
  if (res && res[1] && res[2]) {
    return {
      value: parseFloat(res[1]),
      um: res[2] as string,
    };
  }
  return null;
};

export { parseValueAndUm };
