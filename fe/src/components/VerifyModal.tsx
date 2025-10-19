import { useState } from "react";
import useStore from "../store/useStore";
import { userService, lineupService } from "../services/api";

const VerifyModal = () => {
	const { closeModal, setUser, selectedTeam, formation, selectedPlayers } =
		useStore();
	const [identifier, setIdentifier] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			// Verify user
			const { userId } = await userService.verify({ identifier, code });

			// Save lineup
			await lineupService.saveLineup({
				userId,
				teamId: selectedTeam!.id,
				formation,
				selectedPlayers,
			});

			// Update user state
			setUser({
				id: userId,
				email: identifier.includes("@") ? identifier : undefined,
				phone: identifier.includes("@") ? undefined : identifier,
				isVerified: true,
			});

			setSuccess(true);
			setTimeout(() => {
				closeModal();
			}, 2000);
		} catch (err: any) {
			setError(err.response?.data?.message || "Doğrulama başarısız oldu");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
				<div className="p-6 border-b">
					<div className="flex items-center justify-between">
						<h3 className="text-2xl font-bold text-gray-800">Doğrulama</h3>
						<button
							onClick={closeModal}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
						>
							<svg
								className="w-6 h-6"
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

				{success ? (
					<div className="p-6 text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-10 h-10 text-green-600"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<h4 className="text-xl font-bold text-gray-800 mb-2">Başarılı!</h4>
						<p className="text-gray-600">Kadronuz başarıyla kaydedildi.</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="p-6 space-y-4">
						<p className="text-gray-600">
							Size gönderilen 6 haneli doğrulama kodunu girin.
						</p>

						{/* Identifier Input */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Email veya Telefon
							</label>
							<input
								type="text"
								value={identifier}
								onChange={(e) => setIdentifier(e.target.value)}
								placeholder="Email veya telefon numaranız"
								required
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
							/>
						</div>

						{/* Code Input */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Doğrulama Kodu
							</label>
							<input
								type="text"
								value={code}
								onChange={(e) =>
									setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
								}
								placeholder="123456"
								required
								maxLength={6}
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-center text-2xl font-bold tracking-widest"
							/>
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
								{error}
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading || code.length !== 6}
							className={`w-full py-3 rounded-lg font-semibold transition-all ${
								loading || code.length !== 6
									? "bg-gray-400 cursor-not-allowed"
									: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
							}`}
						>
							{loading ? "Doğrulanıyor..." : "Doğrula ve Kaydet"}
						</button>

						<p className="text-sm text-gray-500 text-center">
							Kodu almadınız mı?{" "}
							<button type="button" className="text-red-600 hover:underline">
								Tekrar gönder
							</button>
						</p>
					</form>
				)}
			</div>
		</div>
	);
};

export default VerifyModal;
