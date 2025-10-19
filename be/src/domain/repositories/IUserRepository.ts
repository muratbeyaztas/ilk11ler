import { User } from "../entities/UserLineup";

export interface IUserRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByPhone(phone: string): Promise<User | null>;
	create(user: Omit<User, "id">): Promise<User>;
	update(id: string, user: Partial<User>): Promise<User | null>;
	verifyUser(userId: string): Promise<boolean>;
}
