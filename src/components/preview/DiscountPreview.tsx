import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { IDiscountProperties, IGenericPreviewProps, IPriceBlockElement } from '../types';
import { usePriceBlockStore } from '../../zustand/price-block-store';

const DiscountPreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IDiscountProperties>;
  const boxStyle = useBoxStyle({ basePath, gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const discount = valuePriceBLock.discount;

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties || !discount) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: discount }} />
    </div>
  );
};

export default DiscountPreview;
