import { useEffect, useMemo } from 'react';
import Elements from './Elements';
import { PriceBlockStoreStateItem, usePriceBlockStore } from '../zustand/price-block-store';
import { PriceBlock } from '../types/price-block';
import useWebPOrOriginal from '../hooks/useWebPOrOriginal';

interface DynamicPriceBlockProps {
  priceBlock: PriceBlock;
  priceBlockKey: string;
  gridSize: number;
  valuePriceBLock: {
    fullPrice?: string;
    discounted?: string;
    discount?: string;
    unitType?: string;
    textCustom?: { id: string; value: string }[];
    customBadgeUrl?: string;
  };
}

const DynamicPriceBlock = ({ priceBlock, priceBlockKey, gridSize, valuePriceBLock }: DynamicPriceBlockProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);

  const basePath = priceBlockComp?.priceBlock.basePath;
  const backgroundUrl = useWebPOrOriginal(basePath, priceBlockComp?.priceBlock?.jsonConf?.settings?.background?.url);

  useEffect(() => {
    const item: PriceBlockStoreStateItem = {
      priceBlock,
      valuePriceBLock,
      gridSize,
    };
    usePriceBlockStore.getState().actions.init(priceBlockKey, item);
  }, [priceBlockKey, gridSize, priceBlock, valuePriceBLock]);

  const getBackground = useMemo(() => {
    const background = priceBlockComp?.priceBlock?.jsonConf?.settings?.background;
    if (background) {
      if (background.type == 'image' && backgroundUrl) {
        return `url(${backgroundUrl}) center center / contain no-repeat`;
      } else if (background.type == 'color' && background.color) {
        return background.color;
      } else {
        return 'none';
      }
    } else {
      return 'none';
    }
  }, [backgroundUrl, priceBlockComp?.priceBlock?.jsonConf?.settings?.background]);

  if (!priceBlockComp) return null;
  return (
    <div
      className="relative"
      style={{
        background: getBackground,
        height: priceBlockComp.priceBlock.numRows * priceBlockComp.gridSize,
        width: priceBlockComp.priceBlock.numCols * priceBlockComp.gridSize,
      }}>
      <Elements priceBlockKey={priceBlockKey} />
    </div>
  );
};

export default DynamicPriceBlock;
