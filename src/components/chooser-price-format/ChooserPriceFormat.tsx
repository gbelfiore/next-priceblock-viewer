import { useMemo } from "react";
import { getPropertiesV1, getPropertiesV2, getSettingsV2, isVersionV1, isVersionV2 } from "../../utils/VersionUtilis";
import FormatterPricePreview from "../formatter-price-preview/FormatterPricePreview"
import SeparateNumberFormatted from "../separate-number-formatted/SeparateNumberFormatted"
import { IDiscountedProperties, IDiscountProperties, IFullPriceProperties, IPriceBlockSettings } from "../types/types";

interface IChooserPriceFormatProps {
  value?: number | string;
  gridSize: number;
  settings: IPriceBlockSettings
  properties: IFullPriceProperties | IDiscountProperties | IDiscountedProperties
}

const ChooserPriceFormat = (props: IChooserPriceFormatProps) => {

  const renderVersionV1 = useMemo(() => {

    const properties = getPropertiesV1(props.properties)

    return <SeparateNumberFormatted
      thousandSeparator={properties.separators?.thousand}
      decimalSeparator={properties.separators?.decimal}
      showCurrency={properties.currency?.show}
      currency={properties.currency?.value}
      fontSize={properties.font.size}
      value={props.value}
      type={properties.format?.isEnable ? properties.format.type : undefined}
      gridSize={props.gridSize}
      hideDecimalsForInteger={properties.format?.hideDecimalsForInteger}
    />

  }, [props.gridSize, props.properties, props.value])

  const renderVersionV2 = useMemo(() => {

    const properties = getPropertiesV2(props.properties)
    const settings = getSettingsV2(props.settings)

    return <FormatterPricePreview
      value={props.value}
      currency={properties.currency?.value}
      prefix={properties.currency?.prefix}
      suffix={properties.currency?.suffix}
      thousandSeparator={settings.separators?.thousand}
      decimalSeparator={settings.separators?.decimal}
      font={properties.font}
      format={properties.format}
      gridSize={props.gridSize}
    />


  }, [props.gridSize, props.properties, props.settings, props.value])


  return <>
    {isVersionV1(props.settings) && renderVersionV1}
    {isVersionV2(props.settings) && renderVersionV2}
  </>
}

export default ChooserPriceFormat