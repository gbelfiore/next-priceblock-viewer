import style from './FormatterPricePreview.module.css'
import PrefixPreview from './PrefixPreview'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import SuffixPreview from './SuffixPreview'
import IntegerPreview from './IntegerPreview'
import CurrencyPreview from './CurrencyPreview'
import DecimalPreview from './DecimalPreview'
import { cleanAndSplitPrice } from '../../utils/priceUtils'
import { EPositionCurrency, IPriceBlockFont, IStrikethrough, typesV2 } from '../types/types'
import { isRenderDecimalCheck, getGridInfo, EComponents, IColPosition, IRowPosition } from '../../utils/previewGridUtils'
import CrossedLine from '../CrossedLine'


const foundElements = (obj: IColPosition | IRowPosition, value: number): string[] => {
  const keys = Object.keys(obj);
  return keys.filter((key) => obj[key as EComponents] === value);
};


interface IFormatterPricePreviewProps {
  value?: number | string
  currency?: string
  prefix?: string
  suffix?: string
  thousandSeparator?: string
  decimalSeparator?: string
  font?: IPriceBlockFont
  format?: typesV2.IPriceBlockFormat
  gridSize: number;
  strikethrough?: IStrikethrough

}

const FormatterPricePreview = ({
  value,
  currency,
  prefix,
  suffix,
  thousandSeparator,
  decimalSeparator,
  font,
  format,
  gridSize,
  strikethrough
}: IFormatterPricePreviewProps) => {
  const valueString = cleanAndSplitPrice(value)
  const isRenderDecimal = isRenderDecimalCheck(value, format?.hideDecimalsForInteger)

  const gridInfo = useMemo(() => getGridInfo(value, prefix, suffix, format), [format, prefix, suffix, value])

  const refGrid = useRef<HTMLDivElement>(null)
  const refEmptyCell = useRef<HTMLDivElement>(null)
  const refCrossedLine = useRef<HTMLDivElement>(null)


  const getComponents = useCallback(
    (key: EComponents) => {
      if (key == EComponents.PREFIX) return <PrefixPreview value={prefix} font={font} format={format} gridSize={gridSize} />
      else if (key == EComponents.CURRENCY) return <CurrencyPreview value={currency} font={font} format={format} gridSize={gridSize} />
      else if (key == EComponents.INTEGER)
        return (
          <IntegerPreview
            value={valueString?.[0]}
            decimalSeparator={decimalSeparator}
            thousandSeparator={thousandSeparator}
            font={font}
            format={format}
            isRenderDecimal={isRenderDecimal}
            gridSize={gridSize}
          />
        )
      else if (key == EComponents.DECIMAL)
        return <DecimalPreview value={valueString?.[1]} decimalSeparator={decimalSeparator} font={font} format={format} gridSize={gridSize} />
      else if (key == EComponents.SUFFIX) return <SuffixPreview value={suffix} font={font} format={format} gridSize={gridSize} />
    },
    [currency, decimalSeparator, font, format, gridSize, isRenderDecimal, prefix, suffix, thousandSeparator, valueString]
  )

  const renderCells = useCallback(() => {
    const elementsRow = Array.from({ length: gridInfo.rows }, (_, i) => i + 1)
    const elementsCol = Array.from({ length: gridInfo.columns }, (_, i) => i + 1)

    const cells: Array<ReactNode> = []

    elementsCol.forEach(col => {
      elementsRow.forEach(row => {
        const elementsCol = foundElements(gridInfo.colPosition, col)
        const elementsRow = foundElements(gridInfo.rowPosition, row)
        const commonElements = elementsCol.filter(value => elementsRow.includes(value));
        if (commonElements.length == 1) {
          cells.push(<div key={`single_element_${col}_${row}`} className={style.cell}>
            {getComponents(commonElements[0] as EComponents)}
          </div>)
        } else {
          cells.push(<div ref={refEmptyCell} key={`single_element_${col}_${row}`} className={style.cell}></div>)
        }

      })
    })
    return cells
  }, [getComponents, gridInfo.colPosition, gridInfo.columns, gridInfo.rowPosition, gridInfo.rows])

  useEffect(() => {
    let top = '0px', topCrossedLine = '50%', widthCrossedLine = '100%', position = 'unset'
    if (refGrid.current) {
      if (refEmptyCell.current) {

        if (format?.positionCurrency && [EPositionCurrency.TOP, EPositionCurrency.BOTTOM].includes(format.positionCurrency)) {
          const height = refEmptyCell.current.offsetHeight
          const offset = ((format.positionCurrency == EPositionCurrency.BOTTOM ? 1 : -1) * height / 2)
          top = `${offset}px`
          position = 'relative'
          topCrossedLine = (format.positionCurrency == EPositionCurrency.BOTTOM ? '25%' : '75%')

        } else {
          top = `0px`
          position = 'unset'
          topCrossedLine = '50%'
        }
      }

      if (refCrossedLine.current) {
        widthCrossedLine = refGrid.current.offsetWidth ? `${refGrid.current.offsetWidth}px` : '100%'
      }

      refGrid.current.style.top = top
      refGrid.current.style.position = position
      if (refCrossedLine.current) {
        refCrossedLine.current.style.width = widthCrossedLine
        refCrossedLine.current.style.top = topCrossedLine
      }

    }
    //important deps format?.positionCurrency, font?.size, font?.currencyStyles?.size, strikethrough
  }, [format?.positionCurrency, font?.size, font?.currencyStyles?.size, strikethrough])

  return (
    <div
      className={style.formatterPricePreview}
      style={{ gridTemplateColumns: `repeat(${gridInfo.columns}, auto)`, gridTemplateRows: `repeat(${gridInfo.rows}, auto)` }}
      ref={refGrid}
    >
      <CrossedLine ref={refCrossedLine} font={font} strikethrough={strikethrough} />
      {renderCells()}
    </div >
  )
}
export default FormatterPricePreview
