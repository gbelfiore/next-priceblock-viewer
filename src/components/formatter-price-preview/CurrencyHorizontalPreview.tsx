import { useMemo } from 'react'
import style from './FormatterPricePreview.module.css'
import classNames from 'classnames'
import useFontStyle from '../../hooks/useFontStyle'
import { IPriceBlockFont, EAlignCurrency, typesV2 } from '../types/types'

interface ICurrencyHorizontalPreviewProps {
  value?: string
  textStyle?: IPriceBlockFont
  formatStyle?: typesV2.IPriceBlockFormat
  gridSize: number;

}

const CurrencyHorizontalPreview = ({ value, textStyle, formatStyle, gridSize }: ICurrencyHorizontalPreviewProps) => {
  const fontStyle = useFontStyle({ font: textStyle, specializations: textStyle?.currencyStyles, gridSize })

  const getPosition = useMemo(() => {
    if (formatStyle?.alignCurrency == EAlignCurrency.LEFT) {
      return 'justify-start'
    } else if (formatStyle?.alignCurrency == EAlignCurrency.CENTER_HORIZONTAL) {
      return 'justify-center'
    } else if (formatStyle?.alignCurrency == EAlignCurrency.RIGHT) {
      return 'justify-end'
    }
    return 'justify-center'
  }, [formatStyle?.alignCurrency])

  return (
    <div className={classNames(style.currencyHorizontalPreview, getPosition)} style={fontStyle}>
      {value}
    </div>
  )
}

export default CurrencyHorizontalPreview
