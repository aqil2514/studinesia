import { Author } from "@/@types/author";
import { writerChannel } from "@/components/templates/writer/WriterTemplate";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const endpoint = "/api/author";

export async function postAuthor(formData: Author) {
  try {
    await axios.post(endpoint, formData);

    writerChannel.postMessage({ type: "New_Author" });
    writerChannel.close();
    window.close();
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;

      toast.error(data.message ?? "Terjadi kesalahan saat menambahkan data");
    }
  }
}