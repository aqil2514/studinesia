import { Author } from "@/@types/author";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const endpoint = "/api/author";

export async function postAuthor(formData: Author) {
  try {
    await axios.post(endpoint, formData);

    toast.success("Penulis berhasil ditambah");
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const data = error.response?.data;

      toast.error(data.message ?? "Terjadi kesalahan saat menambahkan data");
    }
  }
}

export async function getAuthor() {
  try {
    const { data } = await axios.get(endpoint);

    return data.authors as Author[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
