import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import { IFullPriceProperties, IGenericPreviewProps, IPriceBlockElement } from '../types/types';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import CrossedLine from '../CrossedLine';
import ChooserPriceFormat from '../chooser-price-format/ChooserPriceFormat';

const FullPricePreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock, valuePriceBLock } = priceBlockComp;
  const settings = priceBlock.jsonConf.settings
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IFullPriceProperties>;
  const boxStyle = useBoxStyle({ basePath, gridSize, box: properties?.box });
  const fontStyle = useFontStyle({ gridSize, font: properties?.font });

  const fullPrice = valuePriceBLock.fullPrice;

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);



  if (!properties || !fullPrice) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center', { relative: properties.strikethrough })} style={getStyle}>
      <CrossedLine font={properties.font} strikethrough={properties.strikethrough} />
      <ChooserPriceFormat
        value={fullPrice}
        gridSize={gridSize}
        settings={settings}
        properties={properties}
      />
    </div>
  );
};

export default FullPricePreview;
