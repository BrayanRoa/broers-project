import { JwtAdapter } from "../../../utils/jwt/jwt";
import { PasswordHasher } from "../../../utils/passwordHasher/passwordHasher";
import { CustomResponse } from "../../../utils/response/custom.response";
import { UserEntity } from "../../entities/users/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";


export interface loginResponse {
    token: string;
}

export interface LoginUserUseCase {
    execute(email: string, password: string): Promise<{ msg: string, token: string } | CustomResponse>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private authRepository: AuthRepository,
        private passwordHasher: PasswordHasher
    ) { }

    async execute(email: string, password: string): Promise<{ msg: string, token: string, refreshToken: string } | CustomResponse> {
        const user = await this.authRepository.getOneUser(email);
        if (user instanceof UserEntity) {
            const isMatch = await this.passwordHasher.verifyPassword(password, user.password!);
            if (isMatch) {
                const token = await JwtAdapter.generateToken({ id: user.id })
                const refreshToken = await JwtAdapter.generateToken({ id: user.id }, "7d"); // Expira en 7 días
                if (!token) throw new CustomResponse("Error creating token", 500)
                return {
                    msg: "user logged successfully",
                    token: token.toString(),
                    refreshToken: refreshToken!.toString()
                }
            } else {
                return new CustomResponse("invalid password", 400);
            }
        }
        return user
    }

}