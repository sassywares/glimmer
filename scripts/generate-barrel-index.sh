#!/bin/bash

# Ensure the script is run with a directory argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 directory"
    exit 1
fi

# Directory to process
DIR="$1"

# Name of the index file to generate
INDEX_FILE="$DIR/index.ts"

# Clear the index file if it exists
> "$INDEX_FILE"

# Iterate over each item in the specified directory
for DIR_ITEM in "$DIR"/*; do
    # Check if it is a directory
    if [ -d "$DIR_ITEM" ]; then
        # Remove the base directory path and trailing slash to use the directory name as the export name
        DIR_NAME=$(basename "$DIR_ITEM")
        
        # Add export statement to the index file, omitting the extension
        echo "export * from './$DIR_NAME';" >> "$INDEX_FILE"
    fi
done

echo "Index file generated as $INDEX_FILE."