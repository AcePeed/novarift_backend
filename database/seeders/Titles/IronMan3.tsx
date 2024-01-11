import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function IronMan3() {
  const title = await Title.create({
    name: 'Iron Man 3',
    details:
      'Marvel\'s "Iron Man 3" pits brash-but-brilliant industrialist Tony Stark/Iron Man against an enemy whose reach knows no bounds. When Stark finds his personal world destroyed at his enemy\'s hands, he embarks on a harrowing quest to find those responsible. This journey, at every turn, will test his mettle. With his back against the wall, Stark is left to survive by his own devices, relying on his ingenuity and instincts to protect those closest to him. As he fights his way back, Stark discovers the answer to the question that has secretly haunted him: does the man make the suit or does the suit make the man?',
    production_company: 'Marvel',
    producers: ['Kevin Feige'],
    main_cast: ['Robert Downey Jr.', 'Guy Pearce', 'Gwyneth Paltrow'],
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
      path: '/posters/IronMan3.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/IronMan3-2.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/IronMan3-3.jpg',
      language: '*',
      status: 1,
    },
  ])
}
