import re
import sys
import os

def universal_extract(file_path):
    try:
        if not os.path.isfile(file_path):
            print(f"Error: '{file_path}' is not a valid file.")
            return

        with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()

        png_pattern = r'[\w\-\./\\]+\.png'
        found_assets = set(re.findall(png_pattern, content, re.IGNORECASE))

        if found_assets:
            print(f"--- Found {len(found_assets)} PNG Assets ---")
            for asset in sorted(found_assets):
                if '/' in asset or '\\' in asset or len(asset) > 5:
                    print(asset)
        else:
            print("No .png assets detected.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_file = sys.argv[1]
        universal_extract(target_file)
    else:
        print("Usage: Drag and drop a .js file onto this script.")
    
    input("\nPress Enter to exit...")