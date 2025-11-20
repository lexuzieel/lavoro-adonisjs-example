This is an example AdonisJS project that uses the Lavoro library to enqueue background jobs.

To install the project, simply run `install.sh`. It will install the dependencies, set up the project and bring up the database in a Docker container on a random port.

After that you can run `node ace queue:work` to start the queue worker.

To see how job creation works, run `node ace inspire` to dispatch a job onto the `default` queue on the `main` connection. For more details, check out `config/queue.ts`, which has a list of registered jobs, connections and queues.
