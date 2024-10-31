/* eslint-disable @typescript-eslint/no-explicit-any */
import { PriceBlock } from '@/types/price-block';
import { create } from 'zustand';
import { getExtraFonts } from '@/utils/FontUitls';

interface PriceBlockStoreStateItemValue {
  discount?: string;
  fullPrice?: string;
  discounted?: string;
  unitType?: string;
  textCustom?: Array<{ id: string; value: string }>;
}

interface PriceBlockStoreStateItem {
  priceBlock: PriceBlock;
  valuePriceBLock: PriceBlockStoreStateItemValue;
  gridSize: number;
}

interface PriceBlockStoreStateActions {
  init(elementKey: string, dataCompItem: PriceBlockStoreStateItem): void;
  getCurrentCustomField(elementKey: string, priceBlockElementKey: string): { id: string; value: string } | undefined;
}

interface PriceBlockStoreState {
  dataComp: Record<string, PriceBlockStoreStateItem>;
  actions: PriceBlockStoreStateActions;
}

const usePriceBlockStore = create<PriceBlockStoreState>((set, get) => ({
  dataComp: {},

  actions: {
    init: async (elementKey: string, dataCompItem: PriceBlockStoreStateItem) => {
      const fontsUrl = dataCompItem.priceBlock.jsonConf.settings.fontsUrl;
      if (fontsUrl) await getExtraFonts(fontsUrl);
      set({ dataComp: { ...get().dataComp, [elementKey]: dataCompItem } });
    },
    getCurrentCustomField: (elementKey: string, priceBlockElementKey: string) => {
      const textCustom = get().dataComp[elementKey].valuePriceBLock.textCustom;

      const currentCustomField = textCustom?.find((t) => t.id === priceBlockElementKey);
      return currentCustomField;
    },
  },
}));

export { usePriceBlockStore };
export type { PriceBlockStoreStateItem };