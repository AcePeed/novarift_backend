import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CatalogsController {
  public async getCatalog({ auth }: HttpContextContract) {
    auth.check()
    return { catalog: 'hey' }
  }
}
