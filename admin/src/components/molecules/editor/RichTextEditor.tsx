import { SimpleEditor } from "@/tiptap/tiptap-templates/simple/simple-editor";
import "./styles.css"

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  return <SimpleEditor onChange={onChange} value={value} />;
}
