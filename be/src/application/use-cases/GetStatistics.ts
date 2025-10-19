import { IStatisticsRepository } from "../../domain/repositories/IStatisticsRepository";
import { PlayerStatistics } from "../../domain/entities/PlayerStatistics";

export class GetStatistics {
	constructor(private statisticsRepository: IStatisticsRepository) {}

	async getTeamStatistics(teamId: string): Promise<PlayerStatistics[]> {
		return await this.statisticsRepository.getTeamStatistics(teamId);
	}

	async getPositionStatistics(
		teamId: string,
		position: string
	): Promise<PlayerStatistics[]> {
		return await this.statisticsRepository.getPositionStatistics(
			teamId,
			position
		);
	}
}
