import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import SeparateNumberFormatted from '../separate-number-formatted/SeparateNumberFormatted';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import { IDiscountedProperties, IGenericPreviewProps, IPriceBlockElement } from '../types';

const DiscountedPreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IDiscountedProperties>;

  const boxStyle = useBoxStyle({ basePath, gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const discounted = valuePriceBLock.discounted;

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties || !discounted) return null;

  return (
    <div className={'flex h-full w-full flex-col justify-center'} style={getStyle}>
      <SeparateNumberFormatted
        thousandSeparator={properties.separators?.thousand}
        decimalSeparator={properties.separators?.decimal}
        showCurrency={properties.currency?.show}
        currency={properties.currency?.value}
        fontSize={properties.font.size}
        value={discounted}
        type={properties.format.isEnable ? properties.format.type : undefined}
        gridSize={gridSize}
        hideDecimalsForInteger={properties.format.hideDecimalsForInteger}
      />
    </div>
  );
};

export default DiscountedPreview;
