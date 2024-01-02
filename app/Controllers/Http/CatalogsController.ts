import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Title from 'App/Models/Title'

export default class CatalogsController {
  public async getCatalog({}: HttpContextContract) {
    const titles = (
      await Title.query().preload('posters').where('all_keywords', 'LIKE', '%fyp%')
    ).map((title) => {
      const obj: any = JSON.parse(JSON.stringify(title))
      if (title.posters !== undefined && title.posters.length > 0) {
        obj.img = title.posters[Math.floor(Math.random() * title.posters.length)].path
      }
      obj.posters = undefined
      return obj
    })

    return { auth: true, catalog: titles }
  }

  public async getTitle({ request, response }: HttpContextContract) {
    const titleId = request.params().title
    var title
    try {
      title = await Title.findOrFail(titleId)
    } catch (e) {
      response.status(404)
      return { auth: true, error: 'not found' }
    }
    return title
  }
}
