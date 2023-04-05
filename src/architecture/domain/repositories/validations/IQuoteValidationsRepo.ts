import Quote from "../../entities/Quote";
import QuoteErrors from "../../entities/errors/QuoteErrors";


interface IQuoteValidationsRepo {
    create(quote: Quote): Promise<QuoteErrors | null>;
}

export default IQuoteValidationsRepo;