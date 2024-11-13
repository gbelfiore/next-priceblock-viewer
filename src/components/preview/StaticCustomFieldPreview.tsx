import type { IGenericPreviewProps, IPriceBlockElement, IStaticCustomFieldProperties } from '../types';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { usePriceBlockStore } from '../../zustand/price-block-store';

const StaticCustomFieldPreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock } = priceBlockComp;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IStaticCustomFieldProperties>;
  const boxStyle = useBoxStyle({ basePath, gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: properties?.exampleContent }} />
    </div>
  );
};

export default StaticCustomFieldPreview;
