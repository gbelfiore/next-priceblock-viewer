import { useMemo, type CSSProperties } from 'react';
import { getProportionedSize } from './get-proportioned-size';

interface IUseVerticalOffsetProps {
  verticalOffset?: string;
  gridSize: number;
}

const useVerticalOffset = ({ verticalOffset, gridSize }: IUseVerticalOffsetProps): CSSProperties => {
  const getMargin = useMemo((): CSSProperties => {
    return {
      bottom: verticalOffset ? getProportionedSize(gridSize, verticalOffset) : '0px',
    };
  }, [gridSize, verticalOffset]);

  return getMargin;
};

export default useVerticalOffset;
