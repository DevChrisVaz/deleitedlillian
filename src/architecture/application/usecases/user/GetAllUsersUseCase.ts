import Response from "@/architecture/domain/entities/Response";
import User from "@/architecture/domain/entities/User";
import IUserRepo from "@/architecture/domain/repositories/IUserRepo";
import getFullName from "@/architecture/domain/services/user-services/getFullName";

class GetAllUsersUseCase {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(): Promise<Response<User[]>> {
        let response: Response<User[]> = await this.userRepo.getAll();
        if (response.data?.length) {
            response.data = response.data.map(u => {
                u = getFullName(u);
                return u;
            });
        }
        return response;
    }
}

export default GetAllUsersUseCase;