require("dotenv").config();

const { getUsers } = require("./services/sheet.service");
const { getJobs } = require("./services/jobs.service");
const { matchJobs } = require("./services/ai.service");
const { sendMail } = require("./services/mail.service");

async function run() {
  console.log("🚀 Job Agent Started...\n");

  try {
    const users = await getUsers();

    if (!users.length) {
      console.log("⚠ No users found in sheet.");
      return;
    }

    console.log(`👥 Total Users: ${users.length}\n`);

    for (const user of users) {
      try {
        console.log(`\n🔄 Processing: ${user.email}`);

        // 🧠 1. Fetch Jobs
        const jobs = await getJobs(user.role);

        if (!jobs.length) {
          console.log("❌ No jobs found, skipping...");
          continue;
        }

        console.log(`📄 Jobs fetched: ${jobs.length}`);

        // 🧠 2. AI Matching
        const result = await matchJobs(user, jobs);

        if (!result) {
          console.log("⚠ AI returned empty result");
          continue;
        }

        console.log("🤖 AI matching done");

        // 📧 3. Send Email
        await sendMail(user, result);

        console.log("📧 Email sent successfully");

        // ⏳ Optional delay (avoid rate limits)
        await new Promise(res => setTimeout(res, 2000));

      } catch (err) {
        console.error(`❌ Error for user ${user.email}:`, err.message);
      }
    }

    console.log("\n✅ Job Agent Completed");

  } catch (err) {
    console.error("🔥 System Failed:", err.message);
  }
}

run();