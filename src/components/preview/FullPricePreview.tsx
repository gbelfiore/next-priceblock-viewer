import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import { IFullPriceProperties, IGenericPreviewProps, IPriceBlockElement } from '../types';
import SeparateNumberFormatted from '../separate-number-formatted/SeparateNumberFormatted';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import { usePriceBlockStore } from '../../zustand/price-block-store';

const FullPricePreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IFullPriceProperties>;
  const boxStyle = useBoxStyle({ basePath, gridSize, box: properties?.box });
  const fontStyle = useFontStyle({ gridSize, font: properties?.font });

  const fullPrice = valuePriceBLock.fullPrice;

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  const renderStrikethrough = useMemo(() => {
    if (!properties?.strikethrough) return null;
    const style: CSSProperties = {
      backgroundColor: properties.strikethrough.color || properties.font.color || '#000',
      transform: `rotate(${properties.strikethrough?.angle ?? ''}deg)`,
      height: `${properties.strikethrough?.height}px`,
      width: '90%',
      position: 'absolute',
    };
    return <div style={style}></div>;
  }, [properties]);

  if (!properties || !fullPrice) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center', { relative: properties.strikethrough })} style={getStyle}>
      {renderStrikethrough}
      <SeparateNumberFormatted
        thousandSeparator={properties.separators?.thousand}
        decimalSeparator={properties.separators?.decimal}
        showCurrency={properties.currency?.show}
        currency={properties.currency?.value}
        fontSize={properties.font.size}
        value={fullPrice}
        type={properties.format?.isEnable ? properties.format.type : undefined}
        gridSize={gridSize}
        hideDecimalsForInteger={properties.format.hideDecimalsForInteger}
      />
    </div>
  );
};

export default FullPricePreview;
