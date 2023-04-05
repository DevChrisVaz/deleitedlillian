import CommentErrors from "@/architecture/domain/entities/errors/CommentErrors";
import commentSchema from "../../driven-adapters/validations/Yup/CommentSchema";
import Comment from "@/architecture/domain/entities/Comment";

interface FormErrors {
    [key: string]: string;
}

class CommentValidationsRepo {
    async create(comment: Comment): Promise<CommentErrors | null> {
        let quoteErrors: any = {};

        await commentSchema.validate(comment, { abortEarly: false, recursive: true }).then(() => {
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

export default CommentValidationsRepo;