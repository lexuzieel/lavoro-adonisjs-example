import queueConfig from '#config/queue'
import { Job, Logger } from 'lavoro'
import { Queue } from 'lavoro'
import type { ApplicationService } from '@adonisjs/core/types'
import logger from '@adonisjs/core/services/logger'

/**
 * Extending AdonisJS types
 */
declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    queue: Queue
  }
}

export default class QueueServiceProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('queue', () => {
      // Always disable workers in non-web environments to avoid
      // running worker during console commands, repl, etc.
      if (this.app.getEnvironment() !== 'web') {
        queueConfig.worker = false
      }

      return new Queue({ ...queueConfig, logger: new Logger(logger) })
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {
    Job.setDefaultQueueServiceResolver(() => this.app.container.make('queue'))

    const service = await this.app.container.make('queue')
    await service.start()
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    const service = await this.app.container.make('queue')
    await service.stop()
  }
}
