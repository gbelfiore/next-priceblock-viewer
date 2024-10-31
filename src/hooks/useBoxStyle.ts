import type { IPriceBlockBox } from '../components/types';
import { getProportionedSize } from './get-proportioned-size';
import type { CSSProperties } from 'react';

interface IUseBoxStyleProps {
  box: IPriceBlockBox | undefined;
  gridSize: number;
}

const useBoxStyle = ({ box, gridSize }: IUseBoxStyleProps): CSSProperties => {
  let style: CSSProperties = {
    backgroundColor: box?.color ?? 'transparent',
  };

  if (box?.border?.thickness) {
    style = {
      ...style,
      borderTop: `${box?.border?.thickness.top ? getProportionedSize(gridSize, box?.border?.thickness.top) : '0px'} solid ${
        box?.border?.color ?? 'transparent'
      }`,
      borderLeft: `${box?.border?.thickness.left ? getProportionedSize(gridSize, box?.border.thickness.left) : '0px'} solid ${
        box?.border?.color ?? 'transparent'
      }`,
      borderBottom: `${box?.border?.thickness.bottom ? getProportionedSize(gridSize, box?.border?.thickness.bottom) : '0'} solid ${
        box?.border?.color ?? 'transparent'
      }`,
      borderRight: `${box?.border?.thickness.right ? getProportionedSize(gridSize, box?.border?.thickness.right) : '0'} solid ${
        box?.border?.color ?? 'transparent'
      }`,
    };
  }

  if (box?.padding) {
    style = {
      ...style,
      paddingTop: box.padding.top ? getProportionedSize(gridSize, box.padding.top) : '0px',
      paddingLeft: box.padding.left ? getProportionedSize(gridSize, box.padding.left) : '0px',
      paddingRight: box.padding.right ? getProportionedSize(gridSize, box.padding.right) : '0px',
      paddingBottom: box.padding.bottom ? getProportionedSize(gridSize, box.padding.bottom) : '0px',
    };
  }

  if (box?.shadow) {
    style = {
      ...style,
      boxShadow: `${box.shadow.offsetX ? getProportionedSize(gridSize, box.shadow.offsetX) : '0px'} ${
        box.shadow.offsetY ? getProportionedSize(gridSize, box.shadow.offsetY) : '0px'
      } ${box.shadow.blur ? getProportionedSize(gridSize, box.shadow.blur) : '0px'}  ${box.shadow.color ?? 'transparent'}`,
    };
  }

  if (box?.border?.radius) {
    style = {
      ...style,
      borderTopLeftRadius: box.border.radius.tl ? getProportionedSize(gridSize, box.border.radius.tl) : '0px',
      borderTopRightRadius: box.border.radius.tr ? getProportionedSize(gridSize, box.border.radius.tr) : '0px',
      borderBottomLeftRadius: box.border.radius.bl ? getProportionedSize(gridSize, box.border.radius.bl) : '0px',
      borderBottomRightRadius: box.border.radius.br ? getProportionedSize(gridSize, box.border.radius.br) : '0px',
    };
  }

  if (box?.url) {
    style = {
      ...style,
      backgroundImage: `url("${box.url}")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  }

  return style;
};

export default useBoxStyle;
