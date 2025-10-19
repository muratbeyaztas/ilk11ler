import mongoose, { Schema, Document } from "mongoose";
import { User } from "../../../domain/entities/UserLineup";

export interface IUserDocument extends Omit<User, "id">, Document {}

const UserSchema = new Schema<IUserDocument>({
	email: { type: String, sparse: true, unique: true },
	phone: { type: String, sparse: true, unique: true },
	verificationCode: { type: String },
	verificationCodeExpiry: { type: Date },
	isVerified: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
