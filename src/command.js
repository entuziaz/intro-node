import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { newNote, getAllNotes, findNotes, removeNote, removeAllNotes } from './notes.js'
import listNotes from './utils.js'
import { start } from './server.js'


yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
        type: 'string',
        description: "The content of the note to create',"
    })
  }, async (argv) => {
    let tags = argv.tags ? argv.tags.split(',') : []
    tags = tags.map(tag => tag.trim())
    const note = await newNote(argv.note, tags)
    console.log('New note! ', note)
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async(argv) => {
    const notes = await getAllNotes()
    listNotes(notes)

  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to the content',
      type: 'string'
    })
  }, async (argv) => {
    const matches = await findNotes(argv.filter)
    listNotes(matches)
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const id = await removeNote(argv.id)
    console.log(id)
  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {
    const notes = await getAllNotes()
    start(notes, argv.port)
  })

  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeAllNotes()
    console.log('db reseted!')
  })
  .demandCommand(1)
  .parse()


yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .parse()