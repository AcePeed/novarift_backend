import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async login({ request, auth, response }: HttpContextContract) {
    try {
      const newUserSchema = schema.create({
        email: schema.string([
          rules.minLength(2),
          rules.maxLength(100),
          rules.trim(),
          rules.escape(),
        ]),
        password: schema.string([rules.minLength(4), rules.maxLength(100)]),
      })
      const payload = await request.validate({ schema: newUserSchema })

      await auth.use('web').attempt(payload.email, payload.password)
      return { auth: true, isAdmin: auth.user!.admin }
    } catch (e) {
      const errorObj = {}

      try {
        e.messages.errors.forEach((element) => {
          errorObj[element.field] = true
        })
      } catch (e2) {
        if (
          e.responseText.includes('E_INVALID_AUTH_UID') ||
          e.responseText.includes('E_INVALID_AUTH_PASSWORD')
        ) {
          response.abort(
            {
              auth: false,
              error: [
                { rule: 'notFound', field: 'email', message: "Email doesn't correspond" },
                { rule: 'notFound', field: 'password', message: "Password doesn't correspond" },
              ],
            },
            401
          )
        }
        response.abort({ error: 'Internal problem' }, 500)
      }
      response.abort({ auth: false, error: e.messages.errors }, 400)
    }
  }

  public async register({ request, response }: HttpContextContract) {
    try {
      const newUserSchema = schema.create({
        fname: schema.string([
          rules.minLength(2),
          rules.maxLength(100),
          rules.trim(),
          rules.escape(),
        ]),
        lname: schema.string([
          rules.minLength(2),
          rules.maxLength(100),
          rules.trim(),
          rules.escape(),
        ]),
        login: schema.string([
          rules.minLength(2),
          rules.maxLength(100),
          rules.trim(),
          rules.escape(),
          rules.unique({ table: 'users', column: 'login' }),
        ]),
        email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
        password: schema.string([rules.confirmed(), rules.minLength(9)]),
      })
      const payload = await request.validate({ schema: newUserSchema })

      await User.create({ ...payload, admin: false })
    } catch (e) {
      const errorObj = {}

      try {
        e.messages.errors.forEach((element) => {
          errorObj[element.field] = true
        })
      } catch (e) {
        response.abort({ error: 'Internal problem' }, 500)
      }
      response.abort({ auth: false, error: e.messages.errors }, 400)
    }
    return { auth: true }
  }

  public async check({ auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    return { auth: true, isAdmin: auth.user!.admin }
  }
}
