import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        fname: 'Mohammed',
        lname: 'Benmansour',
        email: 'benmansour.mohammed2002@gmail.com',

        display: 'AcePeaX',
        login: 'admin',
        password: 'admin',

        admin: true,
        superuser: true,
      },
      {
        fname: 'Mohammed',
        lname: 'Benmansour',
        email: 'benmansour.mohammed_test@gmail.com',

        display: 'AcePeaX',
        login: 'test',
        password: 'test',

        admin: false,
      },
    ])
  }
}
