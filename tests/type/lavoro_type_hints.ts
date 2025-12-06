import { Schedule } from 'lavoro'
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

  await Schedule.job(Inspire, { quote: 'test' })
    // @ts-expect-error
    .onQueue('main')
    .every('second')

  await Schedule.job(Inspire, { quote: 'test' })
    .onConnection('alternative')
    .onQueue('main')
    .every('second')

  await Inspire.dispatch({ quote: 'test' })
    // @ts-expect-error
    .onQueue('invalid-queue-name')

  await Inspire.dispatch({ quote: 'test' })
    // @ts-expect-error
    .onConnection('invalid-connection')

  await Inspire.dispatch({ quote: 'test' })
    .onConnection('main')
    // @ts-expect-error
    .onQueue('invalid-queue-name')

  await Inspire.dispatch({ quote: 'test' })
    // @ts-expect-error
    .onQueue('main')

  await Inspire.dispatch({ quote: 'test' }).onConnection('alternative').onQueue('main')
}

export { test }
