import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/UserLineup";
import { UserModel } from "../database/models/UserModel";

export class UserRepository implements IUserRepository {
	async findById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id);
		return user ? this.mapToEntity(user) : null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await UserModel.findOne({ email });
		return user ? this.mapToEntity(user) : null;
	}

	async findByPhone(phone: string): Promise<User | null> {
		const user = await UserModel.findOne({ phone });
		return user ? this.mapToEntity(user) : null;
	}

	async create(user: Omit<User, "id">): Promise<User> {
		const newUser = new UserModel(user);
		const saved = await newUser.save();
		return this.mapToEntity(saved);
	}

	async update(id: string, user: Partial<User>): Promise<User | null> {
		const updated = await UserModel.findByIdAndUpdate(id, user, { new: true });
		return updated ? this.mapToEntity(updated) : null;
	}

	async verifyUser(userId: string): Promise<boolean> {
		const result = await UserModel.findByIdAndUpdate(userId, {
			isVerified: true,
			verificationCode: undefined,
			verificationCodeExpiry: undefined,
		});
		return !!result;
	}

	private mapToEntity(doc: any): User {
		return {
			id: doc._id.toString(),
			email: doc.email,
			phone: doc.phone,
			verificationCode: doc.verificationCode,
			verificationCodeExpiry: doc.verificationCodeExpiry,
			isVerified: doc.isVerified,
			createdAt: doc.createdAt,
		};
	}
}
