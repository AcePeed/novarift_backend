import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function IronMan1() {
  const title = await Title.create({
    name: 'Iron Man 1',
    details:
      'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.',
    production_company: 'Marvel',
    producers: ['Kevin Feige', 'Avi Arad'],
    main_cast: ['Robert Downey Jr.', 'Jon Favreau', 'Gwyneth Paltrow'],
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
      path: '/myfile',
      audioLanguage: 'EN',
      status: 1,
    },
  ])

  Poster.createMany([
    {
      titleId: title.id,
      path: '/posters/1051995_iron_man_1.jpg',
      language: '*',
      status: 1,
    },
  ])
}
