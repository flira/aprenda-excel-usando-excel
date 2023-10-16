/**
 * @file
 * Creates a CSS file named "bgs.css" with a base64 version of
 * the images located in "./public/img/spreadsheet" as CSS variables.
 * All the variables are named "--bg[slice-number]" and assigned in ":root".
 * Any image not used in any CSS file inside the "./src" folder is skipped.
 */
const b64img = require('css-b64-images')
const fs = require('fs')
const args = require('args')

const argNames = {
  watch: 'watch'
}

args.option(argNames.watch, 'Watch for CSS updates', false)
const flags = args.parse(process.argv)

const encoding = { encoding: 'utf8' }

/**
 * @param {string} relPath Relative path of the files.
 * @param {string?} extension Extension to be filtered.
 * @returns {string[]} Array with every file of a specific extension.
 */
function getFilesByExtension(relPath, extension) {
  const dirents = fs.readdirSync(relPath, { withFileTypes: true })

  const flatMapFiles = dirent => {
    if (typeof dirent === 'object' && dirent.isDirectory()) {
      return fs.readdirSync(
        `${dirent.path}/${dirent.name}`,
        { withFileTypes: true }
      ).flatMap(flatMapFiles)
    }
    return `${dirent.path}/${dirent.name}`
  }

  const allFiles = dirents.flatMap(flatMapFiles)

  if (!extension) {
    return allFiles
  }

  return allFiles.filter(file => new RegExp(extension, 'i').test(file))
}

/**
 * @param {string} imgsPath 
 * Path to all slice images
 * @returns {string}
 * CSS with every image inside the folder
 * './public/img/spreadsheet' as a css variable named
 * "--bg[SLICE_NUMBER]".
 * It skips any image not used in any CSS inside
 * the './src' folder.
 */
function createCssString(imgsPath) {
  const cssFiles = getFilesByExtension('./src', 'css')
    .map(file => fs.readFileSync(file, encoding))
  const sliceNumbers = fs.readdirSync(imgsPath)
    .map(img => /\d+/g.exec(img)[0])
    .filter(
      number => !!cssFiles.find(
        file => new RegExp(`var\\(--bg${parseInt(number)}\\)`).test(file)
      )
    )
  let cssString = ':root{'
  sliceNumbers.forEach(number => {
    cssString += `--bg${parseInt(number)}:url(${imgsPath}/slc_${number}.png);`
  })
  cssString += '}'
  return cssString
}

/**
 * Writes the "bgs.css" file.
 * @param {error} err Error.
 * @param {string} css CSS data.
 * @returns void
 */
function b64FromString(err, css) {
  if (err) {
    console.error(err)
    return
  }
  fs.writeFileSync('./src/styles/bgs.css', css, encoding)
  console.log('base64 images created on "bgs.css"')
}

/**
 * Calls b64img to create the CSS
 * file with the images in base64.
 * It's just a quicker way to call it
 * with the same parameters when you 
 * want it to run once or while watching files. 
 */
function runb64Img() {
  b64img.fromString(
    createCssString('./public/img/spreadsheet'),
    '',
    '',
    { maxSize: 7196 }
    , b64FromString
  )
}

runb64Img()

/**
 * Rerun "runb64img()" if any file in the
 * "components" folder changes. The "settimeout"
 * is used to avoid running multiple times for
 * the same file update.
 * @see runb64Img
 */
if (flags[argNames.watch]) {
  let currentFile = ''
  const resetCurrentFile = () => {
    currentFile = ''
  }
  const watch = (eventType, filename) => {
    if (currentFile === filename) {
      return
    }
    currentFile = filename
    runb64Img()
    setTimeout(resetCurrentFile, 500)
  }
  fs.watch('./src/components', { recursive: true }, watch)
}
