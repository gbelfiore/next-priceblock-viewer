import style from './FormatterPricePreview.module.css'
import PrefixPreview from './PrefixPreview'
import type { ReactNode } from 'react'
import { useCallback, useMemo } from 'react'
import SuffixPreview from './SuffixPreview'
import IntegerPreview from './IntegerPreview'
import CurrencyPreview from './CurrencyPreview'
import DecimalPreview from './DecimalPreview'
import { cleanAndSplitPrice } from '../../utils/priceUtils'
import { IPriceBlockFont, IPriceBlockFormat } from '../types/types'
import { isRenderDecimalCheck, getGridInfo, EComponents, ESubComponents } from '../../utils/previewGridUtils'

interface IFormatterPricePreviewProps {
  value?: number | string
  currency?: string
  prefix?: string
  suffix?: string
  thousandSeparator?: string
  decimalSeparator?: string
  font?: IPriceBlockFont
  format?: IPriceBlockFormat
  gridSize: number;
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
  gridSize
}: IFormatterPricePreviewProps) => {
  const valueString = cleanAndSplitPrice(value)
  const isRenderDecimal = isRenderDecimalCheck(value, format?.hideDecimalsForInteger)

  const gridInfo = useMemo(() => getGridInfo(value, prefix, suffix, format), [format, prefix, suffix, value])

  const elementsRow = Array.from({ length: gridInfo.rows }, (_, i) => i + 1)
  const elementsSubRow = Array.from({ length: 3 }, (_, i) => i + 1)

  const getComponents = useCallback(
    (key: EComponents | ESubComponents) => {
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
        return <DecimalPreview value={valueString?.[1]} decimalSeparator={decimalSeparator} font={font} format={format} gridSize={gridSize}
        />
      else if (key == EComponents.SUFFIX) return <SuffixPreview value={suffix} font={font} format={format} gridSize={gridSize}
      />
    },
    [currency, decimalSeparator, font, format, gridSize, isRenderDecimal, prefix, suffix, thousandSeparator, valueString]
  )

  const renderCells = useCallback(() => {
    const cells: Array<ReactNode> = []

    gridInfo.componentsListOrder.forEach((key) => {
      elementsRow.forEach((row) => {
        if (Array.isArray(key)) {
          if (gridInfo.splitDecimal) {
            cells.push(
              <div key={`split_cell_${key}_${row}`} className={style.subCell}>
                {elementsSubRow.map((subRow) => {
                  const isDecimal = gridInfo.colSubPosition[ESubComponents.DECIMAL] == subRow
                  const isCurrency = gridInfo.colSubPosition[ESubComponents.CURRENCY] == subRow
                  const isEmpty = !isCurrency && !isDecimal //&& gridInfo.colSubPosition[ESubComponents.DECIMAL] == 2
                  return (
                    <>
                      {isCurrency && getComponents(ESubComponents.CURRENCY)}
                      {isDecimal && getComponents(ESubComponents.DECIMAL)}
                      {isEmpty && <div className={style.subCellEmpty}></div>}
                    </>
                  )
                })}
              </div>
            )
          } else {
            key.forEach((subKey) => {
              if (gridInfo.rowPosition[subKey] == row) {
                cells.push(
                  <div key={`sub_element_${subKey}_${row}`} className={style.cell}>
                    {getComponents(subKey)}
                  </div>
                )
              }
            })
          }
        } else {
          if (gridInfo.rowPosition[key] == row) {
            cells.push(
              <div key={`single_element_${key}_${row}`} className={style.cell}>
                {getComponents(key)}
                {/* {key}-{row} */}
              </div>
            )
          } else {
            cells.push(<div key={`single_element_empty_${key}_${row}`} className={style.cell}></div>)
          }
        }
      })
    })

    return cells
  }, [elementsRow, elementsSubRow, getComponents, gridInfo.colSubPosition, gridInfo.componentsListOrder, gridInfo.rowPosition, gridInfo.splitDecimal])

  return (
    <div
      className={style.formatterPricePreview}
      style={{ gridTemplateColumns: `repeat(${gridInfo.columns}, auto)`, gridTemplateRows: `repeat(${gridInfo.rows}, auto)` }}
    >
      {renderCells()}
    </div>
  )
}
export default FormatterPricePreview
