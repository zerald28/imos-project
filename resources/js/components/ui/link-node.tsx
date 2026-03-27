'use client';

import * as React from 'react';

import type { TInlineSuggestionData, TLinkElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';

import { getLinkAttributes } from '@platejs/link';
import { BaseSuggestionPlugin } from '@platejs/suggestion';
import { toTPlatePlugin, PlateElement } from 'platejs/react';

import { cn } from '@/lib/utils';

// Wrap BaseSuggestionPlugin for React/Plate usage
export const suggestionPlugin = toTPlatePlugin(BaseSuggestionPlugin, ({ editor }) => ({
  options: {
    activeId: null,
    hoverId: null,
    uniquePathMap: new Map(),
  },
}));

export function LinkElement(props: PlateElementProps<TLinkElement>) {
  // Safe access: getApi might return undefined if plugin not loaded
  const suggestionApi = props.editor.getApi(BaseSuggestionPlugin);
  const suggestionData = suggestionApi?.suggestion?.suggestionData(props.element) as
    | TInlineSuggestionData
    | undefined;

  return (
    <PlateElement
      {...props}
      as="a"
      className={cn(
        'font-medium text-primary underline decoration-primary underline-offset-4',
        suggestionData?.type === 'remove' && 'bg-red-100 text-red-700',
        suggestionData?.type === 'insert' && 'bg-emerald-100 text-emerald-700'
      )}
      attributes={{
        ...props.attributes,
        ...getLinkAttributes(props.editor, props.element),
        onMouseOver: (e) => e.stopPropagation(),
      }}
    >
      {props.children}
    </PlateElement>
  );
}
