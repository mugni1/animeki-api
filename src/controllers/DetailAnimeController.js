import axios from 'axios';
import dotenv from 'dotenv';
import { httpResponse } from '../libs/httpResponse.js';
import { load } from 'cheerio';
dotenv.config();

const base_url = process.env.BASE_WEB_URL;

export const getDetailAnime = async (req, res) => {
  const params = req.params;
  const slug = params.slug;

  try {
    const { data } = await axios.get(`${base_url}/anime/${slug}`);
    const $ = load(data);
    let results = null;
    let meta_data = null;

    const cover = $('.thumb img').attr('src');
    const trailer = $('.rt a').attr('href')?.split('=').pop() || null;
    const rating = Number($('.rt .rating strong').text().trim().split(' ').pop());
    const title = $('.infox h1').text().trim();
    const spe = [];
    $('.spe span').each((i, el) => {
      const title = $(el).find('b').text().trim().replace(':', '');
      const value = $(el).text().trim().replace('"', '')?.split(':').pop().trim() || null;
      const slug = $(el).find('a').attr('href')?.split('/')?.filter(Boolean).pop() || null;
      spe.push({
        title: title,
        content: value,
        slug
      });
    });
    const gentres = [];
    $('.genxed a').each((i, el) => {
      const title = $(el).text().trim() || null;
      const slug = $(el).attr('href')?.split('/')?.filter(Boolean).pop() || null;
      gentres.push({ title, slug });
    });
    const synopsis = $('.entry-content p').text();
    const character_and_actor = [];
    $('.cvitempad').each((i, el) => {
      const charater_image = $(el).find('.cvchar .cvcover img').attr('src') || null;
      const charater_name = $(el).find('.cvchar .cvcontent .charname').text().trim() || null;
      const charater_role = $(el).find('.cvchar .cvcontent .charrole').text().trim() || null;
      const actor_image = $(el).find('.cvactor .cvcover a img').attr('src') || null;
      const actor_name = $(el).find('.cvactor .cvcontent .charname a').text().trim() || null;
      const actor_slug = $(el).find('.cvactor .cvcontent .charname a').attr('href')?.split('/').filter(Boolean).pop() || null;
      const actor_role = $(el).find('.cvactor .cvcontent .charrole').text().trim() || null;
      character_and_actor.push({ charater_image, charater_name, charater_role, actor_image, actor_name, actor_slug, actor_role });
    });
    const episodes = [];
    $('.eplister ul li a').each((i, el) => {
      const episode_slug = $(el).attr('href')?.split('/').filter(Boolean).pop() || null;
      const episode_number = $(el).find('.epl-num').text().trim();
      const episode_title = $(el).find('.epl-title').text().trim();
      const episode_date = $(el).find('.epl-date').text().trim();
      episodes.push({ episode_slug, episode_number, episode_title, episode_date });
    });
    const first_episode = [...episodes].pop();
    const last_episode = [...episodes].shift();
    results = { cover, trailer, rating, title, spe, gentres, synopsis, character_and_actor, first_episode, last_episode, episodes };
    httpResponse(res, 200, 'Successfully get detail ' + slug, results, slug);
  } catch (err) {
    console.log(err);
    httpResponse(res, 500, 'Internal server error', null, null);
  }
};
