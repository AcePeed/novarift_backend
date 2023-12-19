import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    await auth.use('web').attempt(email, password)
    return { auth: true, isAdmin: auth.user!.admin }
  }

  public async check({ auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    return { auth: true }
  }
}
