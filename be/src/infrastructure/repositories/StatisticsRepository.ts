import { IStatisticsRepository } from "../../domain/repositories/IStatisticsRepository";
import { PlayerStatistics } from "../../domain/entities/PlayerStatistics";
import { StatisticsModel } from "../database/models/StatisticsModel";

export class StatisticsRepository implements IStatisticsRepository {
	async incrementPlayerSelection(
		playerId: string,
		teamId: string,
		position: string
	): Promise<void> {
		await StatisticsModel.findOneAndUpdate(
			{ playerId, position },
			{
				$inc: { timesSelected: 1 },
				$set: { teamId, lastUpdated: new Date() },
			},
			{ upsert: true, new: true }
		);
	}

	async getPlayerStatistics(
		playerId: string
	): Promise<PlayerStatistics | null> {
		const stats = await StatisticsModel.findOne({ playerId });
		return stats ? this.mapToEntity(stats) : null;
	}

	async getTeamStatistics(teamId: string): Promise<PlayerStatistics[]> {
		const stats = await StatisticsModel.find({ teamId });
		return stats.map((stat) => this.mapToEntity(stat));
	}

	async getPositionStatistics(
		teamId: string,
		position: string
	): Promise<PlayerStatistics[]> {
		const stats = await StatisticsModel.find({ teamId, position });
		return stats.map((stat) => this.mapToEntity(stat));
	}

	private mapToEntity(doc: any): PlayerStatistics {
		return {
			playerId: doc.playerId,
			teamId: doc.teamId,
			position: doc.position,
			timesSelected: doc.timesSelected,
			lastUpdated: doc.lastUpdated,
		};
	}
}
