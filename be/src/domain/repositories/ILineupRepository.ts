import { UserLineup } from "../entities/UserLineup";

export interface ILineupRepository {
	findById(id: string): Promise<UserLineup | null>;
	findByUserId(userId: string): Promise<UserLineup[]>;
	create(lineup: Omit<UserLineup, "id">): Promise<UserLineup>;
	update(id: string, lineup: Partial<UserLineup>): Promise<UserLineup | null>;
	delete(id: string): Promise<boolean>;
}
