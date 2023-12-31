import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

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
  public display: string = ''

  @column()
  public login: string

  @column()
  public password: string

  @column()
  public admin: boolean = false

  @column()
  public superuser: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
