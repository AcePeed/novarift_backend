import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Title from 'App/Models/Title'
import Episode from 'App/Models/Episode'
import Video from 'App/Models/Video'

export default class extends BaseSeeder {
  public async run() {
    await Title.createMany([
      {
        name: 'Blue Beetle',
        details:
          "Jaime Reyes suddenly finds himself in possession of an ancient relic of alien biotechnology called the Scarab. When the Scarab chooses Jaime to be its symbiotic host, he's bestowed with an incredible suit of armor that's capable of extraordinary and unpredictable powers, forever changing his destiny as he becomes the superhero Blue Beetle.",
        production_company: 'DC',
        producers: ['Zev Foreman', 'John Rickard'],
        main_cast: ['Bruna Marquezine', 'Xolo Maridueña'],
        isMovie: true,
        status: 1,
      },
      {
        name: 'Iron Man',
        details:
          'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.',
        production_company: 'Marvel',
        producers: ['Kevin Feige', 'Avi Arad'],
        main_cast: ['Robert Downey Jr.', 'Jon Favreau', 'Gwyneth Paltrow'],
        isMovie: true,
        status: 1,
      },
    ])

    // ________________________________________

    await Episode.createMany([
      {
        titleId: 1,
        status: 1,
      },
    ])

    // ___________________________________________

    Video.createMany([
      {
        episodeId: 1,
        path: '/myfile',
        audioLanguage: 'EN',
        status: 1,
      },
    ])
  }
}
