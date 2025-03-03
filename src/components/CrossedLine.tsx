import { CSSProperties, forwardRef } from 'react';
import { IStrikethrough, IPriceBlockFont, AlignText } from './types/types';
import { getProportionedSize } from '../hooks/get-proportioned-size';

interface ICrossedLineProps {
  strikethrough?: IStrikethrough | undefined;
  font?: IPriceBlockFont;
  gridSize: number;
}

const CrossedLine = forwardRef<HTMLDivElement, ICrossedLineProps>(({ strikethrough, font, gridSize }: ICrossedLineProps, ref) => {
  if (!strikethrough) return null;
  const angle = strikethrough?.angle ? (`${strikethrough?.angle}`.includes('deg') ? strikethrough?.angle : `${strikethrough?.angle}deg`) : '0deg';
  const height = strikethrough?.height
    ? `${strikethrough?.height}`.includes('unit')
      ? strikethrough?.height
      : `${strikethrough?.height}unit`
    : '0unit';

  const style: CSSProperties = {
    backgroundColor: strikethrough.color || font?.color || '#000',
    transform: `rotate(${angle})`,
    height: getProportionedSize(gridSize, height),
    top: '50%',
    width: '90%',
  };
  if (font?.align == AlignText.LEFT) {
    style.transform += ' translate(0, -50%)';
    style.left = 0;
    style.right = 'unset';
    style.transformOrigin = 'center';
  } else if (font?.align == AlignText.RIGHT) {
    style.transform += ' translate(0, -50%)';
    style.left = 'unset';
    style.right = 0;
    style.transformOrigin = 'center';
  } else {
    style.transform += ' translate(-50%, -50%)';
    style.left = '50%';
    style.right = 'unset';
    style.transformOrigin = 'left';
  }
  return <div ref={ref} className="absolute z-[2]" style={style}></div>;
});

CrossedLine.displayName = 'CrossedLine';
export default CrossedLine;
