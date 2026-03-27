'use client';

import { normalizeNodeId } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';

import { BasicNodesKit } from '@/components/basic-nodes-kit';
import { Editor, EditorContainer } from '@/components/ui/editor';

interface PlateEditorProps {
  value?: any;
  onChange?: (value: any) => void;
}

export function PlateEditor({ value: initialValue, onChange }: PlateEditorProps) {
  const editor = usePlateEditor({
    plugins: BasicNodesKit,
    value: initialValue ?? defaultValue, // use default if no initialValue
  });

  return (
    <Plate
      editor={editor}
      onChange={(editorValue) => {
        if (onChange) onChange(editorValue);
      }}
    >
      <EditorContainer>
        <Editor variant="demo" placeholder="Type..." />
      </EditorContainer>
    </Plate>
  );
}

// Default content if no value provided
const defaultValue = normalizeNodeId([
  { children: [{ text: 'Basic Editor' }], type: 'h1' },
  { children: [{ text: 'Heading 2' }], type: 'h2' },
  { children: [{ text: 'Heading 3' }], type: 'h3' },
  { children: [{ text: 'This is a blockquote element' }], type: 'blockquote' },
  {
    children: [
      { text: 'Basic marks: ' },
      { bold: true, text: 'bold' },
      { text: ', ' },
      { italic: true, text: 'italic' },
      { text: ', ' },
      { text: 'underline', underline: true },
      { text: ', ' },
      { strikethrough: true, text: 'strikethrough' },
      { text: '.' },
    ],
    type: 'p',
  },
]);
