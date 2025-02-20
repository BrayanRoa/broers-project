import { PasswordResetTokenDatasource } from "../../domain/datasources/password-reset-token";
import { CreatePasswordResetTokenDto } from "../../domain/dtos/reset-password/create-reset-password.dto";
import { ResetPasswordEntity } from "../../domain/entities/reset-password/reset-password.entity";
import { PasswordResetTokenRepository } from "../../domain/repositories/password-reset-token.repository";
import { CustomResponse } from "../../utils/response/custom.response";

export class PasswordResetTokenRepositoryImp implements PasswordResetTokenRepository {

    constructor(
        private resetPasswordDatasource: PasswordResetTokenDatasource
    ) { }
    deleteResetToken(token: string): Promise<string | CustomResponse> {
        return this.resetPasswordDatasource.deleteResetToken(token)
    }
    save(dto: CreatePasswordResetTokenDto): Promise<ResetPasswordEntity | CustomResponse> {
        return this.resetPasswordDatasource.save(dto)
    }
    findOneUser(param: string): Promise<ResetPasswordEntity | CustomResponse> {
        return this.resetPasswordDatasource.findOneUser(param)
    }

}