import os
from PIL import Image, ImageDraw, ImageFont

def make_blinkit_banner():
    W, H = 1600, 900
    base = Image.new('RGB', (W, H), (8, 11, 16)) # Deep charcoal/slate
    draw = ImageDraw.Draw(base)

    # Load system fonts
    font_bold_lg = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 38)
    font_bold_md = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 24)
    font_bold_sm = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 16)
    font_reg_md = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 15)
    font_reg_sm = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 13)
    font_mono_sm = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 13)
    font_mono_xs = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 11)

    # 1. Subtle background grid
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(16, 22, 32), width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(16, 22, 32), width=1)

    # 2. Top Header Bar
    # Outer frame
    pad_x = 60
    pad_y = 50
    content_w = W - 2 * pad_x

    # Header pill badge
    draw.rounded_rectangle([pad_x, pad_y, pad_x + 380, pad_y + 40], radius=8, fill=(18, 26, 38), outline=(245, 158, 11, 160), width=1)
    draw.text((pad_x + 16, pad_y + 11), "OPERATIONAL ANALYTICS CASE STUDY", font=font_mono_sm, fill=(245, 158, 11))

    # Transparency disclaimer tag (Prominent and clearly labeled)
    disclaimer = "ILLUSTRATIVE DASHBOARD • 2,900+ BLINKIT FULFILLMENT RECORDS"
    bbox_disc = font_mono_sm.getbbox(disclaimer)
    disc_w = bbox_disc[2] - bbox_disc[0]
    draw.rounded_rectangle([W - pad_x - disc_w - 32, pad_y, W - pad_x, pad_y + 40], radius=8, fill=(14, 20, 30), outline=(56, 189, 248, 120), width=1)
    draw.text((W - pad_x - disc_w - 16, pad_y + 11), disclaimer, font=font_mono_sm, fill=(56, 189, 248))

    # Title & Subtitle
    title_y = pad_y + 60
    draw.text((pad_x, title_y), "Blinkit Last-Mile Delivery SLA & Latency Intelligence", font=font_bold_lg, fill=(255, 255, 255))
    draw.text((pad_x, title_y + 48), "Multivariate regression of weather disruptions, urban congestion, and dispatch radii across fulfillment hubs", font=font_reg_md, fill=(160, 175, 195))

    # 3. KPI Summary Metric Cards (4 cards)
    cards_y = title_y + 90
    card_h = 130
    gap = 20
    kpi_card_w = (content_w - (3 * gap)) // 4

    kpis = [
        {"val": "2,900+", "label": "RECORDS ANALYZED", "sub": "SQL & Python Ingestion Pipeline", "color": (255, 255, 255), "accent": (56, 189, 248)},
        {"val": "+34%", "label": "RAIN LATENCY SPIKE", "sub": "Monsoon Delay Impact (p < 0.01)", "color": (251, 113, 133), "accent": (244, 63, 94)},
        {"val": "< 3.2 km", "label": "OPTIMAL DISPATCH RADIUS", "sub": "10-Min SLA Preservation Bound", "color": (250, 204, 21), "accent": (245, 158, 11)},
        {"val": "+18%", "label": "FLEET EFFICIENCY GAIN", "sub": "Projected Zoned Staging Boost", "color": (52, 211, 153), "accent": (16, 185, 129)},
    ]

    for i, kpi in enumerate(kpis):
        cx1 = pad_x + i * (kpi_card_w + gap)
        cx2 = cx1 + kpi_card_w
        # Card background
        draw.rounded_rectangle([cx1, cards_y, cx2, cards_y + card_h], radius=12, fill=(13, 18, 28), outline=(32, 44, 64), width=1)
        # Left accent stripe
        draw.rounded_rectangle([cx1, cards_y + 12, cx1 + 4, cards_y + card_h - 12], radius=2, fill=kpi["accent"])
        # Big metric
        draw.text((cx1 + 22, cards_y + 16), kpi["val"], font=font_bold_lg, fill=kpi["color"])
        # Label
        draw.text((cx1 + 22, cards_y + 68), kpi["label"], font=font_mono_xs, fill=kpi["accent"])
        # Subtitle
        draw.text((cx1 + 22, cards_y + 92), kpi["sub"], font=font_reg_sm, fill=(130, 145, 168))

    # 4. Main Analytical Charts Section (Two wide visual panels)
    panel_y = cards_y + card_h + 24
    panel_h = 370
    panel_w = (content_w - gap) // 2

    # Left Panel: Weather & Traffic Latency Comparison (Bar Chart)
    p1_x = pad_x
    draw.rounded_rectangle([p1_x, panel_y, p1_x + panel_w, panel_y + panel_h], radius=14, fill=(13, 18, 28), outline=(32, 44, 64), width=1)
    draw.text((p1_x + 24, panel_y + 20), "Mean Fulfillment Duration by Condition (Minutes)", font=font_bold_md, fill=(240, 245, 255))
    draw.text((p1_x + 24, panel_y + 52), "Target SLA: 15.0 min (10-min fulfillment + 5-min grace threshold)", font=font_mono_xs, fill=(140, 155, 175))

    # Bar chart area
    chart_y = panel_y + 90
    bar_data = [
        {"label": "Clear Weather (Baseline)", "val": 11.4, "max": 25.0, "color": (56, 189, 248), "note": "Within 10m target"},
        {"label": "Moderate Traffic", "val": 13.8, "max": 25.0, "color": (56, 189, 248), "note": "Nominal delay"},
        {"label": "Heavy Rain (+34% Latency)", "val": 19.3, "max": 25.0, "color": (245, 158, 11), "note": "SLA breach risk"},
        {"label": "Severe Monsoon & Congestion", "val": 23.1, "max": 25.0, "color": (244, 63, 94), "note": "Critical delay"},
    ]

    bar_max_w = panel_w - 240
    for j, b in enumerate(bar_data):
        by = chart_y + j * 58
        draw.text((p1_x + 24, by), b["label"], font=font_reg_sm, fill=(210, 220, 235))
        # Background bar
        draw.rounded_rectangle([p1_x + 24, by + 22, p1_x + 24 + bar_max_w, by + 36], radius=4, fill=(20, 28, 42))
        # Active fill bar
        bw = int(bar_max_w * (b["val"] / b["max"]))
        draw.rounded_rectangle([p1_x + 24, by + 22, p1_x + 24 + bw, by + 36], radius=4, fill=b["color"])
        # Metric text
        draw.text((p1_x + 36 + bar_max_w, by + 18), f"{b['val']} min", font=font_bold_sm, fill=b["color"])
        draw.text((p1_x + 115 + bar_max_w, by + 20), b["note"], font=font_mono_xs, fill=(120, 135, 155))

    # SLA 15 min marker line across bars
    sla_x = p1_x + 24 + int(bar_max_w * (15.0 / 25.0))
    draw.line([(sla_x, chart_y + 10), (sla_x, chart_y + 240)], fill=(245, 158, 11, 160), width=1)
    draw.text((sla_x - 30, chart_y - 8), "15m SLA Limit", font=font_mono_xs, fill=(245, 158, 11))

    # Right Panel: SLA Adherence vs. Dispatch Radius (Stepped Curve / Zones)
    p2_x = p1_x + panel_w + gap
    draw.rounded_rectangle([p2_x, panel_y, p2_x + panel_w, panel_y + panel_h], radius=14, fill=(13, 18, 28), outline=(32, 44, 64), width=1)
    draw.text((p2_x + 24, panel_y + 20), "On-Time Delivery Success Rate vs. Radius", font=font_bold_md, fill=(240, 245, 255))
    draw.text((p2_x + 24, panel_y + 52), "DAX Measured SLA % by dark-store radial distance bands", font=font_mono_xs, fill=(140, 155, 175))

    radius_bands = [
        {"band": "Zone A (< 1.8 km)", "pct": "96.2%", "val": 96.2, "status": "Optimal Tier", "color": (52, 211, 153)},
        {"band": "Zone B (1.8 - 2.5 km)", "pct": "93.4%", "val": 93.4, "status": "High Reliability", "color": (52, 211, 153)},
        {"band": "Zone C (2.5 - 3.2 km)", "pct": "88.1%", "val": 88.1, "status": "Critical Threshold", "color": (250, 204, 21)},
        {"band": "Zone D (3.2 - 4.2 km)", "pct": "63.5%", "val": 63.5, "status": "Steep Dropoff", "color": (245, 158, 11)},
        {"band": "Zone E (> 4.2 km)", "pct": "39.8%", "val": 39.8, "status": "Frequent SLA Breach", "color": (244, 63, 94)},
    ]

    r_chart_y = panel_y + 85
    r_bar_max = panel_w - 230
    for k, r in enumerate(radius_bands):
        ry = r_chart_y + k * 48
        draw.text((p2_x + 24, ry), r["band"], font=font_reg_sm, fill=(210, 220, 235))
        # Background bar
        draw.rounded_rectangle([p2_x + 24, ry + 20, p2_x + 24 + r_bar_max, ry + 32], radius=4, fill=(20, 28, 42))
        # Fill
        rbw = int(r_bar_max * (r["val"] / 100.0))
        draw.rounded_rectangle([p2_x + 24, ry + 20, p2_x + 24 + rbw, ry + 32], radius=4, fill=r["color"])
        # Values
        draw.text((p2_x + 34 + r_bar_max, ry + 16), r["pct"], font=font_bold_sm, fill=r["color"])
        draw.text((p2_x + 95 + r_bar_max, ry + 18), r["status"], font=font_mono_xs, fill=(120, 135, 155))

    # Bottom Architecture Status Footnote
    foot_y = H - 50
    draw.line([(pad_x, foot_y - 12), (W - pad_x, foot_y - 12)], fill=(25, 35, 52), width=1)
    pipeline_txt = "ANALYTICS PIPELINE: SQL Window Functions  ➔  Python/Pandas Outlier Remediation  ➔  Power BI Star Schema  ➔  DAX Dynamic Measures"
    draw.text((pad_x, foot_y), pipeline_txt, font=font_mono_xs, fill=(100, 118, 142))
    draw.text((W - pad_x - 220, foot_y), "PORTFOLIO CASE STUDY #04", font=font_mono_xs, fill=(245, 158, 11))

    # Save
    base.save('public/images/projects/banner-blinkit.jpg', 'JPEG', quality=95)
    print("Generated high-fidelity illustrative banner-blinkit.jpg")

if __name__ == '__main__':
    make_blinkit_banner()
