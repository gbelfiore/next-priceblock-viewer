import { useMemo, type CSSProperties } from 'react';
import { getProportionedSize } from './get-proportioned-size';
import { isEmpty } from 'lodash-es';
import { IPriceBlockFont, IPriceBlockFontElement, FontStyle, AlignText } from '../components/types/types';
import { parseValueAndUm } from '../utils/cssValueUtils';

interface IUseFontStyleProps {
  font: IPriceBlockFont | undefined;
  gridSize: number;
  specializations?: IPriceBlockFontElement;
}

const useFontStyle = ({ font, gridSize, specializations }: IUseFontStyleProps): CSSProperties => {
  const getFontSize = useMemo(() => {
    if (specializations?.size && font?.size) {
      const percentage = parseValueAndUm(specializations.size);
      if (percentage != undefined) {
        return getProportionedSize(gridSize, `${(parseFloat(font.size) * percentage.value) / 100}unit`);
      }
    }
    return getProportionedSize(gridSize, font?.size);
  }, [font?.size, gridSize, specializations?.size]);

  const getLineHeight = useMemo(() => {
    return !isEmpty(font?.lineHeight) ? getProportionedSize(gridSize, font?.lineHeight) : 'normal';
  }, [font?.lineHeight, gridSize]);

  const getColor = useMemo(() => {
    const color = specializations?.color ?? font?.color;
    return color;
  }, [font?.color, specializations?.color]);

  const getLetterSpacing = useMemo(() => {
    const letterSpacing = specializations?.letterSpacing ?? font?.letterSpacing;
    return !isEmpty(letterSpacing) ? getProportionedSize(gridSize, letterSpacing) : 'normal';
  }, [font?.letterSpacing, gridSize, specializations?.letterSpacing]);

  const getFontStyle = useMemo(() => {
    const style = specializations?.style ?? font?.style;
    return style != FontStyle.BOLD ? font?.style : 'normal';
  }, [font?.style, specializations?.style]);

  const getFontWeight = useMemo(() => {
    const weight = specializations?.style ?? font?.style;
    return weight == FontStyle.BOLD ? 'bold' : 'normal';
  }, [font?.style, specializations?.style]);

  const getAlignItems = useMemo(() => {
    if (!specializations) {
      return font?.align == AlignText.LEFT ? 'flex-start' : font?.align == AlignText.RIGHT ? 'flex-end' : 'center';
    }
    return undefined;
  }, [font?.align, specializations]);

  const getTextAlign = useMemo(() => {
    if (!specializations) {
      return font?.align == AlignText.LEFT ? 'left' : font?.align == AlignText.RIGHT ? 'right' : 'center';
    }
    return undefined;
  }, [font?.align, specializations]);

  const getFontBorder = useMemo(() => {
    if (!font?.fontBorder.isEnabled) return null;
    return {
      WebkitTextStrokeWidth: font?.fontBorder?.width ? getProportionedSize(gridSize, font?.fontBorder?.width) : '0',
      WebkitTextStrokeColor: font?.fontBorder?.color ?? 'none',
    };
  }, [font?.fontBorder?.color, font?.fontBorder.isEnabled, font?.fontBorder?.width, gridSize]);

  const style: CSSProperties = {
    fontFamily: font?.family,
    fontSize: getFontSize,
    fontStyle: getFontStyle,
    fontWeight: getFontWeight,
    color: getColor,
    alignItems: getAlignItems,
    textAlign: getTextAlign,
    ...getFontBorder,
    lineHeight: getLineHeight,
    letterSpacing: getLetterSpacing,
  };
  return style;
};

export default useFontStyle;
