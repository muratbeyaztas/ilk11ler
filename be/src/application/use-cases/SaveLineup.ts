import { ILineupRepository } from "../../domain/repositories/ILineupRepository";
import { IStatisticsRepository } from "../../domain/repositories/IStatisticsRepository";
import { UserLineup, SelectedPlayer } from "../../domain/entities/UserLineup";
import { Formation } from "../../domain/entities/Team";

interface SaveLineupInput {
	userId: string;
	teamId: string;
	formation: Formation;
	selectedPlayers: SelectedPlayer[];
}

export class SaveLineup {
	constructor(
		private lineupRepository: ILineupRepository,
		private statisticsRepository: IStatisticsRepository
	) {}

	async execute(input: SaveLineupInput): Promise<UserLineup> {
		const lineup = await this.lineupRepository.create({
			userId: input.userId,
			teamId: input.teamId,
			formation: input.formation,
			selectedPlayers: input.selectedPlayers,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Update statistics for each selected player
		for (const selectedPlayer of input.selectedPlayers) {
			await this.statisticsRepository.incrementPlayerSelection(
				selectedPlayer.playerId,
				input.teamId,
				`${selectedPlayer.position.row}-${selectedPlayer.position.column}`
			);
		}

		return lineup;
	}
}
