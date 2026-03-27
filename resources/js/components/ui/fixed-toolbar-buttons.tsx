'use client';

import * as React from 'react';

import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from 'lucide-react';

import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';

// ❌ NOT NEEDED
// import { AIToolbarButton } from './ai-toolbar-button';
import { AlignToolbarButton } from './align-toolbar-button';
// import { CommentToolbarButton } from './comment-toolbar-button';
// import { EmojiToolbarButton } from './emoji-toolbar-button';
// import { ExportToolbarButton } from './export-toolbar-button';
import { FontColorToolbarButton } from './font-color-toolbar-button';
import { FontSizeToolbarButton } from './font-size-toolbar-button';
// import { RedoToolbarButton, UndoToolbarButton } from './history-toolbar-button';
// import { ImportToolbarButton } from './import-toolbar-button';
import { IndentToolbarButton, OutdentToolbarButton } from './indent-toolbar-button';
// import { InsertToolbarButton } from './insert-toolbar-button';
import { LineHeightToolbarButton } from './line-height-toolbar-button';
import { LinkToolbarButton } from './link-toolbar-button';

// ✔ LIST BUTTONS (KEEP)
import {
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  // TodoListToolbarButton, // ❌ not needed
} from './list-toolbar-button';

// ✔ BASIC TEXT MARKS BUTTON
import { MarkToolbarButton } from './mark-toolbar-button';

// ✔ IMAGE BUTTON (KEEP)
import { MediaToolbarButton } from './media-toolbar-button';

// ❌ NOT NEEDED
// import { ModeToolbarButton } from './mode-toolbar-button';
// import { MoreToolbarButton } from './more-toolbar-button';
import { TableToolbarButton } from './table-toolbar-button';
// import { ToggleToolbarButton } from './toggle-toolbar-button';
import { TurnIntoToolbarButton } from './turn-into-toolbar-button';

import { ToolbarGroup } from './toolbar';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          {/* ❌ Undo / Redo - not needed */}
          {/*
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>
          */}

          {/* ❌ AI, Import/Export, Insert, Font Size - not needed */}


          <ToolbarGroup>
            {/* ✔ BOLD */}
            <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            {/* ✔ ITALIC */}
            <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘+I)">
              <ItalicIcon />
            </MarkToolbarButton>

            {/* ✔ UNDERLINE */}
            <MarkToolbarButton
              nodeType={KEYS.underline}
              tooltip="Underline (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            {/* ✔ STRIKETHROUGH */}
            <MarkToolbarButton
              nodeType={KEYS.strikethrough}
              tooltip="Strikethrough (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            {/* ❌ Code formatting not needed */}
            {/*
            <MarkToolbarButton nodeType={KEYS.code} tooltip="Code (⌘+E)">
              <Code2Icon />
            </MarkToolbarButton>
            */}

            {/* ❌ text color + highlight color disabled */}
           
            <FontColorToolbarButton nodeType={KEYS.color} tooltip="Text color">
              <BaselineIcon />
            </FontColorToolbarButton>

            <FontColorToolbarButton
              nodeType={KEYS.backgroundColor}
              tooltip="Background color"
            >
              <PaintBucketIcon />
            </FontColorToolbarButton>
          
          </ToolbarGroup>

          <ToolbarGroup>
            {/* ❌ Align buttons */}
            <AlignToolbarButton />

            {/* ✔ LIST BUTTONS */}
            <NumberedListToolbarButton />
            <BulletedListToolbarButton />

            {/* ❌ Todo list */}
            {/* <TodoListToolbarButton /> */}
          </ToolbarGroup>

          <ToolbarGroup>
            {/* ❌ Link / Table / Emoji disabled */}
              <LinkToolbarButton />
                    <TableToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            {/* ✔ IMAGE UPLOAD ONLY */}
            <MediaToolbarButton nodeType={KEYS.img} />

            {/* ❌ disable others (video/audio/file) */}
            {/*
            <MediaToolbarButton nodeType={KEYS.video} />
            <MediaToolbarButton nodeType={KEYS.audio} />
            <MediaToolbarButton nodeType={KEYS.file} />
            */}
          </ToolbarGroup>

          
           <ToolbarGroup>
            {/* <InsertToolbarButton /> */}
              <OutdentToolbarButton />
            <IndentToolbarButton />
               <LineHeightToolbarButton />
            <TurnIntoToolbarButton />
            <FontSizeToolbarButton />
          </ToolbarGroup>

          {/* ❌ Line height / indent disabled */}
        </>
      )}

      <div className="grow" />

      {/* ❌ Highlight + comments disabled */}
      {/*
      <ToolbarGroup>
        <MarkToolbarButton nodeType={KEYS.highlight} tooltip="Highlight">
          <HighlighterIcon />
        </MarkToolbarButton>
        <CommentToolbarButton />
      </ToolbarGroup>
      */}

      {/* ❌ Mode button disabled */}
      {/* <ModeToolbarButton /> */}
    </div>
  );
}
