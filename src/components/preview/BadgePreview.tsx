import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';
import { usePriceBlockStore } from '@/zustand/price-block-store';
import { IGenericPreviewProps } from '../types';

function BadgePreview({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const { priceBlock } = priceBlockComp;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey];

  const getStyle = useMemo((): CSSProperties => {
    const style: CSSProperties = {
      backgroundImage: !isEmpty(properties.url) ? `url("${properties.url}")` : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: properties.size == 100 ? 'contain' : `${properties.size}%`,
      transform: `rotate(${properties.rotate}deg)`,
    };

    return style;
  }, [properties.rotate, properties.size, properties.url]);

  return <div className="z-100 relative flex h-full w-full items-center justify-center" style={getStyle}></div>;
}

export default BadgePreview;
