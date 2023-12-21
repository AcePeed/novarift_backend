import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Episode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titleId: number

  @column()
  public season: number = 0

  @column()
  public episodeNum: number = 0

  @column()
  public name: string | null = null

  @column()
  public details: string | null = null

  @column()
  public status: number = 0

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
