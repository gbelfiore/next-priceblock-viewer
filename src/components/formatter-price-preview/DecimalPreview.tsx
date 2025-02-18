import { useMemo } from 'react'
import style from './FormatterPricePreview.module.css'
import classNames from 'classnames'
import useFontStyle from '../../hooks/useFontStyle'
import { IPriceBlockFont, ESeparator, EAlignDecimal, typesV2 } from '../types/types'
import useVerticalOffset from '../../hooks/useVerticaloffset'

interface IDecimalPreviewProps {
  value?: string
  decimalSeparator?: string
  font?: IPriceBlockFont
  format?: typesV2.IPriceBlockFormat
  gridSize: number
}

const DecimalPreview = ({ value, decimalSeparator, font, format, gridSize }: IDecimalPreviewProps) => {
  const fontStyle = useFontStyle({ font: font, specializations: font?.decimalStyles, gridSize })
  const marginStyle = useVerticalOffset({ gridSize, verticalOffset: font?.decimalStyles?.verticalOffset })

  const isInteger = value && parseInt(value) == 0
  const isRenderDecimal = ((isInteger && !format?.hideDecimalsForInteger) || !isInteger) && value

  const getDecimalValue = useMemo(() => {
    let decimal = value ?? ''

    if (format?.separator == ESeparator.DECIMAL && decimalSeparator) {
      decimal = decimalSeparator + decimal
    }
    return decimal
  }, [decimalSeparator, format?.separator, value])

  const getPosition = useMemo(() => {
    if (format?.alignDecimal == EAlignDecimal.TOP) {
      return 'justify-start'
    } else if (format?.alignDecimal == EAlignDecimal.CENTER) {
      return 'justify-center'
    } else if (format?.alignDecimal == EAlignDecimal.BOTTOM) {
      return 'justify-end'
    }

    return 'justify-center'
  }, [format?.alignDecimal])

  return (
    <div className={classNames(style.decimalPreview, getPosition)} style={{ ...fontStyle, ...marginStyle }}>
      {isRenderDecimal && getDecimalValue}
    </div>
  )
}

export default DecimalPreview
