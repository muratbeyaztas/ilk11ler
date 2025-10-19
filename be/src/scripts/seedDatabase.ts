import {
	connectDatabase,
	disconnectDatabase,
} from "../infrastructure/database/connection";
import { TeamModel } from "../infrastructure/database/models/TeamModel";
import { PlayerPosition, Formation } from "../domain/entities/Team";

const superLigTeams = [
	{
		name: "Galatasaray",
		logo: "https://upload.wikimedia.org/wikipedia/tr/thumb/2/20/Galatasaray_SK_Logo.svg/200px-Galatasaray_SK_Logo.svg.png",
		stadium: "Ali Sami Yen Spor Kompleksi",
		city: "İstanbul",
		foundedYear: 1905,
		colors: ["#FDB913", "#D2122E"],
		coach: {
			teamId: "",
			name: "Okan Buruk",
			photo:
				"https://img.a.transfermarkt.technology/portrait/header/10339-1671435885.jpg?lm=1",
			nationality: "Türkiye",
			age: 50,
		},
		players: [
			// Goalkeeper
			{
				teamId: "",
				name: "Fernando Muslera",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/73347-1635161954.jpg?lm=1",
				number: 1,
				position: PlayerPosition.GOALKEEPER,
				age: 37,
				nationality: "Uruguay",
				height: 190,
				weight: 82,
			},

			// Defenders
			{
				teamId: "",
				name: "Sacha Boey",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/490369-1671435885.jpg?lm=1",
				number: 93,
				position: PlayerPosition.DEFENDER,
				age: 23,
				nationality: "Fransa",
				height: 180,
				weight: 75,
			},
			{
				teamId: "",
				name: "Davinson Sanchez",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 6,
				position: PlayerPosition.DEFENDER,
				age: 27,
				nationality: "Kolombiya",
				height: 187,
				weight: 84,
			},
			{
				teamId: "",
				name: "Abdülkerim Bardakcı",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/178299-1671435885.jpg?lm=1",
				number: 42,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Türkiye",
				height: 188,
				weight: 82,
			},
			{
				teamId: "",
				name: "Angeliño",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 17,
				position: PlayerPosition.DEFENDER,
				age: 27,
				nationality: "İspanya",
				height: 171,
				weight: 65,
			},

			// Midfielders
			{
				teamId: "",
				name: "Lucas Torreira",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 34,
				position: PlayerPosition.MIDFIELDER,
				age: 28,
				nationality: "Uruguay",
				height: 168,
				weight: 65,
			},
			{
				teamId: "",
				name: "Kerem Demirbay",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 10,
				position: PlayerPosition.MIDFIELDER,
				age: 30,
				nationality: "Türkiye",
				height: 175,
				weight: 72,
			},
			{
				teamId: "",
				name: "Berkan Kutlu",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 22,
				position: PlayerPosition.MIDFIELDER,
				age: 25,
				nationality: "Türkiye",
				height: 180,
				weight: 75,
			},
			{
				teamId: "",
				name: "Hakim Ziyech",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 7,
				position: PlayerPosition.MIDFIELDER,
				age: 30,
				nationality: "Fas",
				height: 180,
				weight: 71,
			},

			// Forwards
			{
				teamId: "",
				name: "Mauro Icardi",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 9,
				position: PlayerPosition.FORWARD,
				age: 30,
				nationality: "Arjantin",
				height: 181,
				weight: 75,
			},
			{
				teamId: "",
				name: "Barış Alper Yılmaz",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 53,
				position: PlayerPosition.FORWARD,
				age: 24,
				nationality: "Türkiye",
				height: 180,
				weight: 75,
			},
		],
	},
	{
		name: "Fenerbahçe",
		logo: "https://upload.wikimedia.org/wikipedia/tr/thumb/4/4c/Fenerbahçe_SK_logo.svg/200px-Fenerbahçe_SK_logo.svg.png",
		stadium: "Ülker Stadyumu",
		city: "İstanbul",
		foundedYear: 1907,
		colors: ["#FFED00", "#002D72"],
		coach: {
			teamId: "",
			name: "İsmail Kartal",
			photo:
				"https://img.a.transfermarkt.technology/portrait/header/10339-1671435885.jpg?lm=1",
			nationality: "Türkiye",
			age: 62,
		},
		players: [
			// Goalkeeper
			{
				teamId: "",
				name: "Dominik Livakovic",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 40,
				position: PlayerPosition.GOALKEEPER,
				age: 29,
				nationality: "Hırvatistan",
				height: 187,
				weight: 82,
			},

			// Defenders
			{
				teamId: "",
				name: "Bright Osayi-Samuel",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 21,
				position: PlayerPosition.DEFENDER,
				age: 26,
				nationality: "Nijerya",
				height: 178,
				weight: 71,
			},
			{
				teamId: "",
				name: "Alexander Djiku",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 6,
				position: PlayerPosition.DEFENDER,
				age: 29,
				nationality: "Gana",
				height: 188,
				weight: 80,
			},
			{
				teamId: "",
				name: "Çağlar Söyüncü",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 4,
				position: PlayerPosition.DEFENDER,
				age: 28,
				nationality: "Türkiye",
				height: 187,
				weight: 80,
			},
			{
				teamId: "",
				name: "Ferdi Kadıoğlu",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 7,
				position: PlayerPosition.DEFENDER,
				age: 24,
				nationality: "Türkiye",
				height: 175,
				weight: 70,
			},

			// Midfielders
			{
				teamId: "",
				name: "Fred",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 35,
				position: PlayerPosition.MIDFIELDER,
				age: 30,
				nationality: "Brezilya",
				height: 169,
				weight: 64,
			},
			{
				teamId: "",
				name: "İsmail Yüksek",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 5,
				position: PlayerPosition.MIDFIELDER,
				age: 25,
				nationality: "Türkiye",
				height: 185,
				weight: 75,
			},
			{
				teamId: "",
				name: "Sebastian Szymanski",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 53,
				position: PlayerPosition.MIDFIELDER,
				age: 25,
				nationality: "Polonya",
				height: 175,
				weight: 70,
			},
			{
				teamId: "",
				name: "İrfan Can Kahveci",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 17,
				position: PlayerPosition.MIDFIELDER,
				age: 29,
				nationality: "Türkiye",
				height: 175,
				weight: 70,
			},

			// Forwards
			{
				teamId: "",
				name: "Edin Dzeko",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 9,
				position: PlayerPosition.FORWARD,
				age: 37,
				nationality: "Bosna-Hersek",
				height: 193,
				weight: 84,
			},
			{
				teamId: "",
				name: "Dusan Tadic",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 10,
				position: PlayerPosition.FORWARD,
				age: 35,
				nationality: "Sırbistan",
				height: 181,
				weight: 76,
			},
		],
	},
	{
		name: "Beşiktaş",
		logo: "https://upload.wikimedia.org/wikipedia/tr/thumb/2/2a/Beşiktaş_JK_logo.svg/200px-Beşiktaş_JK_logo.svg.png",
		stadium: "Vodafone Park",
		city: "İstanbul",
		foundedYear: 1903,
		colors: ["#000000", "#FFFFFF"],
		coach: {
			teamId: "",
			name: "Fernando Santos",
			photo:
				"https://img.a.transfermarkt.technology/portrait/header/10339-1671435885.jpg?lm=1",
			nationality: "Portekiz",
			age: 69,
		},
		players: [
			// Goalkeeper
			{
				teamId: "",
				name: "Mert Günok",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 34,
				position: PlayerPosition.GOALKEEPER,
				age: 35,
				nationality: "Türkiye",
				height: 190,
				weight: 85,
			},

			// Defenders
			{
				teamId: "",
				name: "Arthur Masuaku",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 26,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Kongo DC",
				height: 178,
				weight: 70,
			},
			{
				teamId: "",
				name: "Arthur Masuaku",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 26,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Kongo DC",
				height: 178,
				weight: 70,
			},
			{
				teamId: "",
				name: "Arthur Masuaku",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 26,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Kongo DC",
				height: 178,
				weight: 70,
			},
			{
				teamId: "",
				name: "Arthur Masuaku",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 26,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Kongo DC",
				height: 178,
				weight: 70,
			},

			// Midfielders
			{
				teamId: "",
				name: "Gedson Fernandes",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 83,
				position: PlayerPosition.MIDFIELDER,
				age: 25,
				nationality: "Portekiz",
				height: 180,
				weight: 75,
			},
			{
				teamId: "",
				name: "Gedson Fernandes",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 83,
				position: PlayerPosition.MIDFIELDER,
				age: 25,
				nationality: "Portekiz",
				height: 180,
				weight: 75,
			},
			{
				teamId: "",
				name: "Gedson Fernandes",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 83,
				position: PlayerPosition.MIDFIELDER,
				age: 25,
				nationality: "Portekiz",
				height: 180,
				weight: 75,
			},
			{
				teamId: "",
				name: "Gedson Fernandes",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 83,
				position: PlayerPosition.MIDFIELDER,
				age: 25,
				nationality: "Portekiz",
				height: 180,
				weight: 75,
			},

			// Forwards
			{
				teamId: "",
				name: "Vincent Aboubakar",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 9,
				position: PlayerPosition.FORWARD,
				age: 32,
				nationality: "Kamerun",
				height: 184,
				weight: 82,
			},
			{
				teamId: "",
				name: "Cenk Tosun",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 23,
				position: PlayerPosition.FORWARD,
				age: 33,
				nationality: "Türkiye",
				height: 188,
				weight: 85,
			},
		],
	},
	{
		name: "Trabzonspor",
		logo: "https://upload.wikimedia.org/wikipedia/tr/thumb/7/7a/Trabzonspor_logo.svg/200px-Trabzonspor_logo.svg.png",
		stadium: "Medical Park Stadyumu",
		city: "Trabzon",
		foundedYear: 1967,
		colors: ["#800080", "#FFD700"],
		coach: {
			teamId: "",
			name: "Abdullah Avcı",
			photo:
				"https://img.a.transfermarkt.technology/portrait/header/10339-1671435885.jpg?lm=1",
			nationality: "Türkiye",
			age: 60,
		},
		players: [
			// Goalkeeper
			{
				teamId: "",
				name: "Uğurcan Çakır",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 1,
				position: PlayerPosition.GOALKEEPER,
				age: 28,
				nationality: "Türkiye",
				height: 190,
				weight: 85,
			},

			// Defenders
			{
				teamId: "",
				name: "Stefano Denswil",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 4,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Hollanda",
				height: 185,
				weight: 80,
			},
			{
				teamId: "",
				name: "Stefano Denswil",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 4,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Hollanda",
				height: 185,
				weight: 80,
			},
			{
				teamId: "",
				name: "Stefano Denswil",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 4,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Hollanda",
				height: 185,
				weight: 80,
			},
			{
				teamId: "",
				name: "Stefano Denswil",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 4,
				position: PlayerPosition.DEFENDER,
				age: 30,
				nationality: "Hollanda",
				height: 185,
				weight: 80,
			},

			// Midfielders
			{
				teamId: "",
				name: "Okay Yokuşlu",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 6,
				position: PlayerPosition.MIDFIELDER,
				age: 30,
				nationality: "Türkiye",
				height: 185,
				weight: 80,
			},
			{
				teamId: "",
				name: "Okay Yokuşlu",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 6,
				position: PlayerPosition.MIDFIELDER,
				age: 30,
				nationality: "Türkiye",
				height: 185,
				weight: 80,
			},
			{
				teamId: "",
				name: "Okay Yokuşlu",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 6,
				position: PlayerPosition.MIDFIELDER,
				age: 30,
				nationality: "Türkiye",
				height: 185,
				weight: 80,
			},
			{
				teamId: "",
				name: "Okay Yokuşlu",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 6,
				position: PlayerPosition.MIDFIELDER,
				age: 30,
				nationality: "Türkiye",
				height: 185,
				weight: 80,
			},

			// Forwards
			{
				teamId: "",
				name: "Paul Onuachu",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 9,
				position: PlayerPosition.FORWARD,
				age: 30,
				nationality: "Nijerya",
				height: 201,
				weight: 90,
			},
			{
				teamId: "",
				name: "Enis Destan",
				photo:
					"https://img.a.transfermarkt.technology/portrait/header/340123-1671435885.jpg?lm=1",
				number: 7,
				position: PlayerPosition.FORWARD,
				age: 22,
				nationality: "Türkiye",
				height: 180,
				weight: 75,
			},
		],
	},
];

async function seedDatabase() {
	try {
		console.log("🌱 Veritabanı seed işlemi başlıyor...");

		// Veritabanına bağlan
		await connectDatabase();
		console.log("✅ MongoDB bağlantısı başarılı");

		// Mevcut verileri temizle
		await TeamModel.deleteMany({});
		console.log("🗑️ Mevcut veriler temizlendi");

		// Takımları ekle
		for (const teamData of superLigTeams) {
			const team = new TeamModel(teamData);
			await team.save();
			console.log(`✅ ${teamData.name} takımı eklendi`);
		}

		console.log("🎉 Seed işlemi başarıyla tamamlandı!");
		console.log(`📊 Toplam ${superLigTeams.length} takım eklendi`);

		// Veritabanı bağlantısını kapat
		await disconnectDatabase();
		console.log("🔌 Veritabanı bağlantısı kapatıldı");
	} catch (error) {
		console.error("❌ Seed hatası:", error);
		process.exit(1);
	}
}

// Script çalıştırıldığında seed işlemini başlat
if (require.main === module) {
	seedDatabase();
}

export { seedDatabase };
