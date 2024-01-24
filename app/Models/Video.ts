import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
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

  @belongsTo(() => Episode)
  public episode: BelongsTo<typeof Episode>

  public static getUrlFromId(i: number) {
    i = i + 19
    i = i * 11
    i = i + 1645758
    return i.toString(16)
  }

  public getUrlFromId() {
    return Video.getUrlFromId(this.id)
  }

  public static getIdFromUrl(str: string): number {
    let i = parseInt(str, 16)
    i = i - 1645758
    i = i / 11
    i = i - 19
    if (Math.round(i) === i) {
      return i
    }
    return 0
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
