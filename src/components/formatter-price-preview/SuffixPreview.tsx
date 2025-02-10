import { useMemo } from 'react'
import style from './FormatterPricePreview.module.css'
import classNames from 'classnames'
import useFontStyle from '../../hooks/useFontStyle'
import { IPriceBlockFont, IPriceBlockFormat, EAlignSuffix } from '../types'

interface ISuffixPreviewProps {
  value?: string
  font?: IPriceBlockFont
  format?: IPriceBlockFormat
  gridSize: number;

}

const SuffixPreview = ({ value, font, format,gridSize}: ISuffixPreviewProps) => {
  const fontStyle = useFontStyle({ font: font, specializations: font?.suffixStyles,gridSize})

  const getPosition = useMemo(() => {
    if (format?.alignSuffix == EAlignSuffix.TOP) {
      return 'justify-start'
    } else if (format?.alignSuffix == EAlignSuffix.CENTER) {
      return 'justify-center'
    } else if (format?.alignSuffix == EAlignSuffix.BOTTOM) {
      return 'justify-end'
    }

    return 'justify-center'
  }, [format?.alignSuffix])

  return (
    <div className={classNames(style.suffixPreview, getPosition)} style={fontStyle}>
      {value}
    </div>
  )
}

export default SuffixPreview
