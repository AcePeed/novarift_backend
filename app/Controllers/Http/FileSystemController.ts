import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'

export default class FileSystemController {
  public async poster({ bouncer, request, response, params, auth }: HttpContextContract) {
    if (request.input('from') !== 'localhost') {
      if (request.hostname() !== 'localhost') {
        response.abort('Resource Not Found', 401)
      }
      await auth.use('web').check()
      await bouncer.authorize('viewContent')
    }

    const file: string = (params['*'] + '').replaceAll(',', '/')

    if (!fs.existsSync('./resources/posters/' + file)) {
      response.abort('Resource Not Found', 404)
    }

    /*const image = fs.createReadStream('./resources/posters/' + file)
    response.stream(image)*/

    //const filePath = Application.tmpPath('uploads/some-file.jpg')
    response.download('./resources/posters/' + file)
    return {}
  }
}
