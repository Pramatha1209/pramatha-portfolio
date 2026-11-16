import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def make_boat_ad():
    W, H = 1600, 900
    
    # 1. Base Dark Luxury Charcoal Studio Canvas
    base = Image.new('RGB', (W, H), (12, 14, 18))
    
    # 2. Studio Lighting Layer (RGBA)
    light_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    light_draw = ImageDraw.Draw(light_layer)
    
    cx, cy = W // 2, int(H * 0.46) # Centered slightly above vertical mid to frame headphones
    
    # Soft central spotlight (champagne/warm white core falling off to midnight slate)
    for r in range(540, 0, -8):
        factor = 1.0 - (r / 540)
        # Soft cubic falloff
        alpha = int(70 * (factor ** 2.2))
        light_draw.ellipse(
            [cx - r, cy - int(r * 0.9), cx + r, cy + int(r * 0.9)],
            fill=(45 + int(35 * factor), 50 + int(35 * factor), 70 + int(45 * factor), alpha)
        )
        
    # Dual-tone ambient lighting:
    # Left: Warm amber glow
    amber_glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ag_draw = ImageDraw.Draw(amber_glow)
    for r in range(400, 0, -10):
        factor = 1.0 - (r / 400)
        ag_draw.ellipse([cx - 420 - r, cy - r, cx - 420 + r, cy + r], fill=(245, 158, 11, int(22 * factor)))
    amber_glow = amber_glow.filter(ImageFilter.GaussianBlur(40))
    
    # Right: Spatial electric cyan/blue glow
    blue_glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(blue_glow)
    for r in range(400, 0, -10):
        factor = 1.0 - (r / 400)
        bg_draw.ellipse([cx + 420 - r, cy - r, cx + 420 + r, cy + r], fill=(56, 189, 248, int(24 * factor)))
    blue_glow = blue_glow.filter(ImageFilter.GaussianBlur(40))
    
    # Subtle acoustic spatial rings (evoking 3D spatial audio)
    rings = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    rings_draw = ImageDraw.Draw(rings)
    for radius in [280, 370, 460]:
        rings_draw.ellipse(
            [cx - radius, cy - int(radius * 0.92), cx + radius, cy + int(radius * 0.92)],
            outline=(255, 255, 255, 14), width=1
        )
        
    # Composite lighting layers onto base
    base_rgba = base.convert('RGBA')
    base_rgba = Image.alpha_composite(base_rgba, light_layer)
    base_rgba = Image.alpha_composite(base_rgba, amber_glow)
    base_rgba = Image.alpha_composite(base_rgba, blue_glow)
    base_rgba = Image.alpha_composite(base_rgba, rings)
    
    # 3. Load Authentic boAt Nirvanaa Eutopia Product Image
    artboard = Image.open('public/images/projects/boat-official-artboard.png').convert('RGBA')
    alpha = artboard.split()[3]
    bbox = alpha.getbbox()
    headphone_crop = artboard.crop(bbox)
    
    # Scale headphones naturally (target height 670px, leaving 115px top/bottom margin)
    target_h = 670
    target_w = int(target_h * (headphone_crop.width / headphone_crop.height))
    headphone_scaled = headphone_crop.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pos_x = (W - target_w) // 2
    pos_y = (H - target_h) // 2
    
    # 4. Realistic Ground / Drop Shadow
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shadow)
    sh_w = int(target_w * 0.8)
    sh_h = 50
    sh_draw.ellipse(
        [cx - sh_w // 2, pos_y + target_h - 30, cx + sh_w // 2, pos_y + target_h + sh_h],
        fill=(0, 0, 0, 200)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(30))
    base_rgba = Image.alpha_composite(base_rgba, shadow)
    
    # 5. Paste the centered headphones cleanly
    base_rgba.paste(headphone_scaled, (pos_x, pos_y), headphone_scaled)
    
    # 6. Premium typography and subtle branding in negative space
    draw = ImageDraw.Draw(base_rgba)
    font_bold_lg = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 20)
    font_mono_xs = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 12)
    font_reg_sm = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 13)
    
    # Top-left minimal product tag
    draw.rounded_rectangle([60, 50, 420, 88], radius=6, fill=(18, 22, 28, 220), outline=(255, 255, 255, 30), width=1)
    draw.text((76, 61), "boAt NIRVANAA EUTOPIA", font=font_bold_lg, fill=(255, 255, 255))
    draw.text((320, 64), "SPATIAL AUDIO", font=font_mono_xs, fill=(56, 189, 248))
    
    # Top-right acoustic spec badge
    badge_txt = "HEAD-TRACKING 3D AUDIO • 65H PLAYTIME"
    bbox_b = font_mono_xs.getbbox(badge_txt)
    bw = bbox_b[2] - bbox_b[0]
    draw.rounded_rectangle([W - 60 - bw - 32, 50, W - 60, 88], radius=6, fill=(18, 22, 28, 220), outline=(245, 158, 11, 80), width=1)
    draw.text((W - 60 - bw - 16, 63), badge_txt, font=font_mono_xs, fill=(245, 158, 11))
    
    # Subtle Vignette on edges
    vignette = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    vig_draw = ImageDraw.Draw(vignette)
    for i in range(100):
        a = int(120 * ((100 - i) / 100) ** 1.6)
        vig_draw.rectangle([i, i, W - 1 - i, H - 1 - i], outline=(8, 10, 14, a))
    base_rgba = Image.alpha_composite(base_rgba, vignette)
    
    # Save output
    final_rgb = base_rgba.convert('RGB')
    final_rgb.save('public/images/projects/banner-boat.jpg', 'JPEG', quality=96)
    print(f"Generated unified premium boAt advertisement banner: {final_rgb.size}")

if __name__ == '__main__':
    make_boat_ad()
