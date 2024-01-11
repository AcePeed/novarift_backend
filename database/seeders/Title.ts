import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import BlueBeetle from './Titles/BlueBeetle'
import IronMan1 from './Titles/IronMan1'
import SpiderMan1 from './Titles/SpiderMan1'
import IronMan2 from './Titles/IronMan2'
import IronMan3 from './Titles/IronMan3'
import SpiderMan2 from './Titles/SpiderMan2'
import TheFlash from './Titles/TheFlash'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    BlueBeetle()
    IronMan1()
    IronMan2()
    IronMan3()
    SpiderMan1()
    SpiderMan2()
    TheFlash()
  }
}
