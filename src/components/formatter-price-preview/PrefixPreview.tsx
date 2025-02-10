import { useMemo } from 'react'
import style from './FormatterPricePreview.module.css'
import classNames from 'classnames'
import useFontStyle from '../../hooks/useFontStyle'
import { IPriceBlockFont, IPriceBlockFormat, EAlignPrefix } from '../types'

interface IPrefixPreviewProps {
  value?: string
  font?: IPriceBlockFont
  format?: IPriceBlockFormat
  gridSize: number;
}

const PrefixPreview = ({ value, font, format,gridSize }: IPrefixPreviewProps) => {
  const fontStyle = useFontStyle({ font: font, specializations: font?.prefixStyles,gridSize})

  const getPosition = useMemo(() => {
    if (format?.alignPrefix == EAlignPrefix.TOP) {
      return 'justify-start'
    } else if (format?.alignPrefix == EAlignPrefix.CENTER) {
      return 'justify-center'
    } else if (format?.alignPrefix == EAlignPrefix.BOTTOM) {
      return 'justify-end'
    }

    return 'justify-center'
  }, [format?.alignPrefix])

  return (
    <div className={classNames(style.prefixPreview, getPosition)} style={fontStyle}>
      {value}
    </div>
  )
}

export default PrefixPreview
