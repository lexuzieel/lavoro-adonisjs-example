import { BaseCommand } from '@adonisjs/core/ace'
import { Inspire } from '#jobs/inspire'
import { CommandOptions } from '@adonisjs/core/types/ace'

export default class InspireCommand extends BaseCommand {
  static commandName = 'inspire'
  static description = 'Display an inspiring quote'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const quotes = Inspire.quotes
    const quote = quotes[Math.floor(Math.random() * quotes.length)]

    await Inspire.dispatch({ quote })
  }
}
