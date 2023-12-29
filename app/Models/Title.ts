import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Poster from './Poster'
import Episode from './Episode'

export default class Title extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public details: string

  @column()
  public isMovie: boolean

  @column()
  public production_company: string

  @column()
  public producers: string[]

  @column()
  public main_cast: string[]

  @column()
  public keywords: string[] = []

  @column()
  public allKeywords: string

  @hasMany(() => Episode)
  public episodes: HasMany<typeof Episode>

  @hasMany(() => Poster)
  public posters: HasMany<typeof Poster>

  @column()
  public status: number = 0

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async computeAllKeywords(item: Title) {
    item.keywords = [
      item.name.toLowerCase(),
      item.production_company.toLowerCase(),
      ...item.producers.map((word) => word.toLowerCase()),
      ...item.main_cast.map((word) => word.toLowerCase()),
      ...item.keywords.map((keyword) => keyword.toLowerCase()),
    ]
    item.allKeywords = item.keywords.join(' ')
  }
}
