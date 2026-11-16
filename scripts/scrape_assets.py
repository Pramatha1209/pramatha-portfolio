import urllib.request
import re
import os
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def inspect_url(url, name):
    print(f"\n============================\n{name}: {url}\n============================")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print(f"Loaded {len(content)} chars.")
            
            # Find og:image
            og_match = re.findall(r'property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', content, re.IGNORECASE)
            if not og_match:
                og_match = re.findall(r'content=["\']([^"\']+)["\']\s+property=["\']og:image["\']', content, re.IGNORECASE)
            print("OG Images:", og_match)
            
            # Find all image URLs (png, jpg, jpeg, webp)
            raw_imgs = re.findall(r'([^"\'\s>]+\.(?:jpg|jpeg|png|webp))', content, re.IGNORECASE)
            unique_imgs = []
            for img in raw_imgs:
                if img not in unique_imgs and not img.startswith('data:'):
                    unique_imgs.append(img)
            print(f"Found {len(unique_imgs)} potential image references:")
            for img in unique_imgs[:20]:
                print("  *", img)
                
            return content, unique_imgs
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None, []

inspect_url('https://www.shantharesidency.com/', 'Shantha Residency')
inspect_url('https://aula-f3287-product-experience-4c4n.vercel.app/', 'Aula')
