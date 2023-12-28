import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'

export default class FileSystemController {
  public async poster({ auth, response, params }: HttpContextContract) {
    await auth.use('web').authenticate()

    const file: string = params['path']

    const image = fs.createReadStream('./resources/posters/' + file)
    response.stream(image)
    return {}
  }
}
