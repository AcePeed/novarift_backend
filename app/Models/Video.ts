import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Episode from './Episode'

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

  @hasMany(() => Episode)
  public posters: HasMany<typeof Episode>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
