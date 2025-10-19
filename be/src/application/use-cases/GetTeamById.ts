import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { Team } from "../../domain/entities/Team";

export class GetTeamById {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(teamId: string): Promise<Team | null> {
		return await this.teamRepository.findById(teamId);
	}
}
