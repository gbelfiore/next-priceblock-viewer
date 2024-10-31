import classNames from 'classnames';
import type { CSSProperties } from 'react';
import { PriceFormatType } from '../types';
import { getProportionedSize } from '../../hooks/get-proportioned-size';

type Props = {
  className?: string;
  fontSize?: string;
  type?: PriceFormatType;
  gridSize: number;
};

const useFormattedCurrencyStyle = ({ className, fontSize, type, gridSize }: Props) => {
  if (!type)
    return {
      containerClass: className,
      decimalClass: 'flex gap-2',
      integerStyle: { fontSize: `${getProportionedSize(gridSize, fontSize)}` },
      decimalStyle: { fontSize: `${getProportionedSize(gridSize, fontSize)}` },
      currencyStyle: { fontSize: `${getProportionedSize(gridSize, fontSize)}` },
    };

  const isType1 = type == PriceFormatType.TYPE1;
  //const isType2 = type == PriceFormatType.TYPE2;
  const isType3 = type == PriceFormatType.TYPE3;
  const isType4 = type == PriceFormatType.TYPE4;

  const containerClass = classNames(className, { 'items-end': isType1 }, { 'items-center': isType4 || isType3 });
  const decimalClass = classNames('flex', { 'flex-col-reverse  flex-col gap-2': isType3 });
  const integerStyle: CSSProperties = {
    fontSize: `${getProportionedSize(gridSize, fontSize)}`,
    lineHeight: isType3 ? `calc(${getProportionedSize(gridSize, fontSize)} - 10%)` : undefined,
  };
  const decimalContainerStyle: CSSProperties = { lineHeight: isType3 ? `calc(${getProportionedSize(gridSize, fontSize)} - 60%)` : undefined };
  const currencyStyle: CSSProperties = { fontSize: `calc(${getProportionedSize(gridSize, fontSize)} - 45%)` };
  const decimalStyle = { fontSize: `calc(${getProportionedSize(gridSize, fontSize)} - 45%)` };

  return {
    containerClass,
    decimalClass,
    integerStyle,
    decimalContainerStyle,
    currencyStyle,
    decimalStyle,
  };
};

export { useFormattedCurrencyStyle };
