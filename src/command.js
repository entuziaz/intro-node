import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { newNote } from './notes.js'

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
        type: 'string',
        description: "The content of the note to create',"
    })
  }, async (argv) => {
    // console.log("hello: ", argv.note)
    const tags = argv.tags ? argv.tags.split(',') : []
    const note = await newNote(argv.note, tags)
    console.log('New note! ', note)
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