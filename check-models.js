// check-models.js
const https = require("https");

// 🔴 PASTE API KEY KAMU DI SINI (Pastikan ini key dari AI Studio)
const API_KEY = process.env.GOOGLE_API_KEY || "";

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("🔍 Sedang bertanya ke Google daftar model yang tersedia...");

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        if (response.error) {
          console.error("❌ ERROR DARI GOOGLE:");
          console.error(JSON.stringify(response.error, null, 2));
        } else if (response.models) {
          console.log("✅ KONEKSI SUKSES! Berikut model yang BISA kamu pakai:");
          console.log("======================================================");
          response.models.forEach((model) => {
            // Kita hanya cari model yang support 'generateContent'
            if (model.supportedGenerationMethods.includes("generateContent")) {
              console.log(`- ${model.name.replace("models/", "")}`);
            }
          });
          console.log("======================================================");
          console.log(
            "👉 Pilihlah salah satu nama di atas untuk ditaruh di kodinganmu."
          );
        } else {
          console.log("⚠️ Respons aneh:", data);
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    });
  })
  .on("error", (err) => {
    console.error("Error Request:", err.message);
  });
