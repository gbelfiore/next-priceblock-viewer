import { usePriceBlockStore } from '../../zustand/price-block-store';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { type IGenericPreviewProps } from '../types';

const UnitTypePreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey];
  const boxStyle = useBoxStyle({ gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const unitType = valuePriceBLock.unitType;

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!unitType || !properties) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: unitType }} />
    </div>
  );
};

export default UnitTypePreview;
