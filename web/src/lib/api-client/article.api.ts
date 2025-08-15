import axios from "axios";

const endpoint = "/api/articles";

export async function getPublishedArticles() {
  try {
    const { data } = await axios.get(`${endpoint}?mode=published`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

