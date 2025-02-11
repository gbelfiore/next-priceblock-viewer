import { IPriceBlockFont } from '../../../components/types/types';
import { getFontBorderV2 } from '../../../utils/VersionUtilis';
import { getProportionedSize } from '../../get-proportioned-size';

interface IUseFontBorderProps {
  font: IPriceBlockFont;
  gridSize: number;
}

export const getFontBorder = ({ font, gridSize }: IUseFontBorderProps) => {
  const fontBorder = getFontBorderV2(font.fontBorder);
  if (!fontBorder?.width || !fontBorder?.color) return {};
  return {
    WebkitTextStrokeWidth: getProportionedSize(gridSize, fontBorder.width),
    WebkitTextStrokeColor: fontBorder?.color,
  };
};
