import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import SeparateNumberFormatted from '../separate-number-formatted/SeparateNumberFormatted';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import { IDiscountedProperties, IGenericPreviewProps, IPriceBlockElement } from '../types';
import classNames from 'classnames';
import CrossedLine from '../CrossedLine';
import { config } from '../../config/config';
import FormatterPricePreview from '../formatter-price-preview/FormatterPricePreview';

const DiscountedPreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const settings = priceBlock.jsonConf.settings;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IDiscountedProperties>;

  const boxStyle = useBoxStyle({ basePath, gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const discounted = valuePriceBLock.discounted;

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties || !discounted) return null;

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
          value={discounted}
          type={properties.format.isEnable ? properties.format.type : undefined}
          gridSize={gridSize}
          hideDecimalsForInteger={properties.format.hideDecimalsForInteger}
        />
      )}
      {settings.version == config.version && (
        <FormatterPricePreview
          value={discounted}
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
};

export default DiscountedPreview;
