import { PlayerStatistics } from "../entities/PlayerStatistics";

export interface IStatisticsRepository {
	incrementPlayerSelection(
		playerId: string,
		teamId: string,
		position: string
	): Promise<void>;
	getPlayerStatistics(playerId: string): Promise<PlayerStatistics | null>;
	getTeamStatistics(teamId: string): Promise<PlayerStatistics[]>;
	getPositionStatistics(
		teamId: string,
		position: string
	): Promise<PlayerStatistics[]>;
}
