import Quote from "@/architecture/domain/entities/Quote";
import Response from "@/architecture/domain/entities/Response";
import IQuoteRepo from "@/architecture/domain/repositories/IQuoteRepo";

class UpdateQuoteUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string, quote: Quote): Promise<Response<Quote>> {
        const response: Response<Quote> = await this.quoteRepo.update(id, quote);
        return response;
    }
}

export default UpdateQuoteUseCase;