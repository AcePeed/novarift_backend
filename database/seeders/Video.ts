import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Video from 'App/Models/Video'

export default class extends BaseSeeder {
  public async run() {
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
