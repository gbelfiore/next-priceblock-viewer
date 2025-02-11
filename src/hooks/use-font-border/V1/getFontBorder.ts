import { IPriceBlockFont } from '../../../components/types/types';
import { getFontBorderV1 } from '../../../utils/VersionUtilis';
import { getProportionedSize } from '../../get-proportioned-size';

interface IUseFontBorderProps {
  font: IPriceBlockFont;
  gridSize: number;
}

export const getFontBorder = ({ font, gridSize }: IUseFontBorderProps) => {
  const fontBorder = getFontBorderV1(font.fontBorder);
  if (!fontBorder?.isEnabled) return {};
  return {
    WebkitTextStrokeWidth: fontBorder?.width ? getProportionedSize(gridSize, fontBorder.width) : '0',
    WebkitTextStrokeColor: fontBorder?.color,
  };
};
