import { SeparateNumber } from '../separate-number/SeparateNumber';
import { PriceFormatType } from '../types/types';
import { useFormattedCurrencyStyle } from './useFormattedCurrencyStyle';

enum SeparateNumberFormattedType {
  Type1 = 'type1',
  Type2 = 'type2',
  Type3 = 'type3',
  Type4 = 'type4',
}

type ISeparateNumberFormattedProps = {
  fontSize?: string;
  type?: PriceFormatType;
  className?: string;
  currency?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  showCurrency?: boolean;
  value?: number | string;
  gridSize: number;
  hideDecimalsForInteger?: boolean;
};

const SeparateNumberFormatted = ({
  value,
  fontSize,
  type,
  className,
  decimalSeparator,
  thousandSeparator,
  currency,
  showCurrency,
  gridSize,
  hideDecimalsForInteger,
}: ISeparateNumberFormattedProps) => {
  const { containerClass, decimalClass, integerStyle, decimalContainerStyle, currencyStyle, decimalStyle } = useFormattedCurrencyStyle({
    className,
    fontSize,
    type,
    gridSize,
  });

  return (
    <SeparateNumber
      value={value}
      classes={{
        containerClass,
        decimalClass,
      }}
      fontSize={fontSize}
      styles={{
        integerStyle,
        decimalContainerStyle,
        currencyStyle,
        decimalStyle,
      }}
      currencyPosition={type === PriceFormatType.TYPE4 ? 'left' : 'right'}
      currency={currency}
      decimalSeparator={decimalSeparator}
      thousandSeparator={thousandSeparator}
      showCurrency={showCurrency}
      hideDecimalsForInteger={hideDecimalsForInteger}
    />
  );
};

export default SeparateNumberFormatted;

export { SeparateNumberFormattedType };
