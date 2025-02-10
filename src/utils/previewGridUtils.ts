import { IPriceBlockFormat, EPositionCurrency, EAlignDecimal } from "../components/types"
import { cleanAndSplitPrice } from "./priceUtils"

enum EComponents {
  PREFIX = 'prefix',
  CURRENCY = 'currency',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  SUFFIX = 'suffix',
}

enum ESubComponents {
  CURRENCY = 'currency',
  DECIMAL = 'decimal',
}
type IColPosition = Record<EComponents, number>
type ISubColPosition = Record<ESubComponents, number>
type IRowPosition = Record<EComponents, number>
interface IGridInfo {
  rows: number
  columns: number
  componentsListOrder: Array<EComponents | Array<EComponents>>
  colPosition: IColPosition
  rowPosition: IRowPosition
  splitDecimal: boolean
  colSubPosition: ISubColPosition
}

const isRenderDecimalCheck = (value?: number | string, hideDecimalsForInteger?: boolean) => {
  const valueString = cleanAndSplitPrice(value)
  const decimalValue = valueString?.[1]
  const isInteger = decimalValue && parseInt(decimalValue) == 0
  const isRenderDecimal = ((isInteger && !hideDecimalsForInteger) || !isInteger) && decimalValue
  return Boolean(isRenderDecimal)
}

const getGridInfoColumns = (grid: IGridInfo, value?: number | string, prefix?: string, suffix?: string, format?: IPriceBlockFormat) => {
  const isRenderDecimal = isRenderDecimalCheck(value, format?.hideDecimalsForInteger)

  if (prefix) {
    grid.columns++
    grid.colPosition.prefix = 1
    grid.componentsListOrder.push(EComponents.PREFIX)
  }

  if (format?.positionCurrency == EPositionCurrency.LEFT) {
    grid.columns++
    grid.colPosition.currency = grid.colPosition.prefix + 1
    grid.componentsListOrder.push(EComponents.CURRENCY)
  }

  grid.columns++
  grid.colPosition.integer = Math.max(grid.colPosition.currency, grid.colPosition.prefix) + 1
  grid.componentsListOrder.push(EComponents.INTEGER)

  if (isRenderDecimal) {
    grid.columns++
    grid.colPosition.decimal = grid.colPosition.integer + 1
    grid.componentsListOrder.push(EComponents.DECIMAL)
  }
  if (format?.positionCurrency && [EPositionCurrency.TOP, EPositionCurrency.BOTTOM].includes(format.positionCurrency)) {
    grid.colPosition.currency = isRenderDecimal ? grid.colPosition.decimal : grid.colPosition.integer + 1
    if (!isRenderDecimal) {
      grid.columns++
      grid.componentsListOrder.push(EComponents.CURRENCY)
    } else {
      grid.componentsListOrder = grid.componentsListOrder.slice(0, -1)
      grid.componentsListOrder.push([EComponents.DECIMAL, EComponents.CURRENCY])
    }
  }

  if (format?.positionCurrency == EPositionCurrency.RIGHT) {
    grid.columns++
    grid.colPosition.currency = Math.max(grid.colPosition.integer, grid.colPosition.decimal) + 1
    grid.componentsListOrder.push(EComponents.CURRENCY)
  }

  if (suffix) {
    grid.columns++
    grid.colPosition.suffix = Math.max(grid.colPosition.integer, grid.colPosition.decimal, grid.colPosition.currency) + 1
    grid.componentsListOrder.push(EComponents.SUFFIX)
  }

  return grid
}

const getGridInfoRows = (grid: IGridInfo, value?: number | string, prefix?: string, suffix?: string, format?: IPriceBlockFormat) => {
  let principalRow = 0,
    secondaryRow = 0

  if (!format?.alignDecimal && format?.positionCurrency == EPositionCurrency.TOP) {
    grid.splitDecimal = false
    grid.rows = 2
    principalRow = 2
    secondaryRow = 1
  } else if (!format?.alignDecimal && format?.positionCurrency == EPositionCurrency.BOTTOM) {
    grid.splitDecimal = false
    grid.rows = 2
    principalRow = 1
    secondaryRow = 2
  } else if (format?.alignDecimal == EAlignDecimal.TOP && format?.positionCurrency == EPositionCurrency.TOP) {
    grid.splitDecimal = false
    grid.rows = 2
    principalRow = 2
    secondaryRow = 1
  } else if (format?.alignDecimal == EAlignDecimal.BOTTOM && format?.positionCurrency == EPositionCurrency.BOTTOM) {
    grid.splitDecimal = false
    grid.rows = 2
    principalRow = 1
    secondaryRow = 2
  } else {
    grid.splitDecimal = true
    grid.rows = 1
    principalRow = 1
    secondaryRow = 1

    if (format?.alignDecimal == EAlignDecimal.TOP) {
      grid.colSubPosition[ESubComponents.DECIMAL] = 1
    } else if (format?.alignDecimal == EAlignDecimal.CENTER) {
      grid.colSubPosition[ESubComponents.DECIMAL] = 2
    } else if (format?.alignDecimal == EAlignDecimal.BOTTOM) {
      grid.colSubPosition[ESubComponents.DECIMAL] = 3
    }

    if (format?.positionCurrency == EPositionCurrency.TOP) {
      grid.colSubPosition[ESubComponents.CURRENCY] = 1
    } else if (format?.positionCurrency == EPositionCurrency.BOTTOM) {
      grid.colSubPosition[ESubComponents.CURRENCY] = 3
    }
  }

  if (prefix) {
    grid.rowPosition[EComponents.PREFIX] = principalRow
  }

  if (format?.positionCurrency == EPositionCurrency.LEFT) {
    grid.rowPosition[EComponents.CURRENCY] = principalRow
  }

  grid.rowPosition[EComponents.INTEGER] = principalRow

  const isRenderDecimal = isRenderDecimalCheck(value, format?.hideDecimalsForInteger)
  if (isRenderDecimal) {
    grid.rowPosition[EComponents.DECIMAL] = principalRow
    grid.rowPosition[EComponents.CURRENCY] = secondaryRow
  }

  if (format?.positionCurrency == EPositionCurrency.RIGHT) {
    grid.rowPosition[EComponents.CURRENCY] = principalRow
  }

  if (suffix) {
    grid.rowPosition[EComponents.SUFFIX] = principalRow
  }

  return grid
}

const getGridInfo = (value?: number | string, prefix?: string, suffix?: string, format?: IPriceBlockFormat) => {
  let grid: IGridInfo = {
    rows: 0,
    columns: 0, //integer block
    componentsListOrder: [],
    splitDecimal: false,
    colPosition: {
      prefix: 0,
      currency: 0,
      integer: 0,
      decimal: 0,
      suffix: 0,
    },
    rowPosition: {
      prefix: 0,
      currency: 0,
      integer: 0,
      decimal: 0,
      suffix: 0,
    },
    colSubPosition: {
      currency: 0,
      decimal: 0,
    },
  }

  grid = getGridInfoColumns({ ...grid }, value, prefix, suffix, format)
  grid = getGridInfoRows({ ...grid }, value, prefix, suffix, format)
  return grid
}

export { getGridInfo, isRenderDecimalCheck, EComponents, ESubComponents }
export type { IGridInfo }
