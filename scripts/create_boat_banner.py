import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def make_boat_showcase():
    W, H = 1600, 900
    
    # 1. Base dark canvas (rich studio dark with subtle warm & cool depth)
    base = Image.new('RGB', (W, H), (10, 12, 16))
    
    # 2. Add subtle radial studio light glow in the center
    # Create an RGBA glow layer
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    cx, cy = W // 2, H // 2
    max_r = 550
    for r in range(max_r, 0, -10):
        factor = 1.0 - (r / max_r)
        # Smooth quadratic falloff
        alpha = int(45 * (factor ** 1.8))
        # Subtle dual-tone: slightly warmer amber towards center, deep spatial indigo at edges
        color = (
            int(30 + 35 * factor),   # R
            int(35 + 40 * factor),   # G
            int(55 + 50 * factor),   # B
            alpha
        )
        glow_draw.ellipse([cx - r, cy - int(r * 0.85), cx + r, cy + int(r * 0.85)], fill=color)
    
    # Subtle floor reflection / ambient platform glow at the bottom
    platform = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    plat_draw = ImageDraw.Draw(platform)
    plat_draw.ellipse([cx - 400, H - 160, cx + 400, H - 60], fill=(245, 158, 11, 14)) # Amber floor highlight
    plat_draw.ellipse([cx - 480, H - 180, cx + 480, H - 40], fill=(56, 189, 248, 12)) # Blue outer ambient
    platform = platform.filter(ImageFilter.GaussianBlur(35))
    
    # Composite base with lighting
    base_rgba = base.convert('RGBA')
    base_rgba = Image.alpha_composite(base_rgba, glow)
    base_rgba = Image.alpha_composite(base_rgba, platform)
    
    # 3. Load official boAt Nirvana Eutopia headphone artboard
    artboard = Image.open('public/images/projects/boat-official-artboard.png')
    if artboard.mode != 'RGBA':
        artboard = artboard.convert('RGBA')
        
    alpha = artboard.split()[3]
    bbox = alpha.getbbox()
    headphone_crop = artboard.crop(bbox)
    
    # Target height: 680px (leaving 110px top and bottom margin on 900px canvas)
    target_h = 680
    target_w = int(target_h * (headphone_crop.width / headphone_crop.height))
    headphone_scaled = headphone_crop.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Compute exact visual center
    pos_x = (W - target_w) // 2
    pos_y = (H - target_h) // 2
    
    # 4. Realistic contact drop shadow under the headphone
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_w = int(target_w * 0.75)
    shadow_h = 45
    shadow_draw.ellipse(
        [cx - shadow_w // 2, pos_y + target_h - 25, cx + shadow_w // 2, pos_y + target_h + shadow_h],
        fill=(0, 0, 0, 160)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(25))
    base_rgba = Image.alpha_composite(base_rgba, shadow)
    
    # 5. Paste the centered headphones
    base_rgba.paste(headphone_scaled, (pos_x, pos_y), headphone_scaled)
    
    # 6. Subtle studio vignette border
    vignette = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    vig_draw = ImageDraw.Draw(vignette)
    for i in range(120):
        alpha_v = int(140 * ((120 - i) / 120) ** 1.5)
        vig_draw.rectangle([i, i, W - 1 - i, H - 1 - i], outline=(8, 10, 14, alpha_v))
    base_rgba = Image.alpha_composite(base_rgba, vignette)
    
    # Final output
    final_rgb = base_rgba.convert('RGB')
    final_rgb.save('public/images/projects/banner-boat.jpg', 'JPEG', quality=95)
    print(f"Generated banner-boat.jpg: size={(W, H)}, headphone_size={(target_w, target_h)}, pos={(pos_x, pos_y)}")

if __name__ == '__main__':
    make_boat_showcase()
