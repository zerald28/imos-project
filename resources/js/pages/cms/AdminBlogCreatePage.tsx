'use client';

import { useState } from 'react';
import { Plate, usePlateEditor } from 'platejs/react';
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from '@/components/ui/editor';
import axios from "axios";

 import CMSLayout from './layout';
 import AppLayout from '@/layouts/admin-layout';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Category { id: number; name: string }
interface Tag { id: number; name: string }
interface User { id: number; name: string; role: string }

interface Props {
  categories?: Category[];
  tags?: Tag[];
  user?: User;
}
// Helper to normalize table content
function normalizeTableContent(nodes: any[]): any[] {
  return nodes.map((node) => {
    const newNode = { ...node };

    if (newNode.type === 'td' || newNode.type === 'th') {
      newNode.children = newNode.children?.map((p: any) => {
        const newP = { ...p };
        newP.children = newP.children?.map((c: any) => {
          return {
            ...c,
            text: c.text ?? " ", // replace null with space
          };
        });
        return newP;
      });
    }

    if (newNode.children) {
      newNode.children = normalizeTableContent(newNode.children);
    }

    return newNode;
  });
}


function getFirstImageUrl(nodes: any[]): string | null {
  for (const node of nodes) {
    if (node.type === "img" && node.url) return node.url;

    if (node.children) {
      const found = getFirstImageUrl(node.children);
      if (found) return found;
    }
  }
  return null;
}



export default function BlogCreatePage({ categories = [], tags = [], user }: Props) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const clone = (obj: any) => JSON.parse(JSON.stringify(obj));
  const [isSaving, setIsSaving] = useState(false);



  const editor = usePlateEditor({ plugins: EditorKit, value: [] });

  const handleNext = () => {
    if (!title.trim() || !categoryId) {
      alert('Title and Category are required.');
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSave = async () => {
  if (!editor || isSaving) return;

  setIsSaving(true); // 🔒 disable UI while saving

  const raw = clone(editor.children);
  const normalized = normalizeTableContent(raw);
  const thumbnail = getFirstImageUrl(normalized);
  const generatedSlug = `${title.trim().replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;



  try {
    await axios.post('/cms/posts', {
      title,
      slug: generatedSlug,  // ✅ use generatedSlug
      content: normalized,
      category_id: categoryId,
      thumbnail,
      tags: selectedTags
        .map(id => {
          const tag = tags.find(t => t.id === id);
          if (!tag) return null;
          return id > 0 ? id : tag.name;
        })
        .filter(Boolean),
      status: 'published',
      state: 'approved',
    });

    alert('Post saved successfully!');
   window.location.href = `/cms/blog/${generatedSlug}`;


  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || 'Error saving post.');

  } finally {
    setIsSaving(false); // 🔓 re-enable UI
  }
};


const visibleCategories = categories.filter(cat => {
  if (!user) return true;
  if (['admin', 'enforcer'].includes(user.role)) return true;
  return ![1, 2, 3,8].includes(cat.id);
});


  return (
     <AppLayout >
    <div className="space-y-1 max-w-5xl px-5 mx-auto">
      <h1 className="text-3xl font-bold p-0 m-0 tracking-tight">Create Blog Post</h1>

      {step === 1 && (
        <div className="space-y-5">
          
          {/* Title */}
          <div className="space-y-2">
            <Label>Blog Title</Label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select onValueChange={(value) => setCategoryId(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
             <SelectContent>
  {visibleCategories.map(cat => (
    <SelectItem key={cat.id} value={String(cat.id)}>
      {cat.name}
    </SelectItem>
  ))}
</SelectContent>

            </Select>
          </div>

   {/* TAG INPUT */}
<div className="space-y-2">
  <Label>Tags</Label>
  <div className="flex items-center gap-2">
    <Input
      placeholder="Type a tag and press Enter..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const value = e.currentTarget.value.trim();
          if (!value) return;

          // Check if tag exists
          const existing = tags.find(
            (tag) => tag.name.toLowerCase() === value.toLowerCase()
          );

          if (existing) {
            if (!selectedTags.includes(existing.id)) {
              setSelectedTags([...selectedTags, existing.id]);
            }
          } else {
            // Temporary negative ID for frontend
            const tempId = -(Math.random() * 1000000);
            tags.push({ id: tempId, name: value });
            setSelectedTags([...selectedTags, tempId]);
          }

          e.currentTarget.value = "";
        }
      }}
    />
  </div>

  {/* TAG CHIPS */}
  <div className="flex flex-wrap gap-2 mt-2">
    {selectedTags.map((tagId) => {
      const tag = tags.find((t) => t.id === tagId);
      if (!tag) return null;

      return (
        <span
          key={tagId}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
        >
          {tag.name}
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() =>
              setSelectedTags(selectedTags.filter((id) => id !== tagId))
            }
          >
            ×
          </button>
        </span>
      );
    })}
  </div>
</div>



          <Button className="mt-4" onClick={handleNext}>
            Next: Write Content
          </Button>
        </div>
      )}

      {/* STEP 2: EDITOR */}
      {step === 2 && (
        <div className="space-y-3">
          <Plate editor={editor}>
            <EditorContainer className="sm:h-[530px] h-[400px] overflow-y-auto border rounded-lg p-2 shadow-sm">
              <Editor placeholder="Start typing your content..." />
            </EditorContainer>
          </Plate>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>

           <Button
  className="bg-green-600 hover:bg-green-700"
  onClick={handleSave}
  disabled={isSaving}
>
  {isSaving ? "Saving..." : "Save Post"}
</Button>

          </div>
        </div>
      )}
    </div>
    </AppLayout>
  );
}
