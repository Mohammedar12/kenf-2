export interface ItemsGroup {
    id: number;
    name_en: string;
    name_ar: string;
    status: string;

}
export interface SearchResult {
    tables: ItemsGroup[];
    total: number;
}
