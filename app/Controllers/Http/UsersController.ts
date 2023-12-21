import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    await auth.use('web').attempt(email, password)
    return { auth: true, isAdmin: auth.user!.admin }
  }

  public async register({ request }: HttpContextContract) {
    User.create({
      fname: request.input('fname'),
      lname: request.input('lname'),
      email: request.input('email'),
      login: request.input('login'),
      password: request.input('password'),
      admin: false,
    })
    return { auth: true }
  }

  public async check({ auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    return { auth: true, isAdmin: auth.user!.admin }
  }
}
