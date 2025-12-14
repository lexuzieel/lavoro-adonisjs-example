import { Schedule } from '@lavoro/core'
import { Inspire } from '#jobs/inspire'

async function test() {
  await Schedule.job(Inspire, { quote: 'test' })
    // @ts-expect-error
    .onQueue('invalid-queue-name')
    .every('second')

  await Schedule.job(Inspire, { quote: 'test' })
    // @ts-expect-error
    .onConnection('invalid-connection')
    .every('second')

  await Schedule.job(Inspire, { quote: 'test' })
    .onConnection('main')
    // @ts-expect-error
    .onQueue('invalid-queue-name')
    .every('second')
}

export { test }
