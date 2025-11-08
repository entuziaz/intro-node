import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
        type: 'string',
        description: "The content of the note to create',"
    })
  }, (argv) => {
    console.log("hello: ", argv.note)
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .demandCommand(1)
  .parse()


yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .parse()