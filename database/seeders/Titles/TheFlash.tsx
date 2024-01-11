import Episode from 'App/Models/Episode'
import Poster from 'App/Models/Poster'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default async function TheFlash() {
  const title = await Title.create({
    name: 'The Flash',
    details:
      'The series follows Barry Allen, portrayed by Grant Gustin, a crime scene investigator who gains super-human speed, which he uses to fight criminals, along with others who have also gained superhuman abilities. Title card from the first three seasons.',
    production_company: 'DC',
    producers: ['Greg Berlanti', 'Andrew Kreisberg', 'and Geoff Johns'],
    main_cast: ['Grant Gustin', 'Candice Patton', 'Danielle Panabaker', 'Carlos Valdes'],
    keywords: ['fyp', 'superhero'],
    isMovie: false,
    status: 1,
  })

  const episode = await Episode.createMany([
    {
      titleId: title.id,
      status: 1,
      name: 'Pilot',
      season: 1,
      episodeNum: 1,
      details:
        "Orphaned by tragedy and raised by his best friend's father, brilliant CSI Barry Allen gains powers when lightning strikes him during a freak storm; when another meta-human attacks the city, Barry puts his powers to the test.",
    },
    {
      titleId: title.id,
      status: 1,
      name: 'Fastest Man Alive',
      season: 1,
      episodeNum: 2,
      details:
        'Barry experiences a setback while pursuing robbers; Joe is upset with Barry for taking the law into his own hands; Iris becomes more intrigued by the "red streak."',
    },
    {
      titleId: title.id,
      status: 1,
      name: "Things you can't outrun",
      season: 1,
      episodeNum: 3,
      details:
        'Barry and the team track The Mist -- a dangerous new meta-human with toxic gas powers; Joe decides to visit Henry in jail; Eddie and Iris continue to conceal their relationship.',
    },
  ])

  Video.createMany([
    {
      episodeId: episode[0].id,
      path: '/myfile',
      audioLanguage: 'EN',
      status: 1,
    },
    {
      episodeId: episode[1].id,
      path: '/myfile',
      audioLanguage: 'EN',
      status: 1,
    },
    {
      episodeId: episode[2].id,
      path: '/myfile',
      audioLanguage: 'EN',
      status: 1,
    },
  ])

  Poster.createMany([
    {
      titleId: title.id,
      path: '/posters/TheFlash2014-1.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/TheFlash2014-2.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/TheFlash2014-3.jpg',
      language: '*',
      status: 1,
    },
    {
      titleId: title.id,
      path: '/posters/TheFlash2014-4.jpg',
      language: '*',
      status: 1,
    },
  ])
}
