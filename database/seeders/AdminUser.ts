import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing', 'production']
  public async run() {
    // Write your database queries inside the run method

    if (process.env.ADMIN_LOGIN === undefined) {
      throw Error('No ADMIN_LOGIN environment variable defined')
    }
    if (process.env.ADMIN_PSSWD === undefined) {
      throw Error('No ADMIN_PSSWD environment variable defined')
    }

    await User.create({
      fname: 'Main',
      lname: 'Admin',
      email: '',

      display: 'Admin',
      login: process.env.ADMIN_LOGIN,
      password: process.env.ADMIN_PSSWD,

      admin: true,
      superuser: true,
    })
  }
}
