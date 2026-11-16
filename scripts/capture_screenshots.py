import subprocess
import os

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def capture_screenshot(url, out_path, wait_ms=4000):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    abs_out = os.path.abspath(out_path)
    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        f"--screenshot={abs_out}",
        "--window-size=1920,1080",
        f"--virtual-time-budget={wait_ms}",
        url
    ]
    print(f"Capturing {url} -> {out_path}...")
    subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=20)
    if os.path.exists(out_path):
        print(f"Success! {out_path} size: {os.path.getsize(out_path)} bytes")
    else:
        print(f"Failed to capture {url}")

capture_screenshot("https://aula-f3287-product-experience-4c4n.vercel.app/", "public/images/projects/aula-live-screenshot.png", wait_ms=5000)
capture_screenshot("https://www.shantharesidency.com/", "public/images/projects/shantha-live-screenshot.png", wait_ms=4000)
