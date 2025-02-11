import { ESeparator, EAlignDecimal, EPositionCurrency, EAlignCurrency, EAlignPrefix, EAlignSuffix, IStrikethrough, ISeparators } from '../types';
import * as typesV1 from '../V1/types';

export interface ICurrency extends Omit<typesV1.ICurrency, 'show'> {
  prefix?: string;
  suffix?: string;
}

export interface IPercentage extends Omit<typesV1.IPercentage, 'show'> {}

export interface IPriceBlockFormat extends Omit<typesV1.IPriceBlockFormat, 'isEnable' | 'type' | 'hideDecimalsForInteger'> {
  hideDecimalsForInteger?: boolean;
  separator?: ESeparator;
  alignDecimal?: EAlignDecimal;
  positionCurrency?: EPositionCurrency;
  alignCurrency?: EAlignCurrency;
  alignPrefix?: EAlignPrefix;
  alignSuffix?: EAlignSuffix;
}

export interface IFullPriceProperties extends Omit<typesV1.IFullPriceProperties, 'separators' | 'format' | 'currency'> {
  format: IPriceBlockFormat;
  currency: ICurrency;
}

export interface IDiscountProperties extends Omit<typesV1.IDiscountProperties, 'separators' | 'format' | 'currency'> {
  strikethrough?: IStrikethrough;
  format: IPriceBlockFormat;
  currency?: ICurrency;
}

export interface IDiscountedProperties extends Omit<typesV1.IDiscountedProperties, 'separators' | 'format' | 'currency'> {
  strikethrough?: IStrikethrough;
  format: IPriceBlockFormat;
  currency: ICurrency;
}

export interface IPriceBlockSettings extends Omit<typesV1.IPriceBlockSettings, 'background.type'> {
  separators: ISeparators;
}

export interface IFontBorder extends Omit<typesV1.IFontBorder, 'isEnabled'> {
  width?: string;
  color?: string;
}

export type PriceBlockProperties = IFullPriceProperties | IDiscountProperties | IDiscountedProperties;
