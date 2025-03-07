import { PriceBlockElementKey } from './types/types';
import Item from './Item';
import { usePriceBlockStore } from '../zustand/price-block-store';

interface ElementsProps {
  priceBlockKey: string;
}

const Elements = ({ priceBlockKey }: ElementsProps) => {
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const priceBlockElements = priceBlockComp?.priceBlock.jsonConf.priceBlockElements;

  if (!priceBlockElements) return null;
  return (
    <div className="h-full w-full">
      {Object.keys(priceBlockElements).map((elementKeyIndex) => {
        return (
          <Item
            key={`${priceBlockKey}_${elementKeyIndex}`}
            priceBlockKey={priceBlockKey}
            priceBlockElementKey={elementKeyIndex as PriceBlockElementKey}
          />
        );
      })}
    </div>
  );
};

export default Elements;
