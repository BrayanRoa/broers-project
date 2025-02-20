import { BaseDatasource } from "../../utils/datasource/base.datasource";
import { AuditsDatasource } from "../../domain/datasources/audits-datasource";
import { CreateAuditDTO } from "../../domain/dtos/audits/create-audits.dto";
import { AudistsEntity } from "../../domain/entities/audits/audits.entity";
import { CustomResponse } from "../../utils/response/custom.response";
import { PasswordResetTokenDatasource } from "../../domain/datasources/password-reset-token";
import { CreatePasswordResetTokenDto } from "../../domain/dtos/reset-password/create-reset-password.dto";
import { ResetPasswordEntity } from "../../domain/entities/reset-password/reset-password.entity";

export class PasswordResetTokenDatasourceImp extends BaseDatasource implements PasswordResetTokenDatasource {

    constructor() {
        super()
    }
    deleteResetToken(token: string): Promise<string | CustomResponse> {
        return this.handleErrors(async () => {
            await BaseDatasource.prisma.passwordResetToken.delete({
                where: {
                    token: token
                }
            })
            return "Token deleted successfully"
        })
    }
    save(dto: CreatePasswordResetTokenDto): Promise<ResetPasswordEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const new_token = await BaseDatasource.prisma.passwordResetToken.create({ data: dto })
            return ResetPasswordEntity.fromObject(new_token);
        })
    }
    findOneUser(param: string): Promise<ResetPasswordEntity | CustomResponse> {
        return this.handleErrors(async () => {
            const token = await BaseDatasource.prisma.passwordResetToken.findFirst({
                where: {
                    OR: [
                        { token: param },
                        { userId: param }
                    ],
                }
            })
            if (!token) {
                throw new CustomResponse("Token not found", 404)
            }
            return ResetPasswordEntity.fromObject(token);
        })
    }


}