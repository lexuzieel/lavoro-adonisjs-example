import queueConfig from '#config/queue'
import { Job, Queue, Logger } from 'lavoro'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import logger from '@adonisjs/core/services/logger'

export default class QueueWork extends BaseCommand {
  static commandName = 'queue:work'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    staysAlive: true,
  }

  async prepare() {
    /**
     * Here we override the queue service instance
     * with the one configured for worker mode.
     */
    const config = {
      ...queueConfig,
      worker: true, // Explicitly enable worker mode
      logger: new Logger(logger),
    }

    const queue = new Queue(config)
    this.app.container.singleton('queue', () => queue)

    Job.setDefaultQueueServiceResolver(() => this.app.container.make('queue'))

    await queue.start()
  }
}
