import mongoose, { Schema, Document } from "mongoose";
import {
	UserLineup,
	SelectedPlayer,
	FieldPosition,
} from "../../../domain/entities/UserLineup";
import { Formation } from "../../../domain/entities/Team";

export interface ILineupDocument extends Omit<UserLineup, "id">, Document {}

const FieldPositionSchema = new Schema<FieldPosition>(
	{
		row: { type: Number, required: true },
		column: { type: Number, required: true },
	},
	{ _id: false }
);

const SelectedPlayerSchema = new Schema<SelectedPlayer>(
	{
		playerId: { type: String, required: true },
		position: { type: FieldPositionSchema, required: true },
	},
	{ _id: false }
);

const LineupSchema = new Schema<ILineupDocument>({
	userId: { type: String, required: true, ref: "User" },
	teamId: { type: String, required: true, ref: "Team" },
	formation: { type: String, enum: Object.values(Formation), required: true },
	selectedPlayers: [SelectedPlayerSchema],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const LineupModel = mongoose.model<ILineupDocument>(
	"Lineup",
	LineupSchema
);
