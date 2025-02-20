import { EmailService } from "../../../utils/emails/email.service";
import { CustomResponse } from "../../../utils/response/custom.response";
import { AuthRepository } from "../../repositories/auth.repository";
import { PasswordResetTokenRepository } from "../../repositories/password-reset-token.repository";
import * as crypto from "crypto";

export interface PasswordRecoveryUseCase {
    execute(email: string): Promise<string | CustomResponse>;
}


export class PasswordRecovery implements PasswordRecoveryUseCase {

    constructor(
        private AuthRepository: AuthRepository,
        private emailService: EmailService,
        private resetPasswordRepository: PasswordResetTokenRepository
    ) { }
    async execute(email: string): Promise<string | CustomResponse> {
        const user = await this.AuthRepository.getOneUser(email);

        if (user instanceof CustomResponse) {
            return user;
        }
        try {
            const resetToken = crypto.randomUUID();
            console.log({user});
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1); // Expira en 1 hora
            
            // Guardar el token en la base de datos
            await this.resetPasswordRepository.save({ userId: user.id, token: resetToken, expiresAt: expiresAt });
    
            // Generar el enlace de recuperación
            const resetLink = `http://localhost:3000/api/v1/auth/change-password/${resetToken}`;
    
            console.log(resetLink);
            // Enviar el email al usuario
            const emailOptions = {
                to: user.email,
                subject: "Recuperación de contraseña",
                htmlBody: `
                    <p>Hola ${user.fullName},</p>
                    <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
                    <a href="${resetLink}">${resetLink}</a>
                    <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                `,
            };
    
            // Enviar el email usando tu método existente
            await this.emailService.sendEmailToTransport(emailOptions);
    
    
            return `Verify your email: ${user.email}`
        } catch (error:any) {
            return new CustomResponse(error.message, 400)
        }
    }


}