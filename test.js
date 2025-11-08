import { write } from 'node:fs'
import fs from 'node:fs/promises'

const readPjson = async() => {
    const pjsonPath = new URL('./package.json', import.meta.url).pathname
    console.log(JSON.parse(await fs.readFile(pjsonPath, 'utf-8')))
}

const writeFile = async () => {
    const newFile =  new URL('./demo.js', import.meta.url).pathname 
    await fs.writeFile(newFile, `console.log('yoooo!')`)
}

// readPjson()
writeFile()