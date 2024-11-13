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
  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const { settings } = priceBlock.jsonConf;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IFullPriceProperties>;
  const boxStyle = useBoxStyle({ gridSize, box: properties?.box });
  const fontStyle = useFontStyle({ gridSize, font: properties?.font });

  const fullPrice = valuePriceBLock.fullPrice;

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  const renderCrossedLine = useMemo(() => {
    if (!properties?.showCrossedLine) return null;
    const style: CSSProperties = {
      backgroundColor: properties.font.color,
      transform: `rotate(${properties.rotateCrossedLine ?? ''}deg)`,
      height: `${properties.crossedLineHeight}px`,
      width: '90%',
      position: 'absolute',
    };
    return <div style={style}></div>;
  }, [properties]);

  if (!properties || !fullPrice) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center', { relative: properties.showCrossedLine })} style={getStyle}>
      {renderCrossedLine}
      <SeparateNumberFormatted
        thousandSeparator={settings?.separator.thousand}
        decimalSeparator={settings?.separator.decimal}
        showCurrency={properties.showCurrency}
        fontSize={properties.font.size}
        currency={settings?.currency}
        value={parseFloat(fullPrice)}
        type={properties.format?.isEnable ? properties.format.type : undefined}
        gridSize={gridSize}
      />
    </div>
  );
};

export default FullPricePreview;
