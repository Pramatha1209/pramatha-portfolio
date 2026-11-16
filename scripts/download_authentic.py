import urllib.request
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
}

def download_file(url, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    print(f"Downloading {url} -> {out_path}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            with open(out_path, 'wb') as f:
                f.write(data)
            print(f"Success! {out_path} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"Failed {url}: {e}")
        return False

# 1. Shantha Residency actual hotel photos from live site
download_file("https://shantharesidency.com/images/hero/hero-main.jpg", "public/images/projects/shantha-hero-main.jpg")
download_file("https://shantharesidency.com/images/hotel/exterior-main.jpg", "public/images/projects/shantha-exterior-main.jpg")
download_file("https://shantharesidency.com/images/hotel/facade-entrance.jpg", "public/images/projects/shantha-facade-entrance.jpg")
download_file("https://shantharesidency.com/images/rooms/deluxe-room-1.jpg", "public/images/projects/shantha-deluxe-room.jpg")
download_file("https://shantharesidency.com/images/rooms/executive-suite-1.jpg", "public/images/projects/shantha-suite.jpg")

# 2. boAt Nirvanaa Eutopia genuine assets from Pramatha's repo
download_file("https://raw.githubusercontent.com/Pramatha1209/boat-nirvanaa-eutopia/main/frames/ezgif-frame-001.jpg", "public/images/projects/boat-frame-001.jpg")
download_file("https://raw.githubusercontent.com/Pramatha1209/boat-nirvanaa-eutopia/main/frames/ezgif-frame-045.jpg", "public/images/projects/boat-frame-045.jpg")
download_file("https://raw.githubusercontent.com/Pramatha1209/boat-nirvanaa-eutopia/main/frames/ezgif-frame-090.jpg", "public/images/projects/boat-frame-090.jpg")
download_file("https://raw.githubusercontent.com/Pramatha1209/boat-nirvanaa-eutopia/main/assets/work-1.jpg", "public/images/projects/boat-work-1.jpg")
download_file("https://raw.githubusercontent.com/Pramatha1209/boat-nirvanaa-eutopia/main/assets/liquid-chrome.jpg", "public/images/projects/boat-liquid-chrome.jpg")
