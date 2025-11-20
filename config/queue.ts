import env from '#start/env'
import {
  defineConfig,
  InferConnectionQueuesMap,
  InferConnections,
  InferDefaultConnection,
  InferQueueNames,
  QueueConfig,
} from 'lavoro'

import { Inspire } from '#jobs/inspire'

const queueConfig: QueueConfig = defineConfig({
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
      driver: 'postgres',
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
      config: {
        host: env.get('QUEUE_DB_HOST', env.get('DB_HOST')),
        port: env.get('QUEUE_DB_PORT', env.get('DB_PORT', '5432')),
        user: env.get('QUEUE_DB_USER', env.get('DB_USER')),
        password: env.get('QUEUE_DB_PASSWORD', env.get('DB_PASSWORD', '')),
        database: env.get('QUEUE_DB_DATABASE', env.get('DB_DATABASE')),
      },
    },
  },
})

export default queueConfig

declare module 'lavoro' {
  export interface QueueConnections extends InferConnections<typeof queueConfig> {}

  export interface DefaultConnection {
    name: InferDefaultConnection<typeof queueConfig>
  }
}

declare module 'lavoro' {
  export interface QueuesList extends Record<InferQueueNames<typeof queueConfig>, never> {}

  export interface ConnectionQueuesMap extends InferConnectionQueuesMap<typeof queueConfig> {}
}
