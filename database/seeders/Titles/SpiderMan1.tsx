import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function SpiderMan1() {
  const title = await Title.create({
    name: 'Spider Man 1',
    details:
      "Based on Marvel Comics' superhero character, this is a story of Peter Parker who is a nerdy high-schooler. He was orphaned as a child, bullied by jocks, and can't confess his crush for his stunning neighborhood girl Mary Jane Watson. To say his life is \"miserable\" is an understatement. But one day while on an excursion to a laboratory a runaway radioactive spider bites him... and his life changes in a way no one could have imagined. Peter acquires a muscle-bound physique, clear vision, ability to cling to surfaces and crawl over walls, shooting webs from his wrist ... but the fun isn't going to last. An eccentric millionaire Norman Osborn administers a performance enhancing drug on himself and his maniacal alter ego Green Goblin emerges. Now Peter Parker has to become Spider-Man and take Green Goblin to the task... or else Goblin will kill him. They come face to face and the war begins in which only one of them will survive at the end.",
    production_company: 'Marvel',
    producers: ['Laura Ziskin', 'Ian Bryce'],
    main_cast: ['Tobey Maguire', 'Kirsten Dunst', 'Willem Dafoe'],
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
      path: '/posters/spiderman1-1.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/spiderman1-2.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/spiderman1-3.png',
      language: '*',
      status: 1,
    },
  ])
}
