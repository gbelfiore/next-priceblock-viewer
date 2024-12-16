function recognizeSeparators(price: string) {
  // Rimuoviamo eventuali spazi o simboli di valuta
  const cleanPrice = price.replace(/[^\d.,]/g, '');

  // Verifica se il punto o la virgola è il separatore decimale
  const matchComma = cleanPrice.match(/,(\d{2})$/);
  const matchPoint = cleanPrice.match(/\.(\d{2})$/);

  if (matchComma) {
    return {
      decimal: ',',
      thousand: '.',
    };
  } else if (matchPoint) {
    return {
      decimal: '.',
      thousand: ',',
    };
  }
  return null;
}

const cleanAndSplitPrice = (value: string | number): [string, string] | undefined => {
  const strValue = value.toString().replace(',', '.');
  const numberValue = parseFloat(strValue);
  if (isNaN(numberValue)) return undefined;
  const formattedValue = numberValue.toLocaleString('it-IT', { minimumIntegerDigits: 1, minimumFractionDigits: 2 });
  const [integerPart, decimalPart] = formattedValue.split(',');
  return [integerPart, decimalPart];
};
export { recognizeSeparators, cleanAndSplitPrice };
