import { Formation } from "./Team";

export interface UserLineup {
	id: string;
	userId: string;
	teamId: string;
	formation: Formation;
	selectedPlayers: SelectedPlayer[];
	createdAt: Date;
	updatedAt: Date;
}

export interface SelectedPlayer {
	playerId: string;
	position: FieldPosition;
}

export interface FieldPosition {
	row: number; // 0: GK, 1: Defense, 2: Midfield, 3: Attack
	column: number; // 0-3 depending on formation
}

export interface User {
	id: string;
	email?: string;
	phone?: string;
	verificationCode?: string;
	verificationCodeExpiry?: Date;
	isVerified: boolean;
	createdAt: Date;
}
