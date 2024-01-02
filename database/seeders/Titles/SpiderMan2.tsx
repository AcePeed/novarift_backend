import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function SpiderMan2() {
  const title = await Title.create({
    name: 'Spider Man 2',
    details:
      "Peter Parker is an unhappy man: after two years of fighting crime as Spider-Man, his life has begun to fall apart. The girl he loves is engaged to someone else, his grades are slipping, he cannot keep any of his jobs, and on top of it, the newspaper Daily Bugle is attacking him viciously, claiming that Spider-Man is a criminal. He reaches the breaking point and gives up the crime fighter's life, once and for all. But after a failed fusion experiment, eccentric and obsessive scientist Dr. Otto Octavius is transformed into super villain Doctor Octopus, Doc Ock for short, having four long tentacles as extra hands. Peter guesses it might just be time for Spider-Man to return, but would he act upon it?",
    production_company: 'Marvel',
    producers: ['Laura Ziskin', 'Avi Arad', 'Lorne Orleans'],
    main_cast: ['Tobey Maguire', 'Kirsten Dunst', 'Alfred Molina'],
    keywords: ['fyp'],
    isMovie: true,
    status: 1,
  })

  const episode = await Episode.create({
    titleId: title.id,
    status: 1,
  })

  Video.createMany([
    {
      episodeId: episode.id,
      path: '/myfile',
      audioLanguage: 'EN',
      status: 1,
    },
  ])

  Poster.createMany([
    {
      titleId: title.id,
      path: '/posters/spiderman2.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/spiderman2-2.jpg',
      language: '*',
      status: 1,
    },
  ])
}
