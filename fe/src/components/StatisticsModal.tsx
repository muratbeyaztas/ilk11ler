import { useEffect, useState } from "react";
import { statisticsService } from "../services/api";
import { PlayerStatistics } from "../types";
import useStore from "../store/useStore";

interface StatisticsModalProps {
	onClose: () => void;
}

const StatisticsModal = ({ onClose }: StatisticsModalProps) => {
	const { selectedTeam } = useStore();
	const [statistics, setStatistics] = useState<PlayerStatistics[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadStatistics = async () => {
			if (!selectedTeam) return;

			try {
				const stats = await statisticsService.getTeamStatistics(
					selectedTeam.id
				);
				setStatistics(stats);
			} catch (error) {
				console.error("İstatistikler yüklenirken hata:", error);
			} finally {
				setLoading(false);
			}
		};

		loadStatistics();
	}, [selectedTeam]);

	if (!selectedTeam) return null;

	// Group statistics by player
	const playerStats = statistics.reduce((acc, stat) => {
		if (!acc[stat.playerId]) {
			const player = selectedTeam.players.find((p) => p.id === stat.playerId);
			if (player) {
				acc[stat.playerId] = {
					player,
					totalSelections: 0,
					positions: [],
				};
			}
		}
		if (acc[stat.playerId]) {
			acc[stat.playerId].totalSelections += stat.timesSelected;
			acc[stat.playerId].positions.push({
				position: stat.position,
				count: stat.timesSelected,
			});
		}
		return acc;
	}, {} as any);

	const sortedPlayers = Object.values(playerStats).sort(
		(a: any, b: any) => b.totalSelections - a.totalSelections
	);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
				<div className="p-6 border-b bg-gradient-to-r from-red-600 to-red-700">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-2xl font-bold text-white">
								{selectedTeam.name} İstatistikleri
							</h3>
							<p className="text-red-100 text-sm mt-1">
								Kullanıcıların oyuncu tercihleri
							</p>
						</div>
						<button
							onClick={onClose}
							className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
						>
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
					{loading ? (
						<div className="text-center py-12">
							<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-red-600"></div>
							<p className="mt-4 text-gray-600">İstatistikler yükleniyor...</p>
						</div>
					) : sortedPlayers.length === 0 ? (
						<div className="text-center py-12">
							<svg
								className="w-16 h-16 mx-auto mb-4 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
							<p className="text-gray-600">
								Henüz bu takım için istatistik bulunmuyor
							</p>
							<p className="text-gray-500 text-sm mt-2">
								İlk kadroyu kuran siz olun!
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{sortedPlayers.map((item: any, index: number) => (
								<div
									key={item.player.id}
									className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all"
								>
									<div className="flex-shrink-0 text-2xl font-bold text-gray-400 w-8 text-center">
										#{index + 1}
									</div>

									<img
										src={item.player.photo}
										alt={item.player.name}
										className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
										onError={(e) => {
											(e.target as HTMLImageElement).src =
												"https://via.placeholder.com/64?text=" +
												item.player.name.charAt(0);
										}}
									/>

									<div className="flex-1">
										<div className="font-bold text-gray-800 text-lg">
											{item.player.name}
										</div>
										<div className="text-sm text-gray-600">
											#{item.player.number} - {item.player.position}
										</div>
									</div>

									<div className="text-right">
										<div className="text-3xl font-bold text-red-600">
											{item.totalSelections}
										</div>
										<div className="text-xs text-gray-500">seçilme</div>
									</div>

									<div className="flex-shrink-0 w-32">
										<div className="bg-gray-200 rounded-full h-3 overflow-hidden">
											<div
												className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all"
												style={{
													width: `${Math.min(
														(item.totalSelections /
															(sortedPlayers[0]?.totalSelections || 1)) *
															100,
														100
													)}%`,
												}}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="p-6 border-t bg-gray-50">
					<div className="flex items-center justify-between text-sm text-gray-600">
						<div className="flex items-center space-x-2">
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>İstatistikler gerçek zamanlı güncellenir</span>
						</div>
						<button
							onClick={onClose}
							className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
						>
							Kapat
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatisticsModal;
