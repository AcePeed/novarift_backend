import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function Shazam2() {
  const title = await Title.create({
    name: 'Shazam 2',
    details:
      'Bestowed with the powers of the gods, Billy Batson and his fellow foster kids are still learning how to juggle teenage life with their adult superhero alter egos. When a vengeful trio of ancient gods arrives on Earth in search of the magic stolen from them long ago, Shazam and his allies get thrust into a battle for their superpowers, their lives, and the fate of the world.',
    production_company: 'DC',
    producers: ['David F. Sandberg', 'Zachary Levi'],
    main_cast: ['Zachary Levi', 'Rachel Zegler'],
    keywords: ['fyp', 'superhero'],
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
      path: 'extend/Shazam/ShazamFuryOfGods.mp4',
      audioLanguage: 'EN',
      status: 1,
    },
  ])

  Poster.createMany([
    {
      titleId: title.id,
      path: '/posters/shazam2-1.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/shazam2-2.jpg',
      language: '*',
      status: 1,
    },
  ])
}
