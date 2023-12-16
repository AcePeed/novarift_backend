import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('fname').notNullable()
      table.string('lname').defaultTo('').notNullable()
      table.string('email').unique().notNullable()
      table.string('display').notNullable()
      table.string('login').unique().notNullable()
      table.string('password').notNullable()
      table.boolean('admin').defaultTo(false)
      table.boolean('superuser').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
