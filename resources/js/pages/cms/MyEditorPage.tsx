// resources/js/Pages/cms/BlogShow.tsx

// 1. Import PlateStatic from the correct subpath
import { PlateStatic } from 'platejs/static'; 

// 2. Import the core editor creation function using its correct name
import { createSlateEditor } from 'platejs'; 

// 3. Import ALL necessary plugins from your config
import { BaseEditorKit } from '@/components/editor/editor-base-kit'; 

interface PostProps {
  post: {
    title: string;
    content: Array<{ type: string; children: any[]; [key: string]: any }>; 
  };
}

export default function BlogShow({ post }: PostProps) {

  // Initialize the editor instance using createSlateEditor
  const editor = createSlateEditor({ // <-- Use createSlateEditor
    plugins: BaseEditorKit,
    value: post.content, 
  });

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      
      <div className="prose lg:prose-lg max-w-none">
        {/* Pass the created editor instance to the 'editor' prop */}
        <PlateStatic
          editor={editor}
        />
      </div>
    </div>
  );
}


// import FullBlogViewer from './FullBlogViewer';

// export default function BlogShow({ post }: { post: any }) {
//   return (
//     <div className="px-6 py-10">
//       <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
//       <FullBlogViewer content={post?.content || ''} />
//     </div>
//   );
// }
