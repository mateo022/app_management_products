export interface Product {
    id: number;
    product_name: string;
    product_reference: string;
    product_size: string;
    product_description: string;
    product_image: string;
    product_price: number;
    product_quantity: number;
    category_id: number;
    created_at: Date;
    updated_at: Date;
}
