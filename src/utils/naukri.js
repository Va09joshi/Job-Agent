// Naukri scraping utility (uses axios + cheerio)
// npm install axios cheerio
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchNaukriJobs(role) {
  try {
    const query = encodeURIComponent(role);
    const url = `https://www.naukri.com/${query}-jobs`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
    const $ = cheerio.load(data);
    const jobs = [];
    $("article.jobTuple").slice(0, 10).each((i, el) => {
      const title = $(el).find('.title').text().trim();
      const link = $(el).find('.title').attr('href');
      const description = $(el).find('.job-desc').text().trim();
      jobs.push({
        title,
        link,
        description,
        source: 'Naukri',
      });
    });
    return jobs;
  } catch (err) {
    console.error('[Naukri] Scraping error', err);
    return [];
  }
}

module.exports = { fetchNaukriJobs };
