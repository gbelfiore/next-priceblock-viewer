import { useMemo, type CSSProperties } from 'react';
import { getProportionedSize } from './get-proportioned-size';
import { isEmpty } from 'lodash-es';
import { IPriceBlockFont, IPriceBlockFontElement, FontStyle, AlignText } from '../components/types/types';
import { useFontBorder } from './use-font-border/useFontBorder';

interface IUseFontStyleProps {
  font?: IPriceBlockFont;
  gridSize: number;
  specializations?: IPriceBlockFontElement;
}

const useFontStyle = ({ font, gridSize, specializations }: IUseFontStyleProps): CSSProperties => {
  const fontBorder = useFontBorder({ font, gridSize });
  const getFontSize = useMemo(() => {
    return getProportionedSize(gridSize, specializations?.size ?? font?.size);
  }, [font?.size, gridSize, specializations?.size]);

  const getLineHeight = useMemo(() => {
    const lineHeight = specializations?.lineHeight ?? font?.lineHeight;
    return !isEmpty(lineHeight) ? getProportionedSize(gridSize, lineHeight) : 'normal';
  }, [font?.lineHeight, gridSize, specializations?.lineHeight]);

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
      // return font?.align == AlignText.LEFT ? 'flex-start' : font?.align == AlignText.RIGHT ? 'flex-end' : 'center'
      return font?.align == AlignText.LEFT ? 'left' : font?.align == AlignText.RIGHT ? 'right' : 'center';
    }
    return undefined;
  }, [font?.align, specializations]);

  const getMargin = useMemo(() => {
    return {
      marginTop: specializations?.margin?.top ? getProportionedSize(gridSize, specializations.margin.top) : '0px',
      marginLeft: specializations?.margin?.left ? getProportionedSize(gridSize, specializations.margin.left) : '0px',
      marginRight: specializations?.margin?.right ? getProportionedSize(gridSize, specializations.margin.right) : '0px',
      marginBottom: specializations?.margin?.bottom ? getProportionedSize(gridSize, specializations.margin.bottom) : '0px',
    };
  }, [gridSize, specializations?.margin?.bottom, specializations?.margin?.left, specializations?.margin?.right, specializations?.margin?.top]);

  const style: CSSProperties = {
    fontFamily: font?.family,
    fontSize: getFontSize,
    fontStyle: getFontStyle,
    fontWeight: getFontWeight,
    color: getColor,
    alignItems: getAlignItems,
    textAlign: getAlignItems,
    ...fontBorder,
    lineHeight: getLineHeight,
    letterSpacing: getLetterSpacing,
    ...getMargin,
  };
  return style;
};

export default useFontStyle;
