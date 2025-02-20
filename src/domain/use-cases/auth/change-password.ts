import { EmailService } from "../../../utils/emails/email.service";
import { PasswordHasher } from "../../../utils/passwordHasher/passwordHasher";
import { CustomResponse } from "../../../utils/response/custom.response";
import { AuthRepository } from "../../repositories/auth.repository";
import { PasswordResetTokenRepository } from "../../repositories/password-reset-token.repository";
import * as crypto from "crypto";

export interface ChangePasswrodUseCase {
    execute(token: string, password: string): Promise<string | CustomResponse>;
}


export class ChangePassword implements ChangePasswrodUseCase {

    constructor(
        private AuthRepository: AuthRepository,
        private passwordHasher: PasswordHasher,
        private resetPasswordRepository: PasswordResetTokenRepository
    ) { }
    async execute(token: string, password: string): Promise<string | CustomResponse> {
        const resetToken = await this.resetPasswordRepository.findOneUser(token);
        if (resetToken instanceof CustomResponse) {
            return resetToken
        }

        // Validar si el token ha expirado
        if (resetToken.expiresAt < new Date()) {
            return new CustomResponse("Token has expired", 401)
        }

        // Hashear la nueva contraseña
        const hashedPassword = await this.passwordHasher.hashPassword(password);

        // Actualizar la contraseña del usuario
        await this.AuthRepository.updateUser(resetToken.userId, { password: hashedPassword });

        // Eliminar el token usado
        await this.resetPasswordRepository.deleteResetToken(token);
        return "password changed successfully"
    }


}