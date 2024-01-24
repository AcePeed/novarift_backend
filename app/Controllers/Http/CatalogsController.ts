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

  public async getVideoProperties({ params, response }) {
    let video: Video
    try {
      try {
        video = await Video.findOrFail(Video.getIdFromUrl(params['id']))
      } catch (e) {
        response.status(404)
        return 'Resource Not Found'
      }

      if (video.status !== 1) {
        response.status(403)
        return 'Resource Not Available'
      }

      const episodeArr = await video.related('episodes').query().preload('titles')
      const episode = episodeArr[0]
      if (episode.status !== 1 || episode.titles.status !== 1) {
        response.status(403)
        return 'Resource Not Available'
      }

      const videoObj = JSON.parse(JSON.stringify(video))
      videoObj.episode = JSON.parse(JSON.stringify(episode))
      videoObj.title = JSON.parse(JSON.stringify(episode.titles))

      videoObj.episodes = undefined
      videoObj.episode.titles = undefined

      return { auth: true, video: videoObj }
    } catch (e) {
      response.status(500)
      console.log(e)
      return 'Server Error'
    }
  }
}
