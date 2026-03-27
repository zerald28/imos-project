'use client';
import type { PlateEditor } from 'platejs/react';
import { insertCodeBlock, toggleCodeBlock } from '@platejs/code-block';
import { insertColumnGroup, toggleColumnGroup } from '@platejs/layout';
import { KEYS, type NodeEntry, type TElement, PathApi } from 'platejs';

// Minimal insertBlockMap
const insertBlockMap: Record<string, (editor: PlateEditor, type: string) => void> = {
  [KEYS.codeBlock]: (editor) => insertCodeBlock(editor, { select: true }),
  [KEYS.ol]: (editor) => editor.tf.insertNodes(editor.api.create.block({ type: KEYS.ol }), { select: true }),
  [KEYS.ul]: (editor) => editor.tf.insertNodes(editor.api.create.block({ type: KEYS.ul }), { select: true }),
  ['action_three_columns']: (editor) => insertColumnGroup(editor, { columns: 3, select: true }),
};

export const getBlockType = (block: TElement) => {
  if (block[KEYS.listType]) return block[KEYS.listType];
  return block.type;
};

export const setBlockType = (editor: PlateEditor, type: string) => {
  const entries = editor.api.blocks({ mode: 'lowest' });
  entries.forEach(([node, path]) => {
    if (node.type !== type) editor.tf.setNodes({ type }, { at: path });
  });
};
