export enum PlayerPosition {
	GOALKEEPER = "GK",
	DEFENDER = "DF",
	MIDFIELDER = "MF",
	FORWARD = "FW",
}

export enum Formation {
	F_4_4_2 = "4-4-2",
	F_4_3_3 = "4-3-3",
	F_3_5_2 = "3-5-2",
	F_4_2_3_1 = "4-2-3-1",
	F_3_4_3 = "3-4-3",
}

export interface Player {
	id: string;
	teamId: string;
	name: string;
	photo: string;
	number: number;
	position: PlayerPosition;
	age: number;
	nationality: string;
	height: number;
	weight: number;
}

export interface Coach {
	id: string;
	teamId: string;
	name: string;
	photo: string;
	nationality: string;
	age: number;
}

export interface Team {
	id: string;
	name: string;
	logo: string;
	stadium: string;
	city: string;
	foundedYear: number;
	colors: string[];
	players: Player[];
	coach: Coach;
}

export interface FieldPosition {
	row: number;
	column: number;
}

export interface SelectedPlayer {
	playerId: string;
	position: FieldPosition;
}

export interface UserLineup {
	id?: string;
	userId: string;
	teamId: string;
	formation: Formation;
	selectedPlayers: SelectedPlayer[];
}

export interface User {
	id: string;
	email?: string;
	phone?: string;
	isVerified: boolean;
}

export interface PlayerStatistics {
	playerId: string;
	teamId: string;
	position: string;
	timesSelected: number;
	lastUpdated: Date;
}
