// resources/js/Pages/cms/BlogStatic.tsx
import { createSlateEditor } from "platejs";
import { EditorView } from "@/components/ui/editor";
import { BaseEditorKit } from "@/components/editor/editor-base-kit";

interface BlogStaticProps {
  content: any[]; // PlateJS JSON
}

export default function BlogStatic({ content }: BlogStaticProps) {
  const editor = createSlateEditor({
    plugins: BaseEditorKit,
    value: content,
  });

  return (
   
      <EditorView
        editor={editor}
        variant="default"
        className="min-h-[400px] sm:min-h-[500px]"
      />

  );
}
