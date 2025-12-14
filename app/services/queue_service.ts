import app from '@adonisjs/core/services/app'
import { Queue } from '@lavoro/core'

let queue: Queue

await app.booted(async () => {
  queue = await app.container.make('queue')
})

export { queue as default }
