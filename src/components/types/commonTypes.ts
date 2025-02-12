import { IDiscountedProperties, IDiscountProperties, IFullPriceProperties } from './types';

export enum SelectTemplate {
  CURRENCY_ON_RIGHT_1 = 'currency_on_right_1',
  CURRENCY_ON_RIGHT_2 = 'currency_on_right_2',
  CURRENCY_ON_LEFT_1 = 'currency_on_left_1',
  CURRENCY_ON_LEFT_2 = 'currency_on_left_2',
  CURRENCY_ON_TOP_1 = 'currency_on_top_1',
  CURRENCY_ON_TOP_2 = 'currency_on_top_2',
  CURRENCY_ON_BOTTOM_1 = 'currency_on_bottom_1',
  CURRENCY_ON_BOTTOM_2 = 'currency_on_bottom_2',
}

export enum FontStyle {
  NORMAL = 'normal',
  ITALIC = 'italic',
  BOLD = 'bold',
}

export enum PriceFormatType {
  TYPE1 = 'type1',
  TYPE2 = 'type2',
  TYPE3 = 'type3',
  TYPE4 = 'type4',
}

export enum AlignText {
  RIGHT = 'right',
  CENTER = 'center',
  LEFT = 'left',
}

export enum PriceBlockElementKey {
  FULLPRICE = 'fullPrice',
  DISCOUNT = 'discount',
  DISCOUNTED = 'discounted',
  BADGE = 'badge',
  UNIT_TYPE = 'unitType',
}

export enum DiscountType {
  PERCENTAGE = 'percentage',
  PRICE = 'price',
}

export type DynamicPriceBlockElementKey = PriceBlockElementKey | `customfield_${number}` | `static_customfield_${number}`;

export type TBorderStyle = 'solid' | 'dotted' | 'dashed' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';

export interface IPriceBlockPosition {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

export interface IPriceBlockFontElement {
  size?: string;
  style?: FontStyle;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  margin?: IPriceBlockPadding;
}

export interface IPriceBlockFontBorder {
  isEnabled: boolean;
  width?: string;
  color?: string;
}

export interface IPriceBlockFont {
  family: string;
  size: string;
  style: FontStyle;
  color: string;
  align: AlignText;
  lineHeight?: string;
  letterSpacing?: string;
  fontBorder: IPriceBlockFontBorder;
  integerStyles?: IPriceBlockFontElement;
  decimalStyles?: IPriceBlockFontElement;
  currencyStyles?: IPriceBlockFontElement;
  prefixStyles?: IPriceBlockFontElement;
  suffixStyles?: IPriceBlockFontElement;
}

export type Separator = '.' | ',' | undefined;

export interface ISeparators {
  decimal?: Separator;
  thousand?: Separator;
}

export interface IPriceBlockShadow {
  offsetX?: string;
  offsetY?: string;
  blur?: string;
  color?: string;
}

export interface IPriceBlockPadding {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface IPriceBlockBorder {
  color?: string;
  style?: TBorderStyle;
  thickness?: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  };
  radius?: {
    tl?: string;
    tr?: string;
    bl?: string;
    br?: string;
  };
}

export enum ESeparator {
  INTEGER = 'integer',
  DECIMAL = 'decimal',
}
export enum EAlignDecimal {
  BOTTOM = 'bottom',
  CENTER = 'center',
  TOP = 'top',
}
export enum EAlignPrefix {
  BOTTOM = 'bottom',
  CENTER = 'center',
  TOP = 'top',
}
export enum EAlignSuffix {
  BOTTOM = 'bottom',
  CENTER = 'center',
  TOP = 'top',
}
export enum EPositionCurrency {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}
export enum EAlignCurrency {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  CENTER_VERTICAL = 'center_vertical',
  CENTER_HORIZONTAL = 'center_horizontal',
}

export interface IPriceBlockBox {
  color?: string;
  border?: IPriceBlockBorder;
  shadow?: IPriceBlockShadow;
  padding?: IPriceBlockPadding;
  url?: string;
}

export interface IBadgeProperties {
  url?: string;
  rotate: number;
  size: number;
}

export interface IStrikethrough {
  angle: number;
  height: number;
  color?: string;
}

export interface IUnitTypeProperties {
  exampleContent: string;
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
}

export interface IStaticCustomFieldProperties {
  exampleContent: string;
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
  strikethrough?: IStrikethrough;
}

export interface ICustomFieldProperties {
  exampleContent: string;
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
  strikethrough?: IStrikethrough;
}

export type PriceBlockGenericProperties =
  | IBadgeProperties
  | IFullPriceProperties
  | IDiscountProperties
  | IDiscountedProperties
  | ICustomFieldProperties
  | IStaticCustomFieldProperties
  | IUnitTypeProperties;

export interface IPriceBlockElement<T extends PriceBlockGenericProperties> {
  label: string;
  position: IPriceBlockPosition;
  layer: number;
  properties: T;
}

export type IPriceBlockElements = {
  [key in DynamicPriceBlockElementKey]?: IPriceBlockElement<PriceBlockGenericProperties>;
};

export interface IGenericPreviewProps {
  priceBlockKey: string;
  priceBlockElementKey: PriceBlockElementKey;
}
