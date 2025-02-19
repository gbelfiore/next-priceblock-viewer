import { useMemo } from "react";
import { getPropertiesV2, isVersionV2 } from "../../utils/VersionUtilis";
import { IDiscountedProperties, IDiscountProperties, IFullPriceProperties, IPriceBlockSettings } from "../types/types";
import CrossedLine from "../CrossedLine";

interface IChooserCrossedLineProps {
  settings: IPriceBlockSettings
  properties: IFullPriceProperties | IDiscountProperties | IDiscountedProperties
}

const ChooserCrossedLine = (props: IChooserCrossedLineProps) => {
  const renderVersionV2 = useMemo(() => {
    const properties = getPropertiesV2(props.properties)
    return <CrossedLine font={properties.font} strikethrough={properties?.strikethrough} />
  }, [props.properties])


  return <>
    {isVersionV2(props.settings) && renderVersionV2}
  </>
}

export default ChooserCrossedLine