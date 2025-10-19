import axios from "axios";
import { Team, UserLineup, PlayerStatistics } from "../types";

const api = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export const teamService = {
	getAllTeams: async (): Promise<Team[]> => {
		const response = await api.get("/teams");
		return response.data.data;
	},

	getTeamById: async (id: string): Promise<Team> => {
		const response = await api.get(`/teams/${id}`);
		return response.data.data;
	},
};

export const userService = {
	register: async (data: {
		email?: string;
		phone?: string;
	}): Promise<{ userId: string }> => {
		const response = await api.post("/users/register", data);
		return response.data.data;
	},

	verify: async (data: {
		identifier: string;
		code: string;
	}): Promise<{ userId: string }> => {
		const response = await api.post("/users/verify", data);
		return response.data.data;
	},
};

export const lineupService = {
	saveLineup: async (lineup: UserLineup): Promise<UserLineup> => {
		const response = await api.post("/lineups", lineup);
		return response.data.data;
	},

	getUserLineups: async (userId: string): Promise<UserLineup[]> => {
		const response = await api.get(`/lineups/user/${userId}`);
		return response.data.data;
	},
};

export const statisticsService = {
	getTeamStatistics: async (teamId: string): Promise<PlayerStatistics[]> => {
		const response = await api.get(`/statistics/team/${teamId}`);
		return response.data.data;
	},

	getPositionStatistics: async (
		teamId: string,
		position: string
	): Promise<PlayerStatistics[]> => {
		const response = await api.get(
			`/statistics/team/${teamId}/position/${position}`
		);
		return response.data.data;
	},
};

export default api;
