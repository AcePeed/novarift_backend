import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public episodeId: number

  @column()
  public path: string

  @column()
  public audioLanguage: string

  @column()
  public encoder: string | null

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
