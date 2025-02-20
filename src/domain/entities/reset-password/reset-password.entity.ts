import { BaseEntity } from "../../../utils/entity/base.entity";

export class ResetPasswordEntity extends BaseEntity {

    constructor(
        public id: string,
        public token: string,
        public userId: string,
        public expiresAt:Date,
        public created_at: Date,
        public updated_at: Date,
        public deleted_at?: Date,
    ) {
        super(id, created_at, updated_at, deleted_at)
    }

    public static fromObject(obj: { [key: string]: any }): ResetPasswordEntity {
        return new ResetPasswordEntity(
            obj.id,
            obj.token,
            obj.userId,
            obj.expiresAt,  // new Date(obj.expiresAt), // Convertir a Date
            obj.created_at,
            obj.updated_at,
            obj.deleted_at,
        )
    }

}