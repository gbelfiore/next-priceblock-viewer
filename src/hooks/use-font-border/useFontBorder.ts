import { IPriceBlockFont } from '../../components/types/types';
import { getFontBorder as getFontBorderV1 } from './V1/getFontBorder';
import { getFontBorder as getFontBorderV2 } from './V2/getFontBorder';

interface IUseFontBorderProps {
  font?: IPriceBlockFont;
  gridSize: number;
}

export const useFontBorder = ({ font, gridSize }: IUseFontBorderProps) => {
  if (!font) return {};
  return 'isEnabled' in font.fontBorder ? getFontBorderV1({ font, gridSize }) : getFontBorderV2({ font, gridSize });
};
