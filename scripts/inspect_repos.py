import urllib.request
import json
import sys

headers = {'User-Agent': 'Mozilla/5.0'}

def inspect():
    for repo in ['aula-f3287-product-experience', 'bengaluru-house-price-predictor', 'bangalore-house-price']:
        print(f"\n=== Files in {repo} ===")
        try:
            req = urllib.request.Request(f'https://api.github.com/repos/Pramatha1209/{repo}/contents', headers=headers)
            with urllib.request.urlopen(req, timeout=8) as resp:
                items = json.loads(resp.read().decode('utf-8'))
                for it in items:
                    print(f"  {it['type']}: {it['name']}")
                    if it['name'] in ['assets', 'static', 'images', 'public', 'client', 'ui']:
                        try:
                            sub_req = urllib.request.Request(it['url'], headers=headers)
                            with urllib.request.urlopen(sub_req, timeout=8) as sub_resp:
                                sub_items = json.loads(sub_resp.read().decode('utf-8'))
                                print(f"    Sub-items in {it['name']}:", [s['name'] for s in sub_items])
                        except:
                            pass
        except Exception as e:
            print(f"  Error: {e}")

if __name__ == '__main__':
    inspect()
