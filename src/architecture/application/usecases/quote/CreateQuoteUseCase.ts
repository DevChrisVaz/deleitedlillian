import Quote from "@/architecture/domain/entities/Quote";
import Response from "@/architecture/domain/entities/Response";
import QuoteErrors from "@/architecture/domain/entities/errors/QuoteErrors";
import CreateQuoteException from "@/architecture/domain/exceptions/quote-exceptions/CreateCategoryException";
import IQuoteRepo from "@/architecture/domain/repositories/IQuoteRepo";
import IQuoteValidationsRepo from "@/architecture/domain/repositories/validations/IQuoteValidationsRepo";

class CreateQuoteUseCase {
    private readonly quoteRepo: IQuoteRepo;
    private readonly quoteValidationsRepo: IQuoteValidationsRepo;

    constructor(
        quoteRepo: IQuoteRepo,
        quoteValidationRepo: IQuoteValidationsRepo
    ) {
        this.quoteRepo = quoteRepo;
        this.quoteValidationsRepo = quoteValidationRepo
    }

    async run(quote: Quote): Promise<Response<Quote>> {
        const errors: QuoteErrors | null = await this.quoteValidationsRepo.create(quote);
        if(errors) throw new CreateQuoteException(errors);
        const response: Response<Quote> = await this.quoteRepo.create(quote);
        return response;
    }
}

export default CreateQuoteUseCase;