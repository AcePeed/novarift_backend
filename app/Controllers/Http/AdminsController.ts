import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Title from 'App/Models/Title'
import User from 'App/Models/User'

export default class AdminsController {
  public async main({}: HttpContextContract) {
    return { auth: true }
  }

  public async getTitlesList({ request }: HttpContextContract) {
    const start = request.all().start || 0
    const end = request.all().end || start + 20
    const filterString = request.all().filter || ''

    // Still in production
    const filter = (elem: any) => {
      elem = filterString
      return true
    }

    const titleList = (await Title.query())
      .filter(filter)
      .slice(start, end)
      .map((title: Title) => {
        let obj = JSON.parse(JSON.stringify(title))
        obj.id = title.getUrlFromId()
        return obj
      })
    return { auth: true, titles: titleList }
  }

  public async getTitle({ request, response }: HttpContextContract) {
    let id = request.params().title
    let title: Title
    if (!id) {
      response.abort('Need an id to return the title details', 401)
      return
    } else {
      try {
        title = await Title.findOrFail(Title.getIdFromUrl(id))
        return title
      } catch (e) {
        response.abort('Title not found', 404)
      }
    }
  }

  public async getUserList({ request }: HttpContextContract) {
    const start = request.all().start || 0
    const end = request.all().end || start + 20
    const filterString = request.all().filter || ''

    // Still in production
    const filter = (elem: any) => {
      elem = filterString
      return true
    }

    const userList = (await User.query())
      .filter(filter)
      .slice(start, end)
      .map((user: User) => {
        const obj = JSON.parse(JSON.stringify(user))
        obj.password = undefined
        return obj
      })
    return { auth: true, userList: userList }
  }
}
