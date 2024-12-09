import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { DiscountType, IDiscountProperties, IGenericPreviewProps, IPriceBlockElement } from '../types';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import SeparateNumberFormatted from '../separate-number-formatted/SeparateNumberFormatted';

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

  const renderDiscountSamePercentage = useMemo(() => {
    if (!discount) return null;

    let value = discount;
    if (properties.percentage?.show && properties.percentage?.value != undefined) {
      value = value.replace('%', properties.percentage.value);
    } else {
      value = value.replace('%', '');
    }

    return (
      <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    );
  }, [discount, getStyle, properties.percentage?.show, properties.percentage?.value]);

  const renderDiscountSamePrice = useMemo(() => {
    if (!discount) return null;
    return (
      <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
        <SeparateNumberFormatted
          thousandSeparator={properties.separators?.thousand}
          decimalSeparator={properties.separators?.decimal}
          showCurrency={properties.currency?.show}
          currency={properties.currency?.value}
          fontSize={properties.font.size}
          value={discount}
          type={properties.format?.isEnable ? properties.format?.type : undefined}
          gridSize={gridSize}
          hideDecimalsForInteger={properties.format?.hideDecimalsForInteger}
        />
      </div>
    );
  }, [
    discount,
    getStyle,
    gridSize,
    properties.currency?.show,
    properties.currency?.value,
    properties.font.size,
    properties.format?.hideDecimalsForInteger,
    properties.format?.isEnable,
    properties.format?.type,
    properties.separators?.decimal,
    properties.separators?.thousand,
  ]);

  if (!properties || !discount) return null;

  return (
    <>
      {(!properties.type || properties.type == DiscountType.PERCENTAGE) && renderDiscountSamePercentage}
      {properties.type == DiscountType.PRICE && renderDiscountSamePrice}
    </>
  );
};

export default DiscountPreview;
