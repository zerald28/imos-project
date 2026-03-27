'use client';

import { BaseTablePlugin } from '@platejs/table';
import type { TTableCellElement, TTableElement } from 'platejs';
import type { SlateElementProps } from 'platejs/static';
import { SlateElement } from 'platejs/static';
import { cn } from '@/lib/utils';

const DEFAULT_CELL_HEIGHT = 40; // default height for empty cells
const DEFAULT_CELL_WIDTH = 120;

// Plate JSON node type
interface PlateNode {
  type: string;
  children?: PlateNode[];
  text?: string | null;
  [key: string]: any; // extra fields (borders, id, etc.)
}

export function TableElementStatic({
  children,
  ...props
}: SlateElementProps<TTableElement>) {
  const { disableMarginLeft } = props.editor.getOptions(BaseTablePlugin);
  const marginLeft = disableMarginLeft ? 0 : props.element.marginLeft || 0;

  return (
    <SlateElement
  {...props}
  className="overflow-x-auto py-4 w-full"
  style={{ paddingLeft: marginLeft }}
>
  <div className="relative w-full overflow-x-auto">
    <table className="table-auto border-collapse w-full">
      <tbody>{children}</tbody>
    </table>
  </div>
</SlateElement>

  );
}

export function TableRowElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props} as="tr" className="h-full">
      {props.children}
    </SlateElement>
  );
}

export function TableCellElementStatic({
  isHeader,
  ...props
}: SlateElementProps<TTableCellElement> & { isHeader?: boolean }) {
  const { editor, element } = props;
  const { api } = editor.getPlugin(BaseTablePlugin);

  const borders = api.table.getCellBorders({ element });
  const cellWidth = api.table.getCellSize({ element }).width || DEFAULT_CELL_WIDTH;
  const cellMinHeight = api.table.getCellSize({ element }).minHeight || DEFAULT_CELL_HEIGHT;

  const rowIndex = element.rowIndex ?? 0;
const colIndex = element.colIndex ?? 0;

// default border size fallback for outer edges
const topBorder = rowIndex === 0 ? 1 : borders.top?.size || 0;
const leftBorder = colIndex === 0 ? 1 : borders.left?.size || 0;
const bottomBorder = borders.bottom?.size || 0;
const rightBorder = borders.right?.size || 0;


  // Type-safe hasContent check
  const hasContent =
    (element.children as PlateNode[] | undefined)?.some((p) =>
      (p.children as PlateNode[] | undefined)?.some(
        (c) => c.text && c.text.trim() !== ''
      )
    ) ?? false;

  const minHeight = hasContent ? cellMinHeight : DEFAULT_CELL_HEIGHT;

  return (
  <SlateElement
  {...props}
  as={isHeader ? 'th' : 'td'}
  attributes={{
    ...props.attributes,
    colSpan: api.table.getColSpan(element),
    rowSpan: api.table.getRowSpan(element),
  }}
  className={cn(
    'relative overflow-visible p-4', // padding for content
    isHeader && 'font-semibold text-left',
    borders.top?.size ? 'border-t' : '',
    borders.right?.size ? 'border-r' : '',
    borders.bottom?.size ? 'border-b' : '',
    borders.left?.size ? 'border-l' : ''
  )}
  style={{
  minWidth: cellWidth,
  maxWidth: cellWidth,
  backgroundColor: element.background || undefined,
  borderColor: '#d1d5db',
  borderStyle: 'solid',
  borderWidth: `${topBorder}px ${rightBorder}px ${bottomBorder}px ${leftBorder}px`,
}}

>
  {props.children}
</SlateElement>

);

}

export function TableCellHeaderElementStatic(
  props: SlateElementProps<TTableCellElement>
) {
  return <TableCellElementStatic {...props} isHeader />;
}
