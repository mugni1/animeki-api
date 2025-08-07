import e from 'express';
const router = e.Router();
import axios from 'axios';
import dotenv from 'dotenv';
import { httpResponse } from '../libs/httpResponse.js';
import { load } from 'cheerio';
dotenv.config();
const base_url = process.env.BASE_WEB_URL;

router.get('/home', async (req, res) => {
  try {
    const { data } = await axios(`${base_url}`);
    const $ = load(data);
    let results = null;
    const meta_data = null;

    const ongoing_anime = [];
    $('.bs:not(.styleegg):not(.stylefor) .bsx a').each((i, el) => {
      const title = $(el).attr('title');
      const slug = $(el).attr('href').split('/').filter(Boolean).pop();
      const type_station = $(el).find('.limit .typez').text();
      const episode = $(el).find('.limit .bt .epx').text().split(' ').pop();
      const cover = $(el).find('.limit img').attr('src');
      ongoing_anime.push({ title, slug, type_station, episode, cover });
    });

    const completed_anime = [];
    $('.styleegg .bsx a').each((i, el) => {
      const title = $(el).attr('title');
      const slug = $(el).attr('href').split('/').filter(Boolean).pop();
      const type_station = $(el).find('.limit .egghead .eggmeta .eggtype').text();
      const episode = $(el).find('.limit .egghead .eggmeta .eggepisode').text().split(' ').pop();
      const cover = $(el).find('.limit img').attr('src');
      completed_anime.push({ title, slug, type_station, episode, cover });
    });

    results = { ongoing_anime, completed_anime };
    httpResponse(res, 200, 'Successfully get animes', results, meta_data);
  } catch {
    httpResponse(res, 500, 'Internal Server Errors', null, null);
  }
});

export default router;
