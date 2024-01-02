import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ViewContent {
  public async handle({ auth, bouncer, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      await auth.check()
      await bouncer.authorize('viewContent')
      await next()
    } catch (e) {
      if (String(e).includes('E_AUTHORIZATION_FAILURE')) {
        response.abort({ auth: false, error: e }, 401)
      } else {
        response.abort('Internal Server Error. Sorry !(', 500)
        console.error(e)
      }

      return
    }
  }
}
