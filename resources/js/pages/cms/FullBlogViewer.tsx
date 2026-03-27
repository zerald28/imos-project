'use client';
import React from 'react';


interface FullBlogViewerProps {
  content?: string | any | null;
}

export default function FullBlogViewer({ content }: FullBlogViewerProps) {
  let blocks: any[] = [];

  if (!content) return <p>No content available.</p>;

  if (typeof content === 'string') {
    try {
      blocks = JSON.parse(content);
    } catch (e) {
      console.error('Invalid JSON content', e);
      return <p className="text-red-600">Error: Invalid blog content</p>;
    }
  } else if (Array.isArray(content)) {
    blocks = content;
  } else {
    console.error('Unsupported content format', content);
    return <p className="text-red-600">Error: Unsupported content format</p>;
  }

  const renderText = (child: any) => {
    const style: React.CSSProperties = {
      fontWeight: child.bold ? 'bold' : undefined,
      fontStyle: child.italic ? 'italic' : undefined,
      textDecoration: `${child.underline ? 'underline ' : ''}${child.strikethrough ? 'line-through' : ''}`.trim() || undefined,
      fontSize: child.fontSize || undefined,
      color: child.color || undefined,
      backgroundColor: child.backgroundColor || undefined,
    };
    return <span key={child.id || Math.random()} style={style}>{child.text}</span>;
  };

  const renderList = (block: any) => {
    // Determine list type
    let listStyleType: React.CSSProperties['listStyleType'] = 'disc';
    switch (block.listStyleType) {
      case 'decimal': listStyleType = 'decimal'; break;
      case 'lower-alpha': listStyleType = 'lower-alpha'; break;
      case 'upper-alpha': listStyleType = 'upper-alpha'; break;
      case 'lower-roman': listStyleType = 'lower-roman'; break;
      case 'upper-roman': listStyleType = 'upper-roman'; break;
      case 'disc': listStyleType = 'disc'; break;
      case 'circle': listStyleType = 'circle'; break;
      case 'square': listStyleType = 'square'; break;
      default: listStyleType = 'disc';
    }

    // Decide tag
    const isOrdered = ['decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'].includes(listStyleType);
    const ListTag = isOrdered ? 'ol' : 'ul';

    return (
      <ListTag
        key={block.id || Math.random()}
        start={block.listStart}
        style={{
          marginLeft: (block.indent || 0) * 20 + (block.marginLeft || 0),
          textAlign: block.align || 'left',
          listStyleType,
        }}
      >
        {block.children?.map((child: any) => (
          <li key={child.id || Math.random()}>
            {child.children?.map(renderText) || renderText(child)}
          </li>
        ))}
      </ListTag>
    );
  };

  const renderBlock = (block: any, index: number) => {
    const blockStyle: React.CSSProperties = {
      textAlign: block.align || 'left',
      marginLeft: block.marginLeft || 0,
    };

    switch (block.type) {
      case 'p':
        if (block.listStyleType) return renderList(block);

        return (
          <p key={block.id || index} style={{ ...blockStyle, marginLeft: (block.indent || 0) * 20 }}>
            {block.children?.map(renderText)}
          </p>
        );

      case 'table':
        return (
          <table
            key={block.id || index}
            className="border-collapse border border-gray-300 mb-4"
            style={{ marginLeft: block.marginLeft || 0, width: '100%' }}
          >
            <tbody>
              {block.children?.map((row: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.children?.map((cell: any, cellIndex: number) => {
  // Determine if the cell is empty
  const hasContent =
    cell.children?.some((c: any) =>
      c.children?.some((gc: any) => gc.text?.trim() !== '')
    );

  return (
    <td
      key={cellIndex}
      className="border border-gray-300 p-1"
      style={{
        backgroundColor: cell.background || undefined,
        textAlign: cell.align || 'center',
        width: block.colSizes ? block.colSizes[cellIndex] : undefined,
        borderTop: cell.borders?.top ? `${cell.borders.top.size}px solid black` : undefined,
        borderBottom: cell.borders?.bottom ? `${cell.borders.bottom.size}px solid black` : undefined,
        borderLeft: cell.borders?.left ? `${cell.borders.left.size}px solid black` : undefined,
        borderRight: cell.borders?.right ? `${cell.borders.right.size}px solid black` : undefined,
        minHeight: hasContent ? undefined : 40, // default height for empty cells
      }}
    >
      {cell.children?.map((c: any) => {
        if (c.type === 'p') {
          if (c.listStyleType) return renderList(c);

          const pHasContent = c.children?.some((gc: any) => gc.text?.trim() !== '');

          return (
            <div
              key={c.id}
              style={{
                textAlign: c.align || 'center',
                marginLeft: (c.indent || 0) * 20,
                minHeight: pHasContent ? undefined : 40, // default height if paragraph is empty
              }}
            >
              {c.children?.map(renderText) || <>&nbsp;</>}
            </div>
          );
        }
        return renderText(c) || <>&nbsp;</>;
      }) || <>&nbsp;</>}
    </td>
  );
})}

                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return <div key={block.id || index}>Unsupported block type: {block.type}</div>;
    }
  };

  return <div className="max-w-4xl mx-auto py-10">{blocks.map(renderBlock)}</div>;
}
