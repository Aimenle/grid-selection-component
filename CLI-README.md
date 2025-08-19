# Modal Generator CLI Tool

A command-line tool for generating and updating Modal components with customizable grid sizes in your Symbols.js project.

## Overview

This CLI tool allows you to:
- Generate new Modal components with custom grid dimensions
- Update existing Modal components by modifying the `GridSize` constant
- Automatically fetch the latest Modal component structure from `src/components.js`
- Target specific files or directories for component generation

## Features

- **Dynamic Source Reading**: Reads the actual Modal component from `src/components.js` to ensure consistency
- **GridSize Management**: Automatically manages the `GridSize` constant with custom `sizeX` and `sizeY` values
- **Flexible Targeting**: Can create new files or update existing ones
- **Directory Support**: Creates `modal.js` files when targeting directories
- **Error Handling**: Graceful error handling with informative messages

## Installation

The CLI tool is ready to use. Make sure you have Node.js installed and the tool is executable:

```bash
chmod +x cli-generate-modal.js
```

## Usage

```bash
node cli-generate-modal.js [options] <target>
```

### Options

- `--sizeX <number>` - Grid width (default: 16)
- `--sizeY <number>` - Grid height (default: 8)
- `--help` - Show help message

### Arguments

- `<target>` - Target file or folder where to create/update the Modal component

## Examples

### Update existing components file
```bash
node cli-generate-modal.js --sizeX 20 --sizeY 10 src/components.js
```
Updates the `GridSize` constant in the existing file.

### Create new modal in directory
```bash
node cli-generate-modal.js --sizeX 12 --sizeY 6 src/
```
Creates `src/modal.js` with a Modal component using 12x6 grid.

### Create new modal file with default size
```bash
node cli-generate-modal.js components/new-modal.js
```
Creates a new file with default 16x8 grid size.

### Create modal with custom dimensions
```bash
node cli-generate-modal.js --sizeX 24 --sizeY 12 components/large-modal.js
```
Creates a new modal component with 24x12 grid.

## How It Works

1. **Source Reading**: The tool reads the Modal component structure from `src/components.js`
2. **GridSize Replacement**: It replaces or creates the `GridSize` constant with your specified dimensions
3. **Smart Updates**: 
   - If the target file has a `GridSize` constant, it updates only that constant
   - If the target file has a Modal component without `GridSize`, it replaces the entire component
   - If the target doesn't exist, it creates a new file with the complete component

## Component Structure

The generated Modal component includes:
- `GridSize` constant with custom dimensions
- Complete Modal component with grid selection functionality
- Interactive mouseover/mouseleave events
- State management for selected coordinates and cell count

## File Structure

```
your-project/
├── src/
│   └── components.js          # Source Modal component
├── cli-generate-modal.js      # CLI tool
└── CLI-README.md             # This documentation
```

## Requirements

- Node.js
- Symbols.js framework
- `src/components.js` file with Modal component definition

## Error Handling

The tool includes comprehensive error handling:
- Validates numeric inputs for grid dimensions
- Checks file permissions and accessibility
- Provides clear error messages for troubleshooting
- Gracefully handles missing source files

## Notes

- The tool maintains the exact structure and styling from your source Modal component
- Any updates to the Modal component in `src/components.js` will be automatically used in new generations
- The `GridSize` constant uses object spread syntax (`...GridSize`) in the Modal props