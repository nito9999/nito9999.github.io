import requests
import os

# Paste the base URL here (e.g., "https://example.com/assets/")
BASE_URL = "https://www.google.com/logos/2024/halloween24/rc3/"

# Your list of sprite data
zc = [
    {"filename": "play-sprite.png", "size": [2445, 200]},
    {"filename": "momo-sprite.png", "size": [2046, 1955]},
    {"filename": "momo-sprite-0.png", "size": [2040, 2036]},
    {"filename": "momo-sprite-1.png", "size": [1983, 403]},
    {"filename": "ui-sprite.png", "size": [2047, 1014]},
    {"filename": "level1-sprite.png", "size": [2021, 1916]},
    {"filename": "level1-sprite-0.png", "size": [2021, 1928]},
    {"filename": "level1-sprite-1.png", "size": [1503, 1729]},
    {"filename": "level1-sprite-2.png", "size": [1393, 430]},
    {"filename": "level2-sprite.png", "size": [2037, 2037]},
    {"filename": "level2-sprite-0.png", "size": [2037, 2037]},
    {"filename": "level2-sprite-1.png", "size": [2037, 2037]},
    {"filename": "level2-sprite-2.png", "size": [1926, 613]},
    {"filename": "level3-sprite.png", "size": [1926, 1946]},
    {"filename": "level3-sprite-0.png", "size": [1926, 1795]},
    {"filename": "level3-sprite-1.png", "size": [1821, 1923]},
    {"filename": "level3-sprite-2.png", "size": [1821, 1602]},
    {"filename": "level4-sprite.png", "size": [2040, 1922]},
    {"filename": "level4-sprite-0.png", "size": [1926, 2039]},
    {"filename": "level4-sprite-1.png", "size": [1933, 1947]},
    {"filename": "level4-sprite-2.png", "size": [1933, 1602]},
    {"filename": "level5-sprite.png", "size": [2045, 1989]},
    {"filename": "level5-sprite-0.png", "size": [2029, 1812]},
    {"filename": "level5-sprite-1.png", "size": [1926, 1812]},
    {"filename": "level5-sprite-2.png", "size": [1926, 1812]},
    {"filename": "level5-sprite-3.png", "size": [1926, 1812]},
    {"filename": "level5-sprite-4.png", "size": [1761, 360]},
    {"filename": "ghosts-sprite.png", "size": [2042, 1676]},
    {"filename": "intro.mp4", "size": [2042, 1676]},
    {"filename": "outro.mp4", "size": [2042, 1676]},
    {"filename": "L4_cutscene.mp4", "size": [2042, 1676]},
    {"filename": "audio.ogg", "size": [2042, 1676]},
]

def download_sprites():
    if BASE_URL == "YOUR_BASE_URL_HERE/":
        print("❌ Error: Please set the BASE_URL in the script first!")
        return

    print(f"🚀 Starting download from: {BASE_URL}\n")

    for item in zc:
        name = item['filename']
        url = BASE_URL + name
        
        try:
            print(f"Downloading {name}...", end=" ", flush=True)
            response = requests.get(url, stream=True)
            
            if response.status_code == 200:
                with open(name, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                print("✅ Done")
            else:
                print(f"❌ Failed (Status: {response.status_code})")
        
        except Exception as e:
            print(f"❌ Error: {e}")

    print("\n✨ All downloads finished.")

if __name__ == "__main__":
    download_sprites()