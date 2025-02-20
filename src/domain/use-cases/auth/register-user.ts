import { CustomResponse } from "../../../utils/response/custom.response";
import { CreateUserDto } from "../../dtos";
import { AuthRepository } from "../../repositories/auth.repository";
import { EmailService } from './../../../utils/emails/email.service';
export interface RegisterUserUseCase {
    execute(dto: CreateUserDto): Promise<string | CustomResponse>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private authRepository: AuthRepository,
        private emailService: EmailService
    ) { }
    async execute(dto: CreateUserDto): Promise<string | CustomResponse> {
        dto.isActive = true
        const resp = await this.authRepository.registerUser(dto)
        if (resp instanceof CustomResponse) return resp
        try {
            await this.emailService.welcomeEmail(resp.id, dto.email)
            return "User registered successfully, please verify your email address"
        } catch (error) {
            return new CustomResponse(`mail could not be sent`, 500)
        }
    }

}