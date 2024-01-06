import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminContent {
  public async handle({ auth, bouncer, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let isAuth = false
    try {
      isAuth = await auth.check()
      await bouncer.authorize('viewAdmin')
    } catch (e) {
      response.abort({ auth: isAuth, error: 'Not authorized' }, 401)
    }
    await next()
  }
}
