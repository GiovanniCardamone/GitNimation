import loadArguments, { Arguments } from 'arguments'
import loadEnvironments, { Environments } from 'environments'

interface MainProps {
  args: Arguments
  envs: Environments
}

async function main({ args, envs }: MainProps) {
  throw new TypeError()
}

if (require.main === module) {
  main({ args: loadArguments(), envs: loadEnvironments() })
    .then((output) => {
      console.debug(output)
      process.exit(0)
    })
    .catch((error) => {
      console.error(error)
      process.exit(errorToCode(error))
    })
}

const errorToCode = (error: Error): number => {
  switch (error.constructor) {
    case Error:
      return 1

    case TypeError:
      return 2

    default:
      return 1
  }
}
