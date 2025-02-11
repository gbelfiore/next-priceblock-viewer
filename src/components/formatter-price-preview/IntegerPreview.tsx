import { useMemo } from 'react'
import style from './FormatterPricePreview.module.css'
import useFontStyle from '../../hooks/useFontStyle'
import { IPriceBlockFont, ESeparator, typesV2 } from '../types/types'

interface IIntegerPreviewProps {
  value?: string
  thousandSeparator?: string
  decimalSeparator?: string
  font?: IPriceBlockFont
  format?: typesV2.IPriceBlockFormat
  isRenderDecimal?: boolean
  gridSize: number;
}

const IntegerPreview = ({ value, thousandSeparator, decimalSeparator, font, format, isRenderDecimal = true, gridSize }: IIntegerPreviewProps) => {
  const fontStyle = useFontStyle({ font: font, specializations: font?.integerStyles, gridSize })

  const getIntegerValue = useMemo(() => {
    let integer = value ?? ''
    if (thousandSeparator) {
      integer = integer?.replaceAll('.', thousandSeparator)
    }

    if (format?.separator == ESeparator.INTEGER && decimalSeparator) {
      integer += isRenderDecimal ? decimalSeparator : ''
    }
    return integer
  }, [decimalSeparator, format?.separator, isRenderDecimal, thousandSeparator, value])

  return (
    <div className={style.integerPreview} style={fontStyle}>
      {getIntegerValue}
    </div>
  )
}

export default IntegerPreview
