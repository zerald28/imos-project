'use client';

import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

// --- BASIC ---
import { AlignKit } from '@/components/editor/plugins/align-kit';
import { AutoformatKit } from '@/components/editor/plugins/autoformat-kit';
import { BaseBasicMarksKit } from './plugins/basic-marks-kit';
import { FixedToolbarKit } from './plugins/fixed-toolbar-kit';
import { FontKit } from '@/components/editor/plugins/font-kit';
import { TableKit } from './plugins/table-kit';
import { BasicBlocksKit } from './plugins/basic-blocks-kit';
import { LineHeightKit } from './plugins/line-height-kit';
import { LinkKit } from './plugins/link-kit';


import { MediaKit } from './plugins/media-kit';

import { ListKit } from './plugins/list-kit';

// import { BlockMenuKit } from './plugins/block-menu-kit';



export const EditorKit = [

    //  ...BlockMenuKit,


  // Basic text and blocks
  ...FontKit,

  // Elements
  ...BasicBlocksKit,
//   ...CodeBlockKit,
  ...TableKit,
//   ...ToggleKit,
//   ...TocKit,
  ...MediaKit,
//   ...CalloutKit,
//   ...ColumnKit,
//   ...MathKit,
//   ...DateKit,
//   ...MentionKit,
    ...LineHeightKit,
      ...LinkKit,
  // Block Style
  ...ListKit,
  ...AlignKit,
//   ...LineHeightKit,

  ...BaseBasicMarksKit,
  ...AutoformatKit,

  // Required for editor stability
  TrailingBlockPlugin,


  //ui
    ...FixedToolbarKit,     // <-- this shows toolbar buttons
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();
