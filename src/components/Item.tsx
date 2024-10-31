import { useMemo, CSSProperties, FC } from 'react';
import { DynamicPriceBlockElementKey, IGenericPreviewProps, PriceBlockElementKey } from './types';
import FullPricePreview from './preview/FullPricePreview';
import { usePriceBlockStore } from '@/zustand/price-block-store';
import BadgePreview from './preview/BadgePreview';
import CustomFieldPreview from './preview/CustomFieldPreview';
import DiscountedPreview from './preview/DiscountedPreview';
import DiscountPreview from './preview/DiscountPreview';
import UnitTypePreview from './preview/UnitTypePreview';
import StaticCustomFieldPreview from './preview/StaticCustomFieldPreview';

const customFieldIndex = 100;

type LookupElement = { [key in DynamicPriceBlockElementKey]: FC<IGenericPreviewProps> };
const lookupContent: Partial<LookupElement> = {
  [PriceBlockElementKey.FULLPRICE]: FullPricePreview,
  [PriceBlockElementKey.DISCOUNT]: DiscountPreview,
  [PriceBlockElementKey.DISCOUNTED]: DiscountedPreview,
  [PriceBlockElementKey.BADGE]: BadgePreview,
  [PriceBlockElementKey.UNIT_TYPE]: UnitTypePreview,
};

for (let i = 0; i < customFieldIndex; i++) {
  lookupContent[`customfield_${i}`] = CustomFieldPreview;
}
for (let i = 0; i < customFieldIndex; i++) {
  lookupContent[`static_customfield_${i}`] = StaticCustomFieldPreview;
}

const Item = (props: IGenericPreviewProps) => {
  const { priceBlockElementKey, priceBlockKey } = props;
  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const gridSize = priceBlockComp?.gridSize;
  const { numRows, jsonConf } = priceBlockComp?.priceBlock ?? {};
  const priceBlockElements = jsonConf.priceBlockElements;
  const item = priceBlockElements[priceBlockElementKey];

  const currentStyle = useMemo(() => {
    if (!item) return {};
    const { position } = item;
    return {
      position: 'absolute',
      bottom: (numRows - position.rowEnd) * gridSize,
      left: position.colStart * gridSize,
      width: (position.colEnd - position.colStart) * gridSize,
      height: (position.rowEnd - position.rowStart) * gridSize,
      zIndex: item.layer,
    };
  }, [gridSize, item, numRows]);

  const Component = lookupContent[priceBlockElementKey] as FC<IGenericPreviewProps>;

  return (
    <div style={currentStyle as CSSProperties}>
      <Component {...props} />
    </div>
  );
};

export default Item;
