import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';
import { IBadgeProperties, IGenericPreviewProps, IPriceBlockElement, PriceBlockElementKey } from '../types/types';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import useWebPOrOriginal from '../../hooks/useWebPOrOriginal';

function BadgePreview({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const isBadge = priceBlockElementKey == PriceBlockElementKey.BADGE;
  const isCustomBadge = priceBlockElementKey == PriceBlockElementKey.CUSTOM_BADGE;

  const { priceBlock, valuePriceBLock } = priceBlockComp;

  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<IBadgeProperties>;

  const backgroundUrl = useWebPOrOriginal(basePath, properties.url);

  const getStyle = useMemo((): CSSProperties => {
    const style: CSSProperties = {
      // backgroundImage: !isEmpty(properties.url) && backgroundUrl ? `url("${backgroundUrl}")` : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: properties.size == 100 ? 'contain' : `${properties.size}%`,
      transform: `rotate(${properties.rotate}deg)`,
    };

    if (isBadge) {
      style.backgroundImage = !isEmpty(properties.url) && backgroundUrl ? `url("${backgroundUrl}")` : 'none';
    } else if (isCustomBadge) {
      style.backgroundImage = !isEmpty(valuePriceBLock.customBadgeUrl) ? `url("${valuePriceBLock.customBadgeUrl}")` : 'none';
    }

    return style;
  }, [backgroundUrl, isBadge, isCustomBadge, properties.rotate, properties.size, properties.url, valuePriceBLock.customBadgeUrl]);

  return <div className="z-100 relative flex h-full w-full items-center justify-center" style={getStyle}></div>;
}

export default BadgePreview;
