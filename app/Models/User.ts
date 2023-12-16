import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // ********************************************** //
  //                 User Information               //
  // ********************************************** //

  @column()
  public fname: string

  @column()
  public lname: string

  @column()
  public email: string

  @column()
  public Display: string

  @column()
  public login: string

  @column()
  public password: string

  @column()
  public admin: boolean

  @column()
  public superuser: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
