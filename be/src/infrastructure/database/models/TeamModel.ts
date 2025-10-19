import mongoose, { Schema, Document } from "mongoose";
import {
	Team,
	Player,
	Coach,
	PlayerPosition,
} from "../../../domain/entities/Team";

export interface ITeamDocument extends Omit<Team, "id">, Document {}
export interface IPlayerDocument extends Omit<Player, "id">, Document {}
export interface ICoachDocument extends Omit<Coach, "id">, Document {}

const PlayerSchema = new Schema<IPlayerDocument>({
	teamId: { type: String, required: false },
	name: { type: String, required: true },
	photo: { type: String, required: true },
	number: { type: Number, required: true },
	position: {
		type: String,
		enum: Object.values(PlayerPosition),
		required: true,
	},
	age: { type: Number, required: true },
	nationality: { type: String, required: true },
	height: { type: Number, required: true },
	weight: { type: Number, required: true },
});

const CoachSchema = new Schema<ICoachDocument>({
	teamId: { type: String, required: false },
	name: { type: String, required: true },
	photo: { type: String, required: true },
	nationality: { type: String, required: true },
	age: { type: Number, required: true },
});

const TeamSchema = new Schema<ITeamDocument>({
	name: { type: String, required: true, unique: true },
	logo: { type: String, required: true },
	stadium: { type: String, required: true },
	city: { type: String, required: true },
	foundedYear: { type: Number, required: true },
	colors: [{ type: String }],
	players: [PlayerSchema],
	coach: { type: CoachSchema, required: true },
});

export const TeamModel = mongoose.model<ITeamDocument>("Team", TeamSchema);
export const PlayerModel = mongoose.model<IPlayerDocument>(
	"Player",
	PlayerSchema
);
export const CoachModel = mongoose.model<ICoachDocument>("Coach", CoachSchema);
