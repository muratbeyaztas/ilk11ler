import { ILineupRepository } from "../../domain/repositories/ILineupRepository";
import { UserLineup } from "../../domain/entities/UserLineup";
import { LineupModel } from "../database/models/LineupModel";

export class LineupRepository implements ILineupRepository {
	async findById(id: string): Promise<UserLineup | null> {
		const lineup = await LineupModel.findById(id);
		return lineup ? this.mapToEntity(lineup) : null;
	}

	async findByUserId(userId: string): Promise<UserLineup[]> {
		const lineups = await LineupModel.find({ userId });
		return lineups.map((lineup) => this.mapToEntity(lineup));
	}

	async create(lineup: Omit<UserLineup, "id">): Promise<UserLineup> {
		const newLineup = new LineupModel(lineup);
		const saved = await newLineup.save();
		return this.mapToEntity(saved);
	}

	async update(
		id: string,
		lineup: Partial<UserLineup>
	): Promise<UserLineup | null> {
		const updated = await LineupModel.findByIdAndUpdate(
			id,
			{ ...lineup, updatedAt: new Date() },
			{ new: true }
		);
		return updated ? this.mapToEntity(updated) : null;
	}

	async delete(id: string): Promise<boolean> {
		const result = await LineupModel.findByIdAndDelete(id);
		return !!result;
	}

	private mapToEntity(doc: any): UserLineup {
		return {
			id: doc._id.toString(),
			userId: doc.userId,
			teamId: doc.teamId,
			formation: doc.formation,
			selectedPlayers: doc.selectedPlayers,
			createdAt: doc.createdAt,
			updatedAt: doc.updatedAt,
		};
	}
}
