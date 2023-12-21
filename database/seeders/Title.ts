import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Title from 'App/Models/Title'

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
    ])
  }
}
