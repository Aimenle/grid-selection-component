# Grid Selection Generator CLI Tool

A command-line tool for generating and updating Grid Selection components

<p align="center">
<img  width="500" alt="Screenshot_20250819_090828-1" src="https://github.com/user-attachments/assets/6984b188-bd87-45e0-8c98-1ff22d2479d4" />
</p>
<p align="center">
<img width="500" he alt="Screenshot_20250819_090907" src="https://github.com/user-attachments/assets/d6f0fe8c-71a0-491f-bd98-699fa9c68a62" />
</p>




## Overview

This CLI tool allows you to:
- Generate new Grid Selection components with custom grid dimensions
- Update existing Grid Selection components by modifying the `GridSize` constant
- Automatically fetch the latest Grid Selection component structure from `src/components.js`
- Target specific files or directories for component generation

## Features

- **Dynamic Source Reading**: Reads the actual Grid Selection component from `src/components.js` to ensure consistency
- **GridSize Management**: Automatically manages the `GridSize` constant with custom `sizeX` and `sizeY` values
- **Flexible Targeting**: Can create new files or update existing ones
- **Directory Support**: Creates `modal.js` files when targeting directories
- **Error Handling**: Graceful error handling with informative messages

## Installation

The CLI tool is ready to use. Make sure you have Node.js installed and the tool is executable:

```bash
chmod +x cli-generate-grid-selection.js
```

## Usage

```bash
node cli-generate-grid-selection.js [options] <target>
```

### Options

- `--sizeX <number>` - Grid width (default: 16)
- `--sizeY <number>` - Grid height (default: 8)
- `--help` - Show help message

### Arguments

- `<target>` - Target file or folder where to create/update the Grid Selection component

## Examples

### Update existing components file
```bash
node cli-generate-grid-selection.js --sizeX 20 --sizeY 10 src/components.js
```
Updates the `GridSize` constant in the existing file.

### Create new modal in directory
```bash
node cli-generate-grid-selection.js --sizeX 12 --sizeY 6 src/
```
Creates `src/modal.js` with a Grid Selection component using 12x6 grid.

### Create new modal file with default size
```bash
node cli-generate-grid-selection.js components/new-modal.js
```
Creates a new file with default 16x8 grid size.

### Create modal with custom dimensions
```bash
node cli-generate-grid-selection.js --sizeX 24 --sizeY 12 components/large-modal.js
```
Creates a new modal component with 24x12 grid.

## How It Works

1. **Source Reading**: The tool reads the Grid Selection component structure from `src/components.js`
2. **GridSize Replacement**: It replaces or creates the `GridSize` constant with your specified dimensions
3. **Smart Updates**: 
   - If the target file has a `GridSize` constant, it updates only that constant
   - If the target file has a Grid Selection component without `GridSize`, it replaces the entire component
   - If the target doesn't exist, it creates a new file with the complete component

## Component Structure

The generated Grid Selection component includes:
- `GridSize` constant with custom dimensions
- Complete Grid Selection component with grid selection functionality
- Interactive mouseover/mouseleave events
- State management for selected coordinates and cell count

## File Structure

```
your-project/
├── src/
│   └── components.js          # Source Grid Selection component
├── cli-generate-grid-selection.js      # CLI tool
└── CLI-README.md             # This documentation
```

## Requirements

- Node.js
- `src/components.js` file with Grid Selection component definition
