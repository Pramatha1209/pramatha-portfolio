from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

os.makedirs('public/images/projects', exist_ok=True)
W, H = 1600, 900

# 1. Shantha Residency Banner (Using authentic hotel facade photo)
def create_shantha_banner():
    base = Image.new('RGB', (W, H), (12, 14, 18))
    # Load authentic photo
    photo = Image.open('public/images/projects/shantha-facade-entrance.jpg').convert('RGB')
    
    # Scale photo to cover right portion / center
    photo_ratio = photo.width / photo.height
    target_h = H
    target_w = int(target_h * photo_ratio)
    photo_resized = photo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Paste photo on the right/center
    offset_x = W - target_w
    base.paste(photo_resized, (offset_x, 0))
    
    # Apply cinematic gradient fade on the left side for seamless integration
    fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_fade = ImageDraw.Draw(fade)
    for x in range(W):
        if x < 400:
            alpha = 255
        elif x < 900:
            alpha = int(255 * (1 - (x - 400) / 500))
        else:
            alpha = 0
        draw_fade.line([(x, 0), (x, H)], fill=(10, 12, 16, alpha))
        
    # Top and bottom subtle vignettes
    for y in range(120):
        alpha = int(180 * (1 - y / 120))
        draw_fade.line([(0, y), (W, y)], fill=(10, 12, 16, alpha))
    for y in range(H - 120, H):
        alpha = int(220 * ((y - (H - 120)) / 120))
        draw_fade.line([(0, y), (W, y)], fill=(10, 12, 16, alpha))
        
    base.paste(Image.composite(Image.new('RGB', (W, H), (10, 12, 16)), base, fade.split()[3]), (0, 0))
    
    # Subtle metadata badge
    draw = ImageDraw.Draw(base)
    draw.rectangle([60, 60, 480, 105], fill=(15, 18, 24), outline=(245, 158, 11, 140))
    draw.text((80, 75), "AUTHENTIC PROPERTY PHOTOGRAPHY &bull; LIVE ON SHANTHARESIDENCY.COM", fill=(245, 158, 11))
    
    base.save('public/images/projects/banner-shantha.jpg', quality=94)
    print("Saved banner-shantha.jpg")

# 2. Aula Product Experience Banner (Using authentic 3D keyboard product frame)
def create_aula_banner():
    base = Image.new('RGB', (W, H), (10, 11, 15))
    photo = Image.open('public/images/projects/aula-frame-001.jpg').convert('RGB')
    
    # Scale to fit nicely with dark ambient margins
    scale = min((W - 80) / photo.width, (H - 80) / photo.height)
    new_w, new_h = int(photo.width * scale), int(photo.height * scale)
    photo_resized = photo.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    pos_x = (W - new_w) // 2
    pos_y = (H - new_h) // 2
    base.paste(photo_resized, (pos_x, pos_y))
    
    # Vignette overlay
    fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_fade = ImageDraw.Draw(fade)
    # Edge fades
    for x in range(150):
        alpha = int(230 * (1 - x / 150))
        draw_fade.line([(x, 0), (x, H)], fill=(10, 11, 15, alpha))
        draw_fade.line([(W - 1 - x, 0), (W - 1 - x, H)], fill=(10, 11, 15, alpha))
    for y in range(120):
        alpha = int(230 * (1 - y / 120))
        draw_fade.line([(0, y), (W, y)], fill=(10, 11, 15, alpha))
        draw_fade.line([(0, H - 1 - y), (W, H - 1 - y)], fill=(10, 11, 15, alpha))
        
    base.paste(Image.composite(Image.new('RGB', (W, H), (10, 11, 15)), base, fade.split()[3]), (0, 0))
    
    draw = ImageDraw.Draw(base)
    draw.rectangle([60, 60, 480, 105], fill=(15, 18, 24), outline=(56, 189, 248, 140))
    draw.text((80, 75), "AULA F3287 HARDWARE LABS &bull; LIVE DEPLOYED APPLICATION", fill=(56, 189, 248))
    
    base.save('public/images/projects/banner-aula.jpg', quality=94)
    print("Saved banner-aula.jpg")

# 3. boAt Nirvanaa Eutopia Banner (Using authentic product photography from repo)
def create_boat_banner():
    base = Image.new('RGB', (W, H), (14, 10, 12))
    photo = Image.open('public/images/projects/boat-work-1.jpg').convert('RGB')
    
    # Scale photo height to fit banner
    target_h = H - 40
    target_w = int(target_h * (photo.width / photo.height))
    photo_resized = photo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Place product on right side
    pos_x = W - target_w - 60
    pos_y = 20
    base.paste(photo_resized, (pos_x, pos_y))
    
    # Subtle liquid chrome ambient accent on left
    try:
        chrome = Image.open('public/images/projects/boat-liquid-chrome.jpg').convert('RGB')
        chrome_crop = chrome.crop((0, 0, 500, H)).filter(ImageFilter.GaussianBlur(30))
        base.paste(chrome_crop, (0, 0))
    except:
        pass
        
    # Soft dark blend
    fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_fade = ImageDraw.Draw(fade)
    for x in range(W):
        if x < 450:
            alpha = 180
        elif x < 950:
            alpha = int(180 * (1 - (x - 450) / 500))
        else:
            alpha = 0
        draw_fade.line([(x, 0), (x, H)], fill=(12, 10, 12, alpha))
    for y in range(100):
        alpha = int(220 * (1 - y / 100))
        draw_fade.line([(0, y), (W, y)], fill=(12, 10, 12, alpha))
        draw_fade.line([(0, H - 1 - y), (W, H - 1 - y)], fill=(12, 10, 12, alpha))
        
    base.paste(Image.composite(Image.new('RGB', (W, H), (12, 10, 12)), base, fade.split()[3]), (0, 0))
    
    draw = ImageDraw.Draw(base)
    draw.rectangle([60, 60, 480, 105], fill=(20, 15, 18), outline=(245, 158, 11, 140))
    draw.text((80, 75), "AUTHENTIC STUDIO PRODUCT PHOTOGRAPHY &bull; GITHUB REPO", fill=(245, 158, 11))
    
    base.save('public/images/projects/banner-boat.jpg', quality=94)
    print("Saved banner-boat.jpg")

# 4. Blinkit Delivery Intelligence Banner (Authentic Case Study Schematics)
def create_blinkit_banner():
    base = Image.new('RGB', (W, H), (10, 14, 20))
    draw = ImageDraw.Draw(base)
    
    # Technical grid
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(20, 28, 40), width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(20, 28, 40), width=1)
        
    # Header tag
    draw.rectangle([60, 60, 520, 105], fill=(15, 22, 32), outline=(245, 158, 11, 160))
    draw.text((80, 75), "DATA ANALYTICS CASE STUDY &bull; POWER BI & SQL PIPELINE", fill=(245, 158, 11))
    
    # Center schematic cards
    card_y = 170
    card_w = (W - 120 - 60) // 3
    card_h = 560
    
    # Card 1: Volume & Records
    draw.rectangle([60, card_y, 60 + card_w, card_y + card_h], fill=(14, 20, 30), outline=(30, 42, 60), width=2)
    draw.text((90, card_y + 40), "OPERATIONAL SCOPE", fill=(245, 158, 11))
    draw.text((90, card_y + 80), "2,900+", fill=(255, 255, 255))
    draw.text((90, card_y + 130), "Fulfillment Records Analyzed", fill=(180, 190, 205))
    draw.text((90, card_y + 180), "Multi-factor Correlation:", fill=(140, 150, 170))
    draw.text((90, card_y + 210), "&bull; Rainfall Volume (mm)", fill=(200, 210, 225))
    draw.text((90, card_y + 240), "&bull; Traffic Density Indices", fill=(200, 210, 225))
    draw.text((90, card_y + 270), "&bull; Courier Turnaround Time", fill=(200, 210, 225))
    draw.text((90, card_y + 300), "&bull; Radial Distance from Hub", fill=(200, 210, 225))
    
    # Card 2: SLA & Latency Analysis
    draw.rectangle([60 + card_w + 30, card_y, 60 + card_w * 2 + 30, card_y + card_h], fill=(14, 20, 30), outline=(30, 42, 60), width=2)
    draw.text((90 + card_w + 30, card_y + 40), "SLA VIOLATION ANALYSIS", fill=(56, 189, 248))
    draw.text((90 + card_w + 30, card_y + 80), "+34%", fill=(255, 255, 255))
    draw.text((90 + card_w + 30, card_y + 130), "Latency Spike in Heavy Rain", fill=(180, 190, 205))
    draw.text((90 + card_w + 30, card_y + 180), "Bottleneck Diagnostics:", fill=(140, 150, 170))
    draw.text((90 + card_w + 30, card_y + 210), "&bull; Dark-store queue wait times", fill=(200, 210, 225))
    draw.text((90 + card_w + 30, card_y + 240), "&bull; High-congestion urban arteries", fill=(200, 210, 225))
    draw.text((90 + card_w + 30, card_y + 270), "&bull; Non-linear delay beyond 3.2 km", fill=(200, 210, 225))
    
    # Card 3: Optimization Results
    draw.rectangle([60 + card_w * 2 + 60, card_y, W - 60, card_y + card_h], fill=(14, 20, 30), outline=(30, 42, 60), width=2)
    draw.text((90 + card_w * 2 + 60, card_y + 40), "OPTIMIZATION OUTCOME", fill=(52, 211, 153))
    draw.text((90 + card_w * 2 + 60, card_y + 80), "18%", fill=(255, 255, 255))
    draw.text((90 + card_w * 2 + 60, card_y + 130), "Projected Fleet Efficiency Gain", fill=(180, 190, 205))
    draw.text((90 + card_w * 2 + 60, card_y + 180), "Strategic Recommendations:", fill=(140, 150, 170))
    draw.text((90 + card_w * 2 + 60, card_y + 210), "&bull; Dynamic staging under storm alerts", fill=(200, 210, 225))
    draw.text((90 + card_w * 2 + 60, card_y + 240), "&bull; Geofenced < 3.2km fast-track zones", fill=(200, 210, 225))
    draw.text((90 + card_w * 2 + 60, card_y + 270), "&bull; DAX-driven automated daily reporting", fill=(200, 210, 225))
    
    # Edge vignettes
    fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_fade = ImageDraw.Draw(fade)
    for y in range(80):
        alpha = int(200 * (1 - y / 80))
        draw_fade.line([(0, y), (W, y)], fill=(10, 14, 20, alpha))
        draw_fade.line([(0, H - 1 - y), (W, H - 1 - y)], fill=(10, 14, 20, alpha))
    base.paste(Image.composite(Image.new('RGB', (W, H), (10, 14, 20)), base, fade.split()[3]), (0, 0))
    
    base.save('public/images/projects/banner-blinkit.jpg', quality=94)
    print("Saved banner-blinkit.jpg")

# 5. Bengaluru House Price Prediction Banner (Using authentic repo assets + ML pipeline)
def create_house_price_banner():
    base = Image.new('RGB', (W, H), (12, 16, 26))
    
    # Load authentic hero graphic from repo
    try:
        photo = Image.open('public/images/projects/bengaluru-house-hero-bg.png').convert('RGB')
        photo_h = H - 80
        photo_w = int(photo_h * (photo.width / photo.height))
        photo_resized = photo.resize((photo_w, photo_h), Image.Resampling.LANCZOS)
        base.paste(photo_resized, (W - photo_w - 60, 40))
    except Exception as e:
        print("House photo error:", e)
        
    draw = ImageDraw.Draw(base)
    
    # Technical grid
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(20, 28, 45, 120), width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(20, 28, 45, 120), width=1)
        
    # Header tag
    draw.rectangle([60, 60, 520, 105], fill=(16, 22, 36), outline=(56, 189, 248, 160))
    draw.text((80, 75), "MACHINE LEARNING REGRESSION &bull; SCIKIT-LEARN & FLASK", fill=(56, 189, 248))
    
    # ML Model Overview Card
    draw.rectangle([60, 160, 720, H - 80], fill=(14, 20, 32), outline=(32, 44, 70), width=2)
    draw.text((90, 200), "PREDICTIVE REAL ESTATE ENGINE", fill=(245, 158, 11))
    draw.text((90, 240), "R² > 0.86", fill=(255, 255, 255))
    draw.text((90, 290), "Validated Ensemble Model Accuracy", fill=(180, 195, 215))
    
    draw.text((90, 350), "Algorithms & Pipeline Architecture:", fill=(140, 155, 180))
    draw.text((90, 385), "&bull; Random Forest & Gradient Boosting Regressors", fill=(210, 220, 235))
    draw.text((90, 415), "&bull; Outlier removal: < 300 sqft / bedroom physical rule", fill=(210, 220, 235))
    draw.text((90, 445), "&bull; Categorical dimensionality reduction on 1,000+ zones", fill=(210, 220, 235))
    draw.text((90, 475), "&bull; K-Fold Cross Validation & GridSearchCV Hyperparameter Tuning", fill=(210, 220, 235))
    draw.text((90, 505), "&bull; Python Flask REST Microservice for Instant Inference", fill=(210, 220, 235))
    
    # Fade overlay on right side of text card
    fade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_fade = ImageDraw.Draw(fade)
    for y in range(80):
        alpha = int(200 * (1 - y / 80))
        draw_fade.line([(0, y), (W, y)], fill=(12, 16, 26, alpha))
        draw_fade.line([(0, H - 1 - y), (W, H - 1 - y)], fill=(12, 16, 26, alpha))
    base.paste(Image.composite(Image.new('RGB', (W, H), (12, 16, 26)), base, fade.split()[3]), (0, 0))
    
    base.save('public/images/projects/banner-bengaluru-house.jpg', quality=94)
    print("Saved banner-bengaluru-house.jpg")

create_shantha_banner()
create_aula_banner()
create_boat_banner()
create_blinkit_banner()
create_house_price_banner()
