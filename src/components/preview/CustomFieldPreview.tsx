import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { ICustomFieldProperties, IGenericPreviewProps, IPriceBlockElement } from '../types/types';
import { usePriceBlockStore } from '../../zustand/price-block-store';
import CrossedLine from '../CrossedLine';

const CustomFieldPreview = ({ priceBlockKey, priceBlockElementKey }: IGenericPreviewProps) => {
  const refCrossedLine = useRef<HTMLDivElement>(null);
  const refComponent = useRef<HTMLDivElement>(null);

  const priceBlockComp = usePriceBlockStore((state) => state.dataComp[priceBlockKey]);
  const basePath = priceBlockComp?.priceBlock.basePath;

  const gridSize = priceBlockComp?.gridSize;
  const { priceBlock } = priceBlockComp;
  const { properties } = priceBlock.jsonConf.priceBlockElements[priceBlockElementKey] as IPriceBlockElement<ICustomFieldProperties>;
  const boxStyle = useBoxStyle({ basePath, gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const currentCustomField = usePriceBlockStore((state) => state.actions.getCurrentCustomField(priceBlockKey, priceBlockElementKey));

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  useEffect(() => {
    let widthCrossedLine = '100%';

    if (refComponent.current) {
      if (refCrossedLine.current) {
        widthCrossedLine = refComponent.current.offsetWidth ? `${refComponent.current.offsetWidth}px` : '100%';
      }

      if (refCrossedLine.current) {
        refCrossedLine.current.style.width = widthCrossedLine;
      }
    }
  }, [properties.font.size, properties.strikethrough]);

  if (!currentCustomField?.value || currentCustomField.value.length === 0) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center', { relative: properties.strikethrough })} style={getStyle}>
      <CrossedLine ref={refCrossedLine} font={properties.font} strikethrough={properties.strikethrough} gridSize={gridSize} />
      <div ref={refComponent} dangerouslySetInnerHTML={{ __html: currentCustomField.value }} />
    </div>
  );
};

export default CustomFieldPreview;
