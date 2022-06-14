export interface ItemsCategory {
    id: number;
    name_en: string;
    name_ar: string;
    status: string;

}
export interface SearchResult {
    tables: ItemsCategory[];
    total: number;
}
