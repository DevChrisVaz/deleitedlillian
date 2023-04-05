import Quote from "@/architecture/domain/entities/Quote";
import QuoteErrors from "@/architecture/domain/entities/errors/QuoteErrors";
import quoteSchema from "../../driven-adapters/validations/Yup/QuoteSchema";

interface FormErrors {
    [key: string]: string;
}

class QuoteValidationsRepo {
    async create(quote: Quote): Promise<QuoteErrors | null> {
        let quoteErrors: any = {};

        await quoteSchema.validate(quote, { abortEarly: false, recursive: true }).then(() => {
            quoteErrors = null;
        }).catch(errors => {
            let formErrors: FormErrors = {};
            errors.inner.forEach((error: any) => {
                formErrors[error.path as string] = error.message;
            });
            quoteErrors = {...formErrors};
        });

        return quoteErrors;
    }
}

export default QuoteValidationsRepo;