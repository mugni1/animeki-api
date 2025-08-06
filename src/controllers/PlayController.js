import axios from 'axios';
import dotenv from 'dotenv';
import { httpResponse } from '../libs/httpResponse.js';
import { load } from 'cheerio';
dotenv.config();

const base_url = process.env.BASE_WEB_URL;

export const getEpisode = async (req, res) => {
  const params = req.params;
  const slug = params.slug;

  try {
    const { data } = await axios.get(`${base_url}/${slug}`);
    const $ = load(data);
    let results = null;
    let meta_data = null;
    const title = $('.entry-title').text().trim();
    const updated = $('.updated').text().trim();
    const main_player = $('.player-embed iframe').attr('src');
    const mirror_server = [];
    $('.mirror option').each((i, el) => {
      const server_title = $(el).text().trim();
      const server_src_encode = $(el).attr('value');

      let server_src = null;
      if (server_src_encode) {
        const server_src_decode = atob(server_src_encode); // decode base64
        const $iframe = load(server_src_decode); // parse HTML <iframe>
        server_src = $iframe('iframe').attr('src'); // ambil URL src
      }
      if (server_src) {
        mirror_server.push({ server_title, server_src });
      }
    });
    const prev_episode = $('.naveps a[rel="prev"]').attr('href')?.split('/').filter(Boolean).pop() || null;
    const next_episode = $('.naveps a[rel="next"]').attr('href')?.split('/').filter(Boolean).pop() || null;
    const recomended_animes = [];
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
      recomended_animes.push({ title, slug, type_station, status, cover });
    });

    results = { title, updated, main_player, mirror_server, prev_episode, next_episode, recomended_animes };
    httpResponse(res, 200, 'Successfully get episode', results, null);
  } catch {
    httpResponse(res, 500, 'Internal server error', null, null);
  }
};
