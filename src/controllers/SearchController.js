import axios from 'axios';
import dotenv from 'dotenv';
import { httpResponse } from '../libs/httpResponse.js';
import { load } from 'cheerio';
dotenv.config();

const base_url = process.env.BASE_WEB_URL;

export const getSearchAnime = async (req, res) => {
  const query = req.query;
  const keyword = query.keyword || '';
  const page = query.page || 1;
  try {
    const { data } = await axios.get(`${base_url}/page/${page}/?s=${keyword}`);
    const $ = load(data);
    const results = [];
    let meta_data = null;

    // base_result
    $('.bsx a').each((i, el) => {
      const title = $(el).attr('title');
      const slug = $(el).attr('href').split('/').filter(Boolean).pop();
      let type_station = null;
      let status = null;
      let cover = null;

      $(el)
        .find('.limit')
        .each((i, el) => {
          type_station = $(el).find('.typez').text().trim();
          status = $(el).find('.bt .epx').text().trim();
          cover = $(el).find('img').attr('src');
        });

      results.push({ title, slug, type_station, status, cover });
    });
    // metadata
    $('.pagination').each((i, el) => {
      const current_page = Number($(el).find('.current').text().trim());
      const prev_page = $(el).find('.prev').text().trim() ? Number(current_page) - 1 : null;
      const next_page = $(el).find('.next').text().trim() ? Number(current_page) + 1 : null;
      const list_page = [];
      $(el)
        .find('a.page-numbers:not(.prev):not(.next)')
        .each((i, el) => {
          const page = $(el).text().trim();
          list_page.push(Number(page));
        });
      const total_records = [...list_page].pop();
      meta_data = {
        prev_page,
        current_page,
        next_page,
        list_page,
        total_records
      };
    });

    httpResponse(res, 200, 'Successfully get ongoing animes', results, meta_data);
  } catch {
    httpResponse(res, 500, 'Internal server error', null, null);
  }
};
