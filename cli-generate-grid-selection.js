#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)

function showHelp () {
  console.log(`
Usage: node cli-generate-grid-selection.js [options] <target>

Options:
  --sizeX <number>    Grid width (default: 16)
  --sizeY <number>    Grid height (default: 8)
  --help              Show this help message

Arguments:
  <target>            Target file or folder where to create/update the GridSelection component

Examples:
  node cli-generate-modal.js --sizeX 20 --sizeY 10 src/components.js
  node cli-generate-modal.js --sizeX 12 --sizeY 6 src/
  node cli-generate-modal.js src/components.js
`)
}

function parseArgs (args) {
  const options = {
    sizeX: 16,
    sizeY: 8,
    target: null
  }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help':
        showHelp()
        process.exit(0)
        break
      case '--sizeX':
        options.sizeX = parseInt(args[++i])
        if (isNaN(options.sizeX)) {
          console.error('Error: --sizeX must be a number')
          process.exit(1)
        }
        break
      case '--sizeY':
        options.sizeY = parseInt(args[++i])
        if (isNaN(options.sizeY)) {
          console.error('Error: --sizeY must be a number')
          process.exit(1)
        }
        break
      default:
        if (!options.target && !args[i].startsWith('--')) {
          options.target = args[i]
        }
        break
    }
  }

  if (!options.target) {
    console.error('Error: Target file or folder is required')
    showHelp()
    process.exit(1)
  }

  return options
}

function generateModalComponent (sizeX, sizeY) {
  // Read the source GridSelection component from src/components.js
  const sourceFilePath = path.join(__dirname, 'src', 'components.js')
  const sourceContent = fs.readFileSync(sourceFilePath, 'utf8')

  const gridSizeConstant = `const GridSize = {
  sizeX: ${sizeX},
  sizeY: ${sizeY}
}`

  return `${gridSizeConstant}\n\n${sourceContent.replace(
    /const GridSize = \{[\s\S]*?\}/,
    ''
  )}\n`
}

function updateExistingFile (filePath, sizeX, sizeY) {
  const content = fs.readFileSync(filePath, 'utf8')

  // Check if GridSize constant exists
  const gridSizeRegex = /const GridSize = \{[\s\S]*?\}/

  // Update existing GridSize constant
  const newGridSize = `const GridSize = {
  sizeX: ${sizeX},
  sizeY: ${sizeY}
}`
  const updatedContent = content.replace(gridSizeRegex, newGridSize)

  fs.writeFileSync(filePath, updatedContent)
  console.log(
    `✅ Updated GridSize in ${filePath} with sizeX: ${sizeX}, sizeY: ${sizeY}`
  )
}

function createNewFile (filePath, sizeX, sizeY) {
  try {
    const modalComponent = generateModalComponent(sizeX, sizeY)
    fs.writeFileSync(filePath, modalComponent)
    console.log(
      `✅ Created new file ${filePath} with GridSelection component (sizeX: ${sizeX}, sizeY: ${sizeY})`
    )
  } catch (error) {
    console.error(`Error creating file ${filePath}:`, error.message)
    process.exit(1)
  }
}

function main () {
  const options = parseArgs(args)
  const { sizeX, sizeY, target } = options

  const targetPath = path.resolve(target)

  try {
    const stats = fs.statSync(targetPath)

    if (stats.isDirectory()) {
      // If target is a directory, create modal.js inside it
      const modalFilePath = path.join(targetPath, 'GridSelection.js')
      createNewFile(modalFilePath, sizeX, sizeY)
    } else if (stats.isFile()) {
      // If target is a file, update it
      updateExistingFile(targetPath, sizeX, sizeY)
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File/directory doesn't exist, create new file
      createNewFile(targetPath, sizeX, sizeY)
    } else {
      console.error(`Error accessing ${targetPath}:`, error.message)
      process.exit(1)
    }
  }
}

if (require.main === module) {
  main()
}
