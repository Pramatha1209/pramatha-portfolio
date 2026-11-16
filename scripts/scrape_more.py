import urllib.request
import re
import os
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def inspect_aula_and_boat():
    # 1. Inspect Aula
    print("\n--- Inspecting Aula JS bundles ---")
    try:
        req = urllib.request.Request('https://aula-f3287-product-experience-4c4n.vercel.app/', headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
            print("Aula scripts:", scripts)
            for sc in scripts:
                if not sc.startswith('http'):
                    sc = 'https://aula-f3287-product-experience-4c4n.vercel.app' + sc
                try:
                    s_req = urllib.request.Request(sc, headers=headers)
                    with urllib.request.urlopen(s_req, timeout=8) as s_resp:
                        s_text = s_resp.read().decode('utf-8', errors='ignore')
                        # look for images or SVGs or canvas in script
                        imgs = re.findall(r'["\']([^"\']+\.(?:png|jpg|jpeg|webp|svg))["\']', s_text)
                        if imgs:
                            print(f"Images in {sc.split('/')[-1]}:", imgs[:10])
                except Exception as e:
                    pass
    except Exception as e:
        print("Error fetching Aula:", e)

    # 2. Inspect boAt GitHub repo
    print("\n--- Inspecting boAt GitHub repo ---")
    try:
        repo_url = 'https://api.github.com/repos/Pramatha1209/boat-nirvanaa-eutopia/contents'
        req = urllib.request.Request(repo_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            contents = json.loads(resp.read().decode('utf-8'))
            print("boAt repo files:")
            for item in contents:
                print(f"  {item['type']}: {item['name']}")
                if item['name'] in ['public', 'src', 'assets']:
                    # inspect subfolder
                    sub_req = urllib.request.Request(item['url'], headers=headers)
                    with urllib.request.urlopen(sub_req, timeout=8) as sub_resp:
                        sub_contents = json.loads(sub_resp.read().decode('utf-8'))
                        print(f"   Contents of {item['name']}:", [x['name'] for x in sub_contents])
    except Exception as e:
        print("GitHub API error:", e)

    # 3. Inspect boAt lifestyle official product page
    print("\n--- Inspecting boAt lifestyle page ---")
    try:
        boat_url = 'https://www.boat-lifestyle.com/products/nirvana-eutopia-headphone'
        req = urllib.request.Request(boat_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            print(f"boAt HTML: {len(html)} chars")
            og_imgs = re.findall(r'property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)
            print("boAt OG Images:", og_imgs)
            cdn_imgs = re.findall(r'(https://cdn\.shopify\.com/s/files/[^"\'\s>]+\.(?:png|jpg|jpeg|webp))', html)
            print(f"Found {len(cdn_imgs)} shopify CDN images:")
            unique_cdn = []
            for img in cdn_imgs:
                if img not in unique_cdn:
                    unique_cdn.append(img)
            for img in unique_cdn[:10]:
                print("  *", img)
    except Exception as e:
        print("Error fetching boAt lifestyle:", e)

inspect_aula_and_boat()
