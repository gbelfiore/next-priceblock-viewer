import { useMemo } from 'react'
import style from './FormatterPricePreview.module.css'
import classNames from 'classnames'
import useFontStyle from '../../hooks/useFontStyle'
import { IPriceBlockFont, EPositionCurrency, EAlignCurrency, typesV2 } from '../types/types'
import useVerticalOffset from '../../hooks/useVerticaloffset'

interface ICurrencyPreviewProps {
  value?: string
  font?: IPriceBlockFont
  format?: typesV2.IPriceBlockFormat
  gridSize: number;

}

const CurrencyPreview = ({ value, font, format, gridSize }: ICurrencyPreviewProps) => {
  const fontStyle = useFontStyle({ font: font, specializations: font?.currencyStyles, gridSize })
  const marginStyle = useVerticalOffset({ gridSize, verticalOffset: font?.currencyStyles?.verticalOffset })

  const getPosition = useMemo(() => {
    if (format?.positionCurrency && [EPositionCurrency.LEFT, EPositionCurrency.RIGHT].includes(format.positionCurrency)) {
      if (format?.alignCurrency == EAlignCurrency.TOP) {
        return 'justify-start'
      } else if (format?.alignCurrency == EAlignCurrency.CENTER_VERTICAL) {
        return 'justify-center'
      } else if (format?.alignCurrency == EAlignCurrency.BOTTOM) {
        return 'justify-end'
      }
      return 'justify-center'
    } else if (format?.positionCurrency && [EPositionCurrency.TOP, EPositionCurrency.BOTTOM].includes(format.positionCurrency)) {
      const className = []
      if (format?.positionCurrency == EPositionCurrency.TOP) {
        className.push('justify-start')
      } else if (format?.positionCurrency == EPositionCurrency.BOTTOM) {
        className.push('justify-end')
      }
      if (format?.alignCurrency == EAlignCurrency.LEFT) {
        className.push('items-start')
      } else if (format?.alignCurrency == EAlignCurrency.CENTER_HORIZONTAL) {
        className.push('items-center')
      } else if (format?.alignCurrency == EAlignCurrency.RIGHT) {
        className.push('items-end')
      }
      return className.length > 0 ? className.join(' ') : 'items-center'
    }
  }, [format?.alignCurrency, format?.positionCurrency])

  return (
    <div className={classNames(style.currencyPreview, getPosition)} style={{ ...fontStyle, ...marginStyle }}>
      {value}
    </div>
  )
}

export default CurrencyPreview
