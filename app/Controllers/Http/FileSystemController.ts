import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'

export default class FileSystemController {
  public async poster({ bouncer, response, params, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    await bouncer.authorize('viewContent')

    const file: string = params['path']

    if (fs.existsSync('./resources/posters/')) {
      response.abort('Resource Not Found', 404)
    }

    const image = fs.createReadStream('./resources/posters/' + file)
    response.stream(image)
    return {}
  }
}
