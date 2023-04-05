import ProductFilters from "@/architecture/domain/entities/ProductFilters";
import ProductsWithTotal from "@/architecture/domain/entities/ProductsWithTotal";
import Response from "@/architecture/domain/entities/Response";
import IProductRepo from "@/architecture/domain/repositories/IProductRepo";

class GetManyProductsUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(filters: ProductFilters): Promise<Response<ProductsWithTotal>> {
        const response: Response<ProductsWithTotal> = await this.productRepo.getMany(filters);
        return response;
    }
}

export default GetManyProductsUseCase;