import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

interface Props {
  initialContent: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ initialContent, onChange }: Props) {
  return <SimpleEditor onChange={onChange} initialContent={initialContent} />;
}
