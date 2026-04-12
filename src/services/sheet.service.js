const { google } = require("googleapis");

async function getUsers() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: "v4", auth: client });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "job!A2:Z", // updated to use the correct sheet name
    });

    const rows = res.data.values;

    if (!rows || rows.length === 0) {
      console.log("No data found");
      return [];
    }

    // 🔥 Convert row → user object
    return rows.map((row) => ({
      name: row[1],
      email: row[2],
      background: row[3],
      role: row[4],
      secondaryRole: row[5],
      experience: row[6],
      skills: row[7],
      strengths: row[8],
      score: row[9],
      locationType: row[11],
      location: row[12],
      jobType: row[13],
      industry: row[14],
      salary: row[15],
    }));

  } catch (err) {
    console.error("Error reading sheet:", err);
    return [];
  }
}

module.exports = { getUsers };