import { SimpleEditor } from "@/tiptap/tiptap-templates/simple/simple-editor";
import "./styles.css"

interface Props {
  initialContent: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ initialContent, onChange }: Props) {
  return <SimpleEditor onChange={onChange} initialContent={initialContent} />;
}
