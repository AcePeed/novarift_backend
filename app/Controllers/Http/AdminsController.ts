import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Title from 'App/Models/Title'

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

    const titleList = (await Title.query()).filter(filter).slice(start, end)
    return { auth: true, titles: titleList }
  }
}
