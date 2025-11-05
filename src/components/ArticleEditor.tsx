import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2 } from 'lucide-react';

interface ArticleEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => Promise<void>;
  isLoading?: boolean;
}

const ArticleEditor = ({ 
  initialTitle = '', 
  initialContent = '', 
  onSave,
  isLoading = false 
}: ArticleEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    await onSave(title, content);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <Input
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground font-serif"
        />
        
        <Textarea
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[500px] text-lg border-0 px-0 resize-none focus-visible:ring-0 placeholder:text-muted-foreground leading-relaxed"
        />

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isLoading || !title.trim() || !content.trim()}
            className="gradient-hero text-primary-foreground"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Publish
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
