import { IPriceBlockElements, IPriceBlockSettings } from '../components/types/types';

interface PriceBlock {
  _id: string;
  id: number;
  name: string;
  jsonConf: {
    settings: IPriceBlockSettings;
    priceBlockElements: IPriceBlockElements;
  };
  numRows: number;
  numCols: number;
  basePath: string;
}

export type { PriceBlock };
