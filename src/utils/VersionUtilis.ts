import { IFontBorder, IPriceBlockSettings, PriceBlockProperties, typesV1, typesV2 } from '../components/types/types';

export const isVersionV1 = (settings: IPriceBlockSettings): boolean => {
  return settings.version === '1.0.0';
};

export const isVersionV2 = (settings: IPriceBlockSettings): boolean => {
  return settings.version === '2.0.0';
};

//--- properties ---
export const getPropertiesV1 = (properties: PriceBlockProperties): typesV1.PriceBlockProperties => {
  return properties as typesV1.PriceBlockProperties;
};

export const getPropertiesV2 = (properties: PriceBlockProperties): typesV2.PriceBlockProperties => {
  return properties as typesV2.PriceBlockProperties;
};

//--- settings ---
export const getSettingsV1 = (settings: IPriceBlockSettings): typesV1.IPriceBlockSettings => {
  return settings as typesV1.IPriceBlockSettings;
};

export const getSettingsV2 = (settings: IPriceBlockSettings): typesV2.IPriceBlockSettings => {
  return settings as typesV2.IPriceBlockSettings;
};

//--- fontBorder ---
export const getFontBorderV1 = (fontBorder: IFontBorder): typesV1.IFontBorder => {
  return fontBorder as typesV1.IFontBorder;
};

export const getFontBorderV2 = (fontBorder: IFontBorder): typesV2.IFontBorder => {
  return fontBorder as typesV2.IFontBorder;
};
