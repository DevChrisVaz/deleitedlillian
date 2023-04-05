import Response from "@/architecture/domain/entities/Response";
import User from "@/architecture/domain/entities/User";
import IUserRepo from "@/architecture/domain/repositories/IUserRepo";

class UpdateUserUseCase {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(id: string, user: User): Promise<Response<User>> {
        const response: Response<User> = await this.userRepo.update(id, user);
        return response;
    }
}

export default UpdateUserUseCase;