import e from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Schedule from './routes/Schedule.js';
import Ongoing from './routes/Ongoing.js';
import Completed from './routes/Completed.js';
import Movie from './routes/Movie.js';
import Gentres from './routes/Gentre.js';
import Search from './routes/Search.js';
import Studios from './routes/Studio.js';
import DetailAnime from './routes/DetailAnime.js';
import ActorCast from './routes/ActorCast.js';
import Play from './routes/Play.js';
import Home from './routes/Home.js';

// INITIALIAZATION
dotenv.config();
const app = e();
app.use(cors());

// HOST & PORT
const PORT = process.env.PORT_APP;
const HOST = process.env.HOST_APP;

// ROUTER
app.get('/', (req, res) => {
  res.send('HALLO BOY');
});
app.use(Home);
app.use(Schedule);
app.use(Ongoing);
app.use(Completed);
app.use(Movie);
app.use(Gentres);
app.use(Studios);
app.use(Search);
app.use(DetailAnime);
app.use(ActorCast);
app.use(Play);

// LISTEN
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

export default app; // penting untuk Vercel
