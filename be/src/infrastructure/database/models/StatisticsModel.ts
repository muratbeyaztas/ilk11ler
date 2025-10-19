import mongoose, { Schema, Document } from "mongoose";
import { PlayerStatistics } from "../../../domain/entities/PlayerStatistics";

export interface IStatisticsDocument
	extends Omit<PlayerStatistics, "id">,
		Document {}

const StatisticsSchema = new Schema<IStatisticsDocument>({
	playerId: { type: String, required: true },
	teamId: { type: String, required: true },
	position: { type: String, required: true },
	timesSelected: { type: Number, default: 0 },
	lastUpdated: { type: Date, default: Date.now },
});

StatisticsSchema.index({ playerId: 1, position: 1 }, { unique: true });

export const StatisticsModel = mongoose.model<IStatisticsDocument>(
	"Statistics",
	StatisticsSchema
);
