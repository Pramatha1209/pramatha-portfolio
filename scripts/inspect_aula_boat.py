import urllib.request
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
}

# 1. Aula inspection
try:
    url = 'https://aula-f3287-product-experience-4c4n.vercel.app/app.js?v=aula-f3287-v10'
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        code = resp.read().decode('utf-8', errors='ignore')
        print(f"Aula app.js length: {len(code)}")
        # Look for image strings or URLs
        urls = re.findall(r'https?://[^\s"\'\)]+', code)
        print("Aula URLs in app.js:", set(urls[:20]))
        # Look for text/product title in Aula
        titles = re.findall(r'["\']([^"\']{5,40})["\']', code)
        print("Sample strings in Aula:", [t for t in titles if any(w in t.lower() for w in ['aula', 'product', 'design', 'feature', 'experience', 'keyboard', 'headset', 'mouse'])][:15])
except Exception as e:
    print("Error reading Aula app.js:", e)

# 2. boAt repo inspection
try:
    raw_base = 'https://raw.githubusercontent.com/Pramatha1209/boat-nirvanaa-eutopia/main/'
    req = urllib.request.Request('https://api.github.com/repos/Pramatha1209/boat-nirvanaa-eutopia/contents/frames', headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        frames = json.loads(resp.read().decode('utf-8'))
        print(f"boAt frames count: {len(frames)}, first few:", [f['name'] for f in frames[:5]])
except Exception as e:
    print("Error reading boAt frames:", e)
