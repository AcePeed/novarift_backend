import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function IronMan2() {
  const title = await Title.create({
    name: 'Iron Man 2',
    details:
      'With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press, and the public to share his technology with the military. Unwilling to let go of his invention, Stark, along with Pepper Potts, and James "Rhodey" Rhodes at his side, must forge new alliances - and confront powerful enemies.',
    production_company: 'Marvel',
    producers: ['Kevin Feige'],
    main_cast: ['Robert Downey Jr.', 'Mickey Rourke', 'Gwyneth Paltrow'],
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
      path: '/posters/IronMan2.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/IronMan2-2.jpg',
      language: '*',
      status: 1,
    },
  ])
}
