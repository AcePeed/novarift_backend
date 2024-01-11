import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function BlueBeetle() {
  const title = await Title.create({
    name: 'Blue Beetle',
    details:
      "Jaime Reyes suddenly finds himself in possession of an ancient relic of alien biotechnology called the Scarab. When the Scarab chooses Jaime to be its symbiotic host, he's bestowed with an incredible suit of armor that's capable of extraordinary and unpredictable powers, forever changing his destiny as he becomes the superhero Blue Beetle.",
    production_company: 'DC',
    producers: ['Zev Foreman', 'John Rickard'],
    main_cast: ['Bruna Marquezine', 'Xolo Maridueña'],
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
      path: '/posters/bluebeettle1.jpeg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/bluebeettle2.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/bluebeettle3.jpg',
      language: '*',
      status: 1,
    },
  ])
}
