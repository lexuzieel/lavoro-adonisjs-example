import { BaseCommand } from '@adonisjs/core/ace'
import { Inspire } from '#jobs/inspire'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { Schedule } from '@lavoro/core'

export default class InspireCommand extends BaseCommand {
  static commandName = 'schedule'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    staysAlive: true,
  }

  async run() {
    const quotes = Inspire.quotes
    const quote = quotes[Math.floor(Math.random() * quotes.length)]

    await Schedule.job(Inspire, { quote })
      .onConnection('main')
      .onQueue('default')
      .every('five seconds')
  }
}
