import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ViewContent {
  public async handle({ auth, bouncer, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      await auth.check()
      bouncer.authorize('viewContent')
      await next()
    } catch (e) {
      console.log('error in mdlware')
      response.abort({ auth: false, error: e }, 401)
      return
    }
  }
}
