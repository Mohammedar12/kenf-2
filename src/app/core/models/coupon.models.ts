export interface Coupon {
    id: number;
    code: string;
    start_date: string;
    end_date:string;
    discount: string;
    status: string;

}
export interface SearchResult {
    tables: Coupon[];
    total: number;
}
