export interface Tag {
  id?: string;
  created_at?: string;
  name: string;
  slug: string;
}

export interface ArticleTags {
  id: number;
  created_at: string;
  article_id: number;
  tag_id: number;
}

export interface ArticleTagsWithTagsData extends Omit<ArticleTags, 'tag_id'> {
  tag_id: {
    name: string;
    slug: string;
  };
}
