import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Title from './Title'

export default class Poster extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public path: string

  /*@column()
  public userId: number

  @belongsTo(() => Title, { foreignKey: 'userId' })
  public idk: BelongsTo<Title>*/

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
