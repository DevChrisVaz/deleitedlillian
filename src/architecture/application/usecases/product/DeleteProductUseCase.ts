import Product from "@/architecture/domain/entities/Product";
import Response from "@/architecture/domain/entities/Response";
import IProductRepo from "@/architecture/domain/repositories/IProductRepo";

class DeleteProductUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string): Promise<Response<Product>> {
        const response: Response<Product> = await this.productRepo.delete(id);
        return response;
    }
}

export default DeleteProductUseCase;