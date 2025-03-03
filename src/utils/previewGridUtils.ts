import { EPositionCurrency, typesV2 } from '../components/types/types';
import { cleanAndSplitPrice } from './priceUtils';

enum EComponents {
  PREFIX = 'prefix',
  CURRENCY = 'currency',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  SUFFIX = 'suffix',
}

type IColPosition = Record<EComponents, number>;
type IRowPosition = Record<EComponents, number>;
interface IGridInfo {
  rows: number;
  columns: number;
  colPosition: IColPosition;
  rowPosition: IRowPosition;
}

const isRenderDecimalCheck = (value?: number | string, hideDecimalsForInteger?: boolean) => {
  const valueString = cleanAndSplitPrice(value);
  const decimalValue = valueString?.[1];
  const isInteger = decimalValue && parseInt(decimalValue) == 0;
  const isRenderDecimal = ((isInteger && !hideDecimalsForInteger) || !isInteger) && decimalValue;
  return Boolean(isRenderDecimal);
};

const getGridInfoColumns = (grid: IGridInfo, value?: number | string, prefix?: string, suffix?: string, format?: typesV2.IPriceBlockFormat) => {
  const isRenderDecimal = isRenderDecimalCheck(value, format?.hideDecimalsForInteger);

  if (prefix) {
    grid.columns++;
    grid.colPosition.prefix = 1;
  }

  if (format?.positionCurrency == EPositionCurrency.LEFT) {
    grid.columns++;
    grid.colPosition.currency = grid.colPosition.prefix + 1;
  }

  grid.columns++;
  grid.colPosition.integer = Math.max(grid.colPosition.currency, grid.colPosition.prefix) + 1;

  if (isRenderDecimal) {
    grid.columns++;
    grid.colPosition.decimal = grid.colPosition.integer + 1;
  }

  if (format?.positionCurrency && [EPositionCurrency.TOP, EPositionCurrency.BOTTOM].includes(format.positionCurrency)) {
    if (!isRenderDecimal) {
      grid.colPosition.currency = grid.colPosition.integer + 1;
      grid.columns++;
    } else {
      grid.colPosition.currency = grid.colPosition.decimal;
    }
  }

  if (format?.positionCurrency == EPositionCurrency.RIGHT) {
    grid.columns++;
    grid.colPosition.currency = Math.max(grid.colPosition.integer, grid.colPosition.decimal) + 1;
  }

  if (suffix) {
    grid.columns++;
    grid.colPosition.suffix = Math.max(grid.colPosition.integer, grid.colPosition.decimal, grid.colPosition.currency) + 1;
  }

  return grid;
};

const getGridInfoRows = (grid: IGridInfo, value?: number | string, prefix?: string, suffix?: string, format?: typesV2.IPriceBlockFormat) => {
  let principalRow = 0,
    secondaryRow = 0;

  const isRenderDecimal = isRenderDecimalCheck(value, format?.hideDecimalsForInteger);

  if (isRenderDecimal && format?.positionCurrency == EPositionCurrency.TOP) {
    grid.rows = 2;
    principalRow = 2;
    secondaryRow = 1;
  } else if (isRenderDecimal && format?.positionCurrency == EPositionCurrency.BOTTOM) {
    grid.rows = 2;
    principalRow = 1;
    secondaryRow = 2;
  } else {
    grid.rows = 1;
    principalRow = 1;
    secondaryRow = 1;
  }

  if (prefix) {
    grid.rowPosition.prefix = principalRow;
  }

  if (format?.positionCurrency == EPositionCurrency.LEFT) {
    grid.rowPosition.currency = principalRow;
  } else if (format?.positionCurrency == EPositionCurrency.RIGHT) {
    grid.rowPosition.currency = principalRow;
  } else {
    grid.rowPosition.currency = secondaryRow;
  }

  grid.rowPosition.integer = principalRow;

  if (isRenderDecimal) {
    grid.rowPosition.decimal = principalRow;
  }

  if (suffix) {
    grid.rowPosition.suffix = principalRow;
  }

  return grid;
};

const getGridInfo = (value?: number | string, prefix?: string, suffix?: string, format?: typesV2.IPriceBlockFormat) => {
  let grid: IGridInfo = {
    rows: 0,
    columns: 0,
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
  };

  grid = getGridInfoColumns({ ...grid }, value, prefix, suffix, format);
  grid = getGridInfoRows({ ...grid }, value, prefix, suffix, format);
  return grid;
};

export { getGridInfo, isRenderDecimalCheck, EComponents };
export type { IGridInfo, IColPosition, IRowPosition };
