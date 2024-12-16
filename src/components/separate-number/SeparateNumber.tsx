import classNames from 'classnames';
import type { CSSProperties } from 'react';
import type { SeparateNumberCurrencyPosition } from './types';
import { cleanAndSplitPrice } from '../../utils/priceUtils';

type SeparateNumberClasses = {
  containerClass?: string;
  integerClass?: string;
  decimalClass?: string;
};

type SeparateNumberStyles = {
  containerStyle?: CSSProperties | undefined;
  integerStyle?: CSSProperties | undefined;
  decimalStyle?: CSSProperties | undefined;
  decimalContainerStyle?: CSSProperties | undefined;
  currencyStyle?: CSSProperties | undefined;
};

type ISeparateNumberProps = {
  value?: number | string;
  classes?: SeparateNumberClasses;
  fontSize?: string;
  styles?: SeparateNumberStyles;
  currencyPosition?: SeparateNumberCurrencyPosition;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
  currency?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  showCurrency?: boolean;
  hideDecimalsForInteger?: boolean;
};

const SeparateNumber = ({
  value = 0.0,
  styles,
  classes,
  onClick,
  currencyPosition = 'right',
  currency = '€',
  decimalSeparator = ',',
  thousandSeparator = '.',
  showCurrency = true,
  hideDecimalsForInteger,
}: ISeparateNumberProps) => {
  const containerClass = classNames(classes?.containerClass, 'flex');
  const valueString = cleanAndSplitPrice(value);
  if (!valueString) return null;
  const integerPart = valueString[0]?.replace('.', thousandSeparator);
  const decimalPart = valueString[1];
  const isInteger = parseInt(decimalPart) == 0;
  const isRenderDecimal = ((isInteger && !hideDecimalsForInteger) || !isInteger) && decimalPart;

  return (
    <div className={containerClass} onClick={onClick}>
      {currencyPosition === 'left' && (
        <div className="mr-1" style={styles?.currencyStyle}>
          {currency}
        </div>
      )}
      <div style={styles?.integerStyle}>
        {integerPart}
        {isRenderDecimal && decimalSeparator}
      </div>

      <div style={styles?.decimalContainerStyle} className={classes?.decimalClass}>
        {isRenderDecimal ? <div style={styles?.decimalStyle}>{decimalPart}</div> : <span />}
        {showCurrency && currencyPosition !== 'left' && <div style={styles?.currencyStyle}>{currency}</div>}
      </div>
    </div>
  );
};

export { SeparateNumber };
