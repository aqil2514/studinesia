export enum ArticleDBSelect {
  ARTICILE_WITH_NO_RELATIONS = "*",
  ARTICILE_WITH_RELATIONS = "*, author_id(name, id), category_id(id, name, slug)",
}
