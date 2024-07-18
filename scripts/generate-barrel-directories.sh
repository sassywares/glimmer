#!/bin/bash

# Ensure the script is run with a directory argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 directory"
    exit 1
fi

# Directory to process
DIR="$1"

# Process each file in the directory
for FILE in "$DIR"/*; do
    # Check if it is a file
    if [ -f "$FILE" ]; then
        # Get the filename without the extension
        BASENAME=$(basename "$FILE")
        FILENAME="${BASENAME%.*}"

        # Create the directory with the filename
        mkdir -p "$DIR/$FILENAME"

        # Move the file to the new directory and rename it
        mv "$FILE" "$DIR/$FILENAME/$FILENAME.component.tsx"

        # Create an index.ts file with the export statement
        echo "export * from './$FILENAME.component';" > "$DIR/$FILENAME/index.tsx"
    fi
done

echo "Processing complete."