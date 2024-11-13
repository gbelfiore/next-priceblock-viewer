/* eslint-disable @typescript-eslint/no-explicit-any */
type Currency = '€' | '$' | '£';

enum FontStyle {
  NORMAL = 'normal',
  ITALIC = 'italic',
  BOLD = 'bold',
}

enum PriceFormatType {
  TYPE1 = 'type1',
  TYPE2 = 'type2',
  TYPE3 = 'type3',
  TYPE4 = 'type4',
}

enum AlignText {
  RIGHT = 'right',
  CENTER = 'center',
  LEFT = 'left',
}

enum PriceBlockElementKey {
  FULLPRICE = 'fullPrice',
  DISCOUNT = 'discount',
  DISCOUNTED = 'discounted',
  BADGE = 'badge',
  UNIT_TYPE = 'unitType',
}

interface IPriceBlockPosition {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

interface IPriceBlockFont {
  family: string;
  size: string;
  style: FontStyle;
  color: string;
  align: AlignText;
  fontBorder: {
    isEnabled: boolean;
    width: string;
    color: string;
  };
}

interface IPriceBlockShadow {
  offsetX?: string;
  offsetY?: string;
  blur?: string;
  color?: string;
}

interface IPriceBlockPadding {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface IPriceBlockBorder {
  color?: string;
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

interface IPriceBlockFormat {
  isEnable: boolean;
  type?: PriceFormatType;
}

interface IPriceBlockBox {
  color?: string;
  border?: IPriceBlockBorder;
  shadow?: IPriceBlockShadow;
  padding?: IPriceBlockPadding;
  url?: string;
}

interface IBadgeProperties {
  url?: string;
  rotate: number;
  size: number;
}

interface IFullPriceProperties {
  showCurrency: boolean;
  font: IPriceBlockFont;
  showCrossedLine: boolean;
  rotateCrossedLine: number;
  crossedLineHeight: number;
  box?: IPriceBlockBox;
  format: IPriceBlockFormat;
}

interface IDiscountProperties {
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
}

interface IDiscountedProperties {
  showCurrency: boolean;
  format: IPriceBlockFormat;
  font: IPriceBlockFont;
  showFontBorder: boolean;
  box?: IPriceBlockBox;
}

interface IUnitTypeProperties {
  exampleContent: string;
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
}

interface IStaticCustomFieldProperties {
  exampleContent: string;
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
}

interface ICustomFieldProperties {
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
}

type PriceBlockGenericProperties =
  | IBadgeProperties
  | IFullPriceProperties
  | IDiscountProperties
  | IDiscountedProperties
  | ICustomFieldProperties
  | IStaticCustomFieldProperties
  | IUnitTypeProperties;

interface IPriceBlockElement<T extends PriceBlockGenericProperties> {
  label: string;
  position: IPriceBlockPosition;
  layer: number;
  properties: T;
}

type IPriceBlockElements = { [key in PriceBlockElementKey]?: IPriceBlockElement<PriceBlockGenericProperties> };

interface IPriceBlockSettings {
  name: string;
  currency: Currency;
  showGrid: boolean;
  separator: {
    decimal: string;
    thousand: string;
  };
  background: {
    type: 'image' | 'color' | 'nothing';
    color?: string;
    url?: string;
  };
  fontsUrl?: string;
}

type DynamicPriceBlockElementKey = PriceBlockElementKey | `customfield_${number}` | `static_customfield_${number}`;

interface IGenericPreviewProps {
  priceBlockKey: string;
  priceBlockElementKey: PriceBlockElementKey;
}

export type { IGenericPreviewProps };

export type {
  Currency,
  IPriceBlockFont,
  IPriceBlockBox,
  IPriceBlockSettings,
  IPriceBlockElements,
  IPriceBlockPosition,
  IPriceBlockElement,
  PriceBlockGenericProperties,
  IBadgeProperties,
  IFullPriceProperties,
  IDiscountProperties,
  IDiscountedProperties,
  IUnitTypeProperties,
  ICustomFieldProperties,
  DynamicPriceBlockElementKey,
  IStaticCustomFieldProperties,
};
export { PriceFormatType, PriceBlockElementKey, FontStyle, AlignText };
