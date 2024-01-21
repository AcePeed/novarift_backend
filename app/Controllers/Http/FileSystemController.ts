import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from 'App/Models/Video'
import fs from 'fs'

export default class FileSystemController {
  public async poster({ bouncer, request, response, params, auth }: HttpContextContract) {
    if (request.input('from') !== 'localhost') {
      if (request.hostname() !== process.env.IMAGE_HOSTNAME) {
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

  public async video({ bouncer, response, params, auth }: HttpContextContract) {
    await auth.use('web').check()
    await bouncer.authorize('viewContent')

    let video: Video
    try {
      video = await Video.findOrFail(Video.getIdFromUrl(params['id']))

      if (video.status !== 1) {
        response.status(404)
        return 'Resource Not Available'
      }

      const file: string = video.path

      if (!fs.existsSync('./resources/videos/' + file)) {
        response.status(500)
        return 'Resource Found, but points to an invalid file'
      }

      response.append('Accept-Ranges', 'bytes')
      response.attachment('./resources/videos/' + file, file + 'jpg', 'inline')
      return {}
    } catch (e) {
      response.status(404)
      return 'Resource Not Found'
    }
  }
}
