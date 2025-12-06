# Type Tests

This directory contains TypeScript type-checking tests that verify type safety at compile time.

## Purpose

These files test that TypeScript correctly catches type errors using `@ts-expect-error` directives. They are not runtime tests but compile-time type checks.

## Running Type Tests

```bash
npm run check
```

This will run TypeScript's type checker across the entire project, including these type tests.

## How It Works

- Files with `@ts-expect-error` comments expect a TypeScript error on the next line
- If the error doesn't occur, TypeScript will report an unused `@ts-expect-error` directive
- This ensures type safety is maintained as the codebase evolves

## Files

- `lavoro_type_hints.ts` - Tests type safety for queue connections and queue names in `Schedule.job()` and `Job.dispatch()` methods based on the configuration in `config/queue.ts`
