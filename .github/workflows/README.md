# .github/workflows

Workflows that are run in CI

## CI

All CI scripts can be [`run as a workflow trigger`](https://github.com/roninjin10/server-boilerplate/actions)

### lint.yml

Runs prettier and eslint

### tests.yml

Runs test script

### typecheck.yml

Runs the typechecker. Since build is done (faster) with babel typechecker must be run as a seperate lint step.

## CD

### publish.yml

Publishes package to npm on release
