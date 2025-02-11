import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { DiscountType, IDiscountProperties, IGenericPreviewProps, IPriceBlockElement, IStrikethrough, typesV2 } from '../types/types';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import CrossedLine from '../CrossedLine';
import ChooserPriceFormat from '../chooser-price-format/ChooserPriceFormat';
import { isVersionV2 } from '../../utils/VersionUtilis';

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

  const strikethrough = useMemo(() => {
    let strikethrough: IStrikethrough | undefined = undefined
    if (isVersionV2(settings)) {
      strikethrough = (properties as typesV2.IDiscountProperties).strikethrough
    }
    return strikethrough
  }, [properties, settings]);

  const renderDiscountSamePrice = useMemo(() => {
    if (!discount) return null;

    return (
      <div className={classNames('flex h-full w-full flex-col justify-center', { relative: strikethrough })} style={getStyle}>
        <CrossedLine font={properties.font} strikethrough={strikethrough} />

        <ChooserPriceFormat
          value={discount}
          gridSize={gridSize}
          settings={settings}
          properties={properties}
        />
      </div>
    );
  }, [discount, getStyle, gridSize, properties, settings, strikethrough]);

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
