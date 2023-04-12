interface ProductFilters {
    category?: string;
    searchBy?: string;
    limit?: number;
    page?: number;
    minPrice?: number;
    maxPrice?: number;
}

export default ProductFilters;