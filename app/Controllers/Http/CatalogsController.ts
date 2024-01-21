import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Title from 'App/Models/Title'
import Video from 'App/Models/Video'

export default class CatalogsController {
  public async getCatalog({}: HttpContextContract) {
    const titles = (
      await Title.query().preload('posters').where('all_keywords', 'LIKE', '%fyp%')
    ).map((title) => {
      const obj: any = JSON.parse(JSON.stringify(title))
      if (title.posters !== undefined && title.posters.length > 0) {
        obj.img = title.posters[Math.floor(Math.random() * title.posters.length)].path
      }
      obj.id = title.getUrlFromId()
      obj.posters = undefined
      return obj
    })

    return { auth: true, catalog: titles }
  }

  public async getTitle({ request, response }: HttpContextContract) {
    const titleId = Title.getIdFromUrl(request.params().title)
    var title
    try {
      title = await Title.query().preload('posters').where('id', titleId)
      title = title[0]
      if (!title) {
        throw new Error()
      }
    } catch (e) {
      response.status(404)
      return { auth: true, error: 'not found' }
    }
    try {
      const obj = JSON.parse(JSON.stringify(title))
      if (title.posters !== undefined && title.posters.length > 0) {
        obj.img = title.posters[Math.floor(Math.random() * title.posters.length)].path
      }
      obj.posters = undefined
      obj.id = title.getUrlFromId()
      if (obj.is_movie) {
        let episodes = await title.related('episodes').query().where('status', 1).preload('videos')
        obj.watch = episodes[0].videos[0] as Video
        obj.watch = obj.watch.getUrlFromId()
      }
      return { auth: true, title: obj }
    } catch (e) {
      console.log(e)
    }
  }
}
