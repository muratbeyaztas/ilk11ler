import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { Team } from "../../domain/entities/Team";

export class GetAllTeams {
	constructor(private teamRepository: ITeamRepository) {}

	async execute(): Promise<Team[]> {
		return await this.teamRepository.findAll();
	}
}
