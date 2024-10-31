import classNames from "classnames";
import type { CSSProperties } from "react";
import type { SeparateNumberCurrencyPosition } from "./types";

type SeparateNumberClasses = {
  containerClass?: string;
  integerClass?: string;
  decimalClass?: string;
};

type SeparateNumberStyles = {
  containerStyle?: CSSProperties | undefined;
  integerStyle?: CSSProperties | undefined;
  decimalStyle?: CSSProperties | undefined;
  decimalContainerStyle?: CSSProperties | undefined;
  currencyStyle?: CSSProperties | undefined;
};

type ISeparateNumberProps = {
  value?: number;
  classes?: SeparateNumberClasses;
  fontSize?: string;
  styles?: SeparateNumberStyles;
  currencyPosition?: SeparateNumberCurrencyPosition;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
  currency?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
  showCurrency?: boolean;
};

const SeparateNumber = ({
  value = 0.0,
  styles,
  classes,
  onClick,
  currencyPosition = "right",
  currency = "€",
  decimalSeparator = ",",
  thousandSeparator = ".",
  showCurrency = true
}: ISeparateNumberProps) => {
  const containerClass = classNames(classes?.containerClass, "flex");
  /* We need to create an hook */
  const valueString = value.toLocaleString("it-IT", { minimumIntegerDigits: 1, minimumFractionDigits: 2 }).split(decimalSeparator);
  const integerPart = valueString[0]?.replace(".", thousandSeparator);
  const decimalPart = valueString[1];

  return (
    <div className={containerClass} onClick={onClick}>
      {currencyPosition === "left" && (
        <div className="mr-1" style={styles?.currencyStyle}>
          {currency}
        </div>
      )}
      <div style={styles?.integerStyle}>
        {integerPart}
        {decimalPart && decimalSeparator}
      </div>

      <div style={styles?.decimalContainerStyle} className={classes?.decimalClass}>
        {decimalPart ? <div style={styles?.decimalStyle}>{decimalPart}</div> : <span />}
        {showCurrency && currencyPosition !== "left" && <div style={styles?.currencyStyle}>{currency}</div>}
      </div>
    </div>
  );
};

export { SeparateNumber };
