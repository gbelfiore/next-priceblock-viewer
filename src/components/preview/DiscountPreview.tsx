import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { DiscountType, IDiscountProperties, IGenericPreviewProps, IPriceBlockElement } from '../types';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import SeparateNumberFormatted from '../separate-number-formatted/SeparateNumberFormatted';
import CrossedLine from '../CrossedLine';
import { config } from '../../config/config';
import FormatterPricePreview from '../formatter-price-preview/FormatterPricePreview';

const DiscountPreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const settings = priceBlock.jsonConf.settings;
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
    if (properties.percentage) {
      if (properties.percentage.show && properties.percentage.value != undefined) {
        value = value.replace('%', properties.percentage.value);
      } else {
        value = value.replace('%', '');
      }
    }

    return (
      <div className={classNames('flex h-full w-full flex-col justify-center')} style={{ ...getStyle, whiteSpace: 'pre-wrap' }}>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    );
  }, [discount, getStyle, properties.percentage]);

  const renderDiscountSamePrice = useMemo(() => {
    if (!discount) return null;
    return (
      <div className={classNames('flex h-full w-full flex-col justify-center', { relative: properties.strikethrough })} style={getStyle}>
        <CrossedLine font={properties.font} strikethrough={properties.strikethrough} />

        {settings.version != config.version && (
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
        )}

        {settings.version == config.version && (
          <FormatterPricePreview
            value={discount}
            currency={properties.currency?.value}
            prefix={properties.currency?.prefix}
            suffix={properties.currency?.suffix}
            thousandSeparator={settings.separators?.thousand}
            decimalSeparator={settings.separators?.decimal}
            font={properties.font}
            format={properties.format}
            gridSize={gridSize}
          />
        )}
      </div>
    );
  }, [
    discount,
    getStyle,
    gridSize,
    properties.currency?.prefix,
    properties.currency?.show,
    properties.currency?.suffix,
    properties.currency?.value,
    properties.font,
    properties.format,
    properties.separators?.decimal,
    properties.separators?.thousand,
    properties.strikethrough,
    settings.separators?.decimal,
    settings.separators?.thousand,
    settings.version,
  ]);

  if (!properties || !discount) return null;

  const isPriceType = properties.type == DiscountType.PRICE;
  const isPercentageType = !properties.type || properties.type == DiscountType.PERCENTAGE;

  return (
    <>
      {isPercentageType && renderDiscountSamePercentage}
      {isPriceType && renderDiscountSamePrice}
    </>
  );
};

export default DiscountPreview;
