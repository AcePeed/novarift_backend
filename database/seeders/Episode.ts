import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Episode from 'App/Models/Episode'

export default class extends BaseSeeder {
  public async run() {
    Episode.createMany([
      {
        titleId: 1,
        status: 1,
      },
    ])
  }
}
