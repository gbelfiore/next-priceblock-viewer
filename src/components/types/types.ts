import * as typesV1 from './V1/types';
import * as typesV2 from './V2/types';

export * from './commonTypes';
export { typesV1, typesV2 };

export type ICurrency = typesV1.ICurrency | typesV2.ICurrency;
export type IPercentage = typesV1.IPercentage | typesV2.IPercentage;
export type IPriceBlockFormat = typesV1.IPriceBlockFormat | typesV2.IPriceBlockFormat;
export type IFullPriceProperties = typesV1.IFullPriceProperties | typesV2.IFullPriceProperties;
export type IDiscountProperties = typesV1.IDiscountProperties | typesV2.IDiscountProperties;
export type IDiscountedProperties = typesV1.IDiscountedProperties | typesV2.IDiscountedProperties;
export type PriceBlockProperties = typesV1.PriceBlockProperties | typesV2.PriceBlockProperties;
export type IPriceBlockSettings = typesV1.IPriceBlockSettings | typesV2.IPriceBlockSettings;
