import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import { IDiscountedProperties, IGenericPreviewProps, IPriceBlockElement, IStrikethrough, typesV2 } from '../types/types';
import classNames from 'classnames';
import CrossedLine from '../CrossedLine';
import ChooserPriceFormat from '../chooser-price-format/ChooserPriceFormat';
import { isVersionV2 } from '../../utils/VersionUtilis';

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


  const strikethrough = useMemo(() => {
    let strikethrough: IStrikethrough | undefined = undefined
    if (isVersionV2(settings)) {
      strikethrough = (properties as typesV2.IDiscountedProperties).strikethrough
    }
    return strikethrough
  }, [properties, settings]);

  if (!properties || !discounted) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center', { relative: strikethrough })} style={getStyle}>
      <CrossedLine font={properties.font} strikethrough={strikethrough} />

      <ChooserPriceFormat
        value={discounted}
        gridSize={gridSize}
        settings={settings}
        properties={properties}
      />
    </div>
  );
};

export default DiscountedPreview;
