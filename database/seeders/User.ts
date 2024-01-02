import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']
  public async run() {
    await User.createMany([
      {
        fname: 'Ace',
        lname: 'PeaX',
        email: 'admin@gmail.com',

        display: 'AcePeaX',
        login: 'admin',
        password: 'admin',

        admin: true,
        superuser: true,
      },
      {
        fname: 'Ace',
        lname: 'PeaX',
        email: 'test@gmail.com',

        display: 'AcePeaX',
        login: 'test',
        password: 'test',

        admin: false,
      },
    ])
  }
}
