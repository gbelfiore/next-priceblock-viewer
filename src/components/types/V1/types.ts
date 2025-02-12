import { DiscountType, IPriceBlockBox, IPriceBlockFont, ISeparators, IStrikethrough, PriceFormatType } from '../types';

export interface ICurrency {
  value?: string;
  show: boolean;
}

export interface IPercentage {
  value?: string;
  show: boolean;
}

export interface IPriceBlockFormat {
  hideDecimalsForInteger: boolean;
  isEnable: boolean;
  type?: PriceFormatType;
}

export interface IFullPriceProperties {
  font: IPriceBlockFont;
  strikethrough?: IStrikethrough;
  box?: IPriceBlockBox;
  format: IPriceBlockFormat;
  currency: ICurrency;
  separators: ISeparators;
}

export interface IDiscountProperties {
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
  type: DiscountType;
  percentage?: IPercentage;
  format?: IPriceBlockFormat;
  separators?: ISeparators;
  currency?: ICurrency;
}

export interface IDiscountedProperties {
  format: IPriceBlockFormat;
  font: IPriceBlockFont;
  showFontBorder: boolean;
  box?: IPriceBlockBox;
  separators: ISeparators;
  currency: ICurrency;
}

export interface IPriceBlockSettings {
  name: string;
  showGrid: boolean;
  background: {
    type: 'image' | 'color' | 'nothing';
    color?: string;
    url?: string;
  };
  fontsUrl?: string;
  version?: string;
}

export type PriceBlockProperties = IFullPriceProperties | IDiscountProperties | IDiscountedProperties;
