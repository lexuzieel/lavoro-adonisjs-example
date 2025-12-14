import { postgres } from '@lavoro/postgres'
import { memory } from '@lavoro/memory'
import env from '#start/env'
import {
  defineConfig,
  type InferConnections,
  type InferDefaultConnection,
  type InferQueueNames,
  type InferConnectionQueues,
} from '@lavoro/core'

import { Inspire } from '#jobs/inspire'

export const config = {
  jobs: [
    /*
     | Specify job classes here from the `jobs` directory here.
     | They will be automatically registed with the queue service.
     */
    Inspire,
  ],

  /*
  |--------------------------------------------------------------------------
  | Default connection
  |--------------------------------------------------------------------------
  |
  | The default queue connection to use for dispatching jobs.
  | Must be defined in the `connections`.
  |
  */
  connection: 'main',

  // worker: true,

  /*
  |--------------------------------------------------------------------------
  | Queue connections
  |--------------------------------------------------------------------------
  |
  | Define multiple queue connections. Each connection can have its own
  | driver (memory, postgres, etc) and its own set of queues.
  |
  */
  connections: {
    main: {
      driver: postgres({
        host: env.get('QUEUE_DB_HOST', env.get('DB_HOST')),
        port: env.get('QUEUE_DB_PORT', env.get('DB_PORT', '5432')),
        user: env.get('QUEUE_DB_USER', env.get('DB_USER')),
        password: env.get('QUEUE_DB_PASSWORD', env.get('DB_PASSWORD', '')),
        database: env.get('QUEUE_DB_DATABASE', env.get('DB_DATABASE')),
      }),
      queues: {
        /*
        |--------------------------------------------------------------------------
        | Queue definitions
        |--------------------------------------------------------------------------
        |
        | Define queues for this connection and their worker options.
        |
        | You can disable workers by setting `worker` to `false`, in
        | this case, the queue will be used for dispatching jobs only.
        |
        */
        'default': {
          // concurrency: 1, // default concurrency is 1
        },
        'high-throughput': {
          concurrency: 3,
        },
      },
    },
    alternative: {
      driver: memory(),
      queues: {
        main: {
          concurrency: 1,
        },
      },
    },
  },
} as const

const queueConfig = defineConfig(config)

declare module '@lavoro/core' {
  interface QueueList extends InferQueueNames<typeof config> {}
  interface DefaultConnection {
    name: InferDefaultConnection<typeof config>
  }
  interface QueueConnections extends InferConnections<typeof config> {}
  interface ConnectionQueues extends InferConnectionQueues<typeof config> {}
}

export default queueConfig
