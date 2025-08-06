import axios from 'axios';
import { load } from 'cheerio';
import { httpResponse } from '../libs/httpResponse.js';
import dotenv from 'dotenv';
dotenv.config();

const base_url = process.env.BASE_WEB_URL;

export const getSchedule = async (req, res) => {
  try {
    const { data } = await axios.get(`${base_url}/jadwal-on-going-anime`);
    const $ = load(data);
    const results = [];
    $('.bixbox.schedulepage').each((index, element) => {
      const day = $(element).find('.releases h3 span').text().trim();
      const animes = [];
      $(element)
        .find('.listupd .bs .bsx a')
        .each((index, element) => {
          const title = $(element).attr('title');
          const slug = $(element).attr('href').split('/').filter(Boolean).pop();
          const cover = $(element).find('.limit img').attr('src');
          const release_eps = $(element).find('.limit .bt .sb').text().trim();
          animes.push({ title, cover, release_eps, slug });
        });
      results.push({ day, animes });
    });

    httpResponse(res, 200, 'Successfully get schedule anime', results, null);
  } catch {
    httpResponse(res, 500, 'Internal server error', null, null);
  }
};
