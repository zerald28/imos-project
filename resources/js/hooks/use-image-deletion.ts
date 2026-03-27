// hooks/use-image-deletion.ts

import { useEffect, useRef } from 'react';
import type { Value } from 'platejs';
import { useEditorState } from 'platejs/react'; 

import { deleteImageFromLaravel } from '@/lib/deleteImage'; 
import { KEYS } from 'platejs';

/**
 * A hook that monitors editor content for removed image URLs and calls the backend delete API.
 * This hook must be called within a component nested inside <Plate>.
 */
export const useImageDeletion = () => { // Removed the 'editor: PlateEditor' parameter
    
    // Get the editor state. We use 'any' temporarily to reliably access the children property.
    const editorState = useEditorState() as any; 
    
    // Explicitly get the children array from the returned state object
    const children: Value = editorState.children || [];
    
    const previousImageUrls = useRef(new Set<string>());

    useEffect(() => {
        const currentImageUrls = new Set<string>();

        const findImageUrls = (nodes: any[]): void => { 
            // The check below handles cases where nodes might not be an array
            if (!Array.isArray(nodes)) return;

            for (const node of nodes) {
                if (node.type === KEYS.img) {
                    const url = node.url || node.src;
                    if (url) {
                        currentImageUrls.add(url);
                    }
                }
                if (node.children && Array.isArray(node.children)) {
                    findImageUrls(node.children);
                }
            }
        };

        // Call the helper function with the children array
        findImageUrls(children); 

        const removedUrls = new Set(previousImageUrls.current);
        currentImageUrls.forEach(url => removedUrls.delete(url));

        removedUrls.forEach(imageUrl => {
            const storagePathMatch = imageUrl.match(/\/storage\/(.*)$/);
            
            if (storagePathMatch && storagePathMatch[1]) {
                const relativePath = storagePathMatch[1];
                console.log(`Detected removal. Deleting file: ${relativePath}`);
                deleteImageFromLaravel(relativePath);
            } else {
                console.warn(`Could not extract relative path from URL: ${imageUrl}`);
            }
        });

        previousImageUrls.current = currentImageUrls;

    }, [children]); // Now correctly depends only on the children array

};
