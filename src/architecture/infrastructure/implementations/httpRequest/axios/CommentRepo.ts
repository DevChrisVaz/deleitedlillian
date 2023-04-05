import axios from "axios";
import Response from "../../../../domain/entities/Response";
import ICommentRepo from "@/architecture/domain/repositories/ICommentRepo";
import Comment from "@/architecture/domain/entities/Comment";

class CommentRepo implements ICommentRepo {
    private readonly url: string;

    constructor(){ 
        this.url = process.env.NEXT_PUBLIC_API_URL + "comments/";
    }

    async getAll(): Promise<Response<Comment[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getPublic(): Promise<Response<Comment[]>> {
        const response = await axios.get(this.url + "public");
        return response;
    }

    async getOne(id: string): Promise<Response<Comment>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(comment: Comment): Promise<Response<Comment>> {
        const response = await axios.post(this.url, comment);
        return response;
    }

    async update(id:string, comment: Comment): Promise<Response<Comment>> {
        const response = await axios.put(this.url + id, comment);
        return response;
    }

    async delete(id: string): Promise<Response<Comment>> {
        const response = await axios.delete(this.url + id);
        return response;
    }
}

export default CommentRepo;