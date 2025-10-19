import { useState } from "react";
import useStore from "../store/useStore";
import { userService } from "../services/api";

const RegisterModal = () => {
	const { closeModal, openModal } = useStore();
	const [contactMethod, setContactMethod] = useState<"email" | "phone">(
		"email"
	);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const data = contactMethod === "email" ? { email } : { phone };
			await userService.register(data);

			closeModal();
			openModal("verify");
		} catch (err: any) {
			setError(err.response?.data?.message || "Bir hata oluştu");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
				<div className="p-6 border-b">
					<div className="flex items-center justify-between">
						<h3 className="text-2xl font-bold text-gray-800">Kadroyu Kaydet</h3>
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

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<p className="text-gray-600">
						Kadro seçiminizi kaydetmek için email veya telefon numaranızı girin.
						Size bir doğrulama kodu göndereceğiz.
					</p>

					{/* Contact Method Selection */}
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => setContactMethod("email")}
							className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
								contactMethod === "email"
									? "bg-red-600 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							Email
						</button>
						<button
							type="button"
							onClick={() => setContactMethod("phone")}
							className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
								contactMethod === "phone"
									? "bg-red-600 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							Telefon
						</button>
					</div>

					{/* Input Field */}
					{contactMethod === "email" ? (
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Email Adresi
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="ornek@email.com"
								required
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
							/>
						</div>
					) : (
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Telefon Numarası
							</label>
							<input
								type="tel"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="+90 5XX XXX XX XX"
								required
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
							/>
						</div>
					)}

					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
							{error}
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className={`w-full py-3 rounded-lg font-semibold transition-all ${
							loading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
						}`}
					>
						{loading ? "Gönderiliyor..." : "Doğrulama Kodu Gönder"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default RegisterModal;
