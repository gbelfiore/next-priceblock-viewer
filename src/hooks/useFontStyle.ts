import type { CSSProperties } from 'react';
import { getProportionedSize } from './get-proportioned-size';
import { AlignText, FontStyle, IPriceBlockFont } from '../components/types';

interface IUseFontStyleProps {
  font: IPriceBlockFont | undefined;
  gridSize: number;
}

const useFontStyle = ({ font, gridSize }: IUseFontStyleProps): CSSProperties => {
  const style: CSSProperties = {
    fontFamily: font?.family,
    fontSize: getProportionedSize(gridSize, font?.size),
    fontStyle: font?.style != FontStyle.BOLD ? font?.style : 'normal',
    fontWeight: font?.style == FontStyle.BOLD ? 'bold' : 'normal',
    color: font?.color,
    alignItems: font?.align == AlignText.LEFT ? 'flex-start' : font?.align == AlignText.RIGHT ? 'flex-end' : 'center',
    WebkitTextStrokeWidth: font?.fontBorder?.isEnabled && font?.fontBorder?.width ? getProportionedSize(gridSize, font.fontBorder.width) : '0',
    WebkitTextStrokeColor: font?.fontBorder?.color,
  };

  return style;
};

export default useFontStyle;
