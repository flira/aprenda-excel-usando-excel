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
const paths = {
  css: './src/styles',
  img: './public/img/spreadsheet'
}

/**
 * @param {string} extension Extension to be filtered.
 * @param {string} relPath Relative path of the files.
 * @param {string[]} [files] Array to be returned (recursively used).
 * @returns Array with every file of a specific extension.
 */
function getFilesByExtension(extension, relPath, files) {
  const dirents = fs.readdirSync(
    fs.realpathSync(relPath),
    { withFileTypes: true }
  )
  files = files || [];

  dirents.forEach(dirent => {
    if (dirent.isDirectory()) {
      files = getFilesByExtension(
        extension,
        `${dirent.path}/${dirent.name}`,
        files
      )
    } else if (RegExp(extension, 'i').test(dirent.name)) {
      files.push(`${dirent.path}/${dirent.name}`)
    }
  })

  return files
}

/**
 * @param {string[]} files Files to be searched.
 * @param {string} text Text to be searched.
 * @returns {boolean} If the text was found inside any of the files.
 */
function testFiles(files, text) {
  if (!files || !text || !text.length) {
    return
  }
  for (const file of files) {
    if (RegExp(text, 'i').test(fs.readFileSync(file, encoding))) {
      return true
    }
  }
  return false
}

/**
 * @returns {string}
 * CSS data with every image inside the folder
 * './public/img/spreadsheet' as a css variable.
 * It skips any image not used in any CSS inside
 * the './src' folder.
 */
function createCssString() {
  const imgs = fs.readdirSync(paths.img)
  const cssFiles = getFilesByExtension('css', './src')
  const testCssFiles = testFiles.bind(null, cssFiles)
  let cssString = ':root{'
  for (const img of imgs) {
    const i = /\d+/.test(img) ? /\d+/.exec(img)[0] : 0
    if (i && !testCssFiles(`--bg${parseInt(i)}`)) {
      continue
    }
    cssString += `--bg${parseInt(i)}:url(${paths.img}/slc_${i}.png);`
  }
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
  fs.writeFileSync(`${paths.css}/bgs.css`, css, encoding)
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
    createCssString(),
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
    if(currentFile === filename) {
      return
    }
    currentFile = filename
    runb64Img()
    setTimeout(resetCurrentFile, 500)
  }
  fs.watch('./src/components', { recursive: true }, watch)
}
