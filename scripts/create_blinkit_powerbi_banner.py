from PIL import Image, ImageDraw, ImageFont, ImageFilter

def make_blinkit_dashboard():
    W, H = 1600, 900
    
    # Base dark charcoal / navy dashboard canvas
    base = Image.new('RGB', (W, H), (10, 13, 19))
    draw = ImageDraw.Draw(base)
    
    # Fonts
    font_brand = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 26)
    font_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 20)
    font_bold_xl = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 36)
    font_bold_lg = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 22)
    font_bold_md = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 16)
    font_bold_sm = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 14)
    font_reg_md = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 14)
    font_reg_sm = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 12)
    font_mono_sm = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 12)
    font_mono_xs = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 11)

    # 1. Subtle Dashboard Grid
    for x in range(0, W, 32):
        draw.line([(x, 0), (x, H)], fill=(16, 21, 30), width=1)
    for y in range(0, H, 32):
        draw.line([(0, y), (W, y)], fill=(16, 21, 30), width=1)

    # 2. Power BI Top Navigation Ribbon
    pad_x = 48
    pad_y = 36
    content_w = W - 2 * pad_x

    # Top Ribbon Bar Container
    ribbon_h = 64
    draw.rounded_rectangle(
        [pad_x, pad_y, pad_x + content_w, pad_y + ribbon_h],
        radius=10, fill=(16, 22, 32), outline=(35, 48, 68), width=1
    )

    # Blinkit Brand Badge (Yellow pill with green text - iconic brand identity)
    badge_w = 115
    badge_h = 38
    badge_x = pad_x + 14
    badge_y = pad_y + (ribbon_h - badge_h) // 2
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
        radius=8, fill=(248, 203, 70) # Blinkit Yellow
    )
    draw.text((badge_x + 16, badge_y + 4), "blinkit", font=font_brand, fill=(12, 131, 31)) # Blinkit Green

    # Project Title
    draw.text((badge_x + badge_w + 18, pad_y + 12), "Delivery Intelligence & Operations Analytics", font=font_title, fill=(255, 255, 255))
    draw.text((badge_x + badge_w + 18, pad_y + 38), "Power BI Executive Dashboard  •  SQL & Python Ingestion  •  DAX Statistical Modeling", font=font_reg_sm, fill=(140, 160, 185))

    # Recreated Visual Tag (Prominent & Explicit as requested)
    tag_txt = "RECREATED PROJECT VISUAL • ACTUAL METRICS FROM 2,900+ RECORDS"
    bbox_tag = font_mono_sm.getbbox(tag_txt)
    tag_w = bbox_tag[2] - bbox_tag[0]
    tag_x = pad_x + content_w - tag_w - 28
    draw.rounded_rectangle(
        [tag_x, pad_y + 14, pad_x + content_w - 14, pad_y + ribbon_h - 14],
        radius=6, fill=(20, 28, 40), outline=(248, 203, 70, 180), width=1
    )
    draw.text((tag_x + 14, pad_y + 22), tag_txt, font=font_mono_sm, fill=(248, 203, 70))

    # 3. KPI Summary Metric Cards (5 Cards in a clean row)
    cards_y = pad_y + ribbon_h + 16
    card_h = 115
    gap = 16
    kpi_w = (content_w - (4 * gap)) // 5

    kpis = [
        {"val": "2,900+", "unit": "records", "label": "TOTAL DELIVERIES", "sub": "SQL Aggregated Scope", "val_color": (255, 255, 255), "accent": (248, 203, 70)},
        {"val": "13.8", "unit": "min", "label": "AVG DELIVERY TIME", "sub": "11.4 min Baseline", "val_color": (255, 255, 255), "accent": (56, 189, 248)},
        {"val": "+34%", "unit": "latency", "label": "RAIN IMPACT SPIKE", "sub": "Monsoon Delay Impact", "val_color": (244, 63, 94), "accent": (244, 63, 94)},
        {"val": "< 3.2", "unit": "km", "label": "OPTIMAL RADIUS", "sub": "10-Min SLA Boundary", "val_color": (248, 203, 70), "accent": (248, 203, 70)},
        {"val": "+18%", "unit": "turnaround", "label": "RIDER EFFICIENCY", "sub": "Zoned Staging Model", "val_color": (16, 185, 129), "accent": (16, 185, 129)},
    ]

    for i, k in enumerate(kpis):
        cx1 = pad_x + i * (kpi_w + gap)
        cx2 = cx1 + kpi_w
        # Card body
        draw.rounded_rectangle([cx1, cards_y, cx2, cards_y + card_h], radius=10, fill=(16, 22, 32), outline=(30, 42, 60), width=1)
        # Accent top bar
        draw.rounded_rectangle([cx1, cards_y, cx2, cards_y + 4], radius=2, fill=k["accent"])
        # Metric
        draw.text((cx1 + 18, cards_y + 16), k["val"], font=font_bold_xl, fill=k["val_color"])
        draw.text((cx1 + 18 + font_bold_xl.getbbox(k["val"])[2] + 4, cards_y + 28), k["unit"], font=font_mono_xs, fill=(140, 160, 185))
        # Label
        draw.text((cx1 + 18, cards_y + 64), k["label"], font=font_mono_xs, fill=k["accent"])
        # Subtitle
        draw.text((cx1 + 18, cards_y + 85), k["sub"], font=font_reg_sm, fill=(130, 145, 168))

    # 4. Main Analytics Charts Grid (Left & Right Panels)
    panels_y = cards_y + card_h + 16
    panel_h = 390
    panel_w = (content_w - gap) // 2

    # LEFT PANEL: Weather & Traffic Latency Impact (Minutes)
    p1_x = pad_x
    draw.rounded_rectangle([p1_x, panels_y, p1_x + panel_w, panels_y + panel_h], radius=12, fill=(16, 22, 32), outline=(30, 42, 60), width=1)
    
    # Left Header
    draw.text((p1_x + 24, panels_y + 20), "Delivery Latency vs. Weather & Traffic Severity", font=font_bold_lg, fill=(255, 255, 255))
    draw.text((p1_x + 24, panels_y + 52), "DAX Measured Mean Fulfillment Duration (min) vs. 15.0 min SLA Limit", font=font_mono_xs, fill=(140, 160, 185))

    # Bar Chart items
    bars_y = panels_y + 90
    bar_items = [
        {"name": "Clear Weather (Baseline)", "val": 11.4, "max": 25.0, "color": (16, 185, 129), "tag": "Within 10m target"},
        {"name": "Moderate Traffic Congestion", "val": 13.8, "max": 25.0, "color": (56, 189, 248), "tag": "Nominal urban delay"},
        {"name": "Heavy Rainfall (+34% Latency)", "val": 19.3, "max": 25.0, "color": (248, 203, 70), "tag": "SLA violation threshold"},
        {"name": "Severe Monsoon & Road Waterlogging", "val": 23.1, "max": 25.0, "color": (244, 63, 94), "tag": "Critical operational breach"},
    ]

    chart_w = panel_w - 230
    for idx, b in enumerate(bar_items):
        by = bars_y + idx * 62
        draw.text((p1_x + 24, by), b["name"], font=font_reg_md, fill=(220, 230, 245))
        # Bar track
        draw.rounded_rectangle([p1_x + 24, by + 24, p1_x + 24 + chart_w, by + 40], radius=4, fill=(22, 30, 44))
        # Bar fill
        fill_w = int(chart_w * (b["val"] / b["max"]))
        draw.rounded_rectangle([p1_x + 24, by + 24, p1_x + 24 + fill_w, by + 40], radius=4, fill=b["color"])
        # Value callout
        draw.text((p1_x + 36 + chart_w, by + 20), f"{b['val']} min", font=font_bold_md, fill=b["color"])
        draw.text((p1_x + 115 + chart_w, by + 22), b["tag"], font=font_mono_xs, fill=(120, 138, 160))

    # SLA 15 min line
    sla_line_x = p1_x + 24 + int(chart_w * (15.0 / 25.0))
    draw.line([(sla_line_x, bars_y + 10), (sla_line_x, bars_y + 255)], fill=(248, 203, 70, 180), width=1)
    draw.text((sla_line_x - 36, bars_y - 8), "15m SLA Cap", font=font_mono_xs, fill=(248, 203, 70))

    # Fleet Insight note inside panel
    note_box_y = panels_y + panel_h - 48
    draw.line([(p1_x + 24, note_box_y), (p1_x + panel_w - 24, note_box_y)], fill=(26, 36, 50), width=1)
    draw.text((p1_x + 24, note_box_y + 14), "INSIGHT: Rain causes +34% delay; dark-store staging cuts queue wait by 2.4 min", font=font_mono_xs, fill=(248, 203, 70))


    # RIGHT PANEL: Delivery Distance vs. SLA Success Rate (%)
    p2_x = p1_x + panel_w + gap
    draw.rounded_rectangle([p2_x, panels_y, p2_x + panel_w, panels_y + panel_h], radius=12, fill=(16, 22, 32), outline=(30, 42, 60), width=1)

    # Right Header
    draw.text((p2_x + 24, panels_y + 20), "On-Time Fulfillment Rate by Radial Distance Band", font=font_bold_lg, fill=(255, 255, 255))
    draw.text((p2_x + 24, panels_y + 52), "Courier Dispatch Radius Optimization Analysis (< 3.2 km Threshold)", font=font_mono_xs, fill=(140, 160, 185))

    # Radius bands
    r_bands = [
        {"band": "Zone 1: < 1.8 km", "pct": "96.2%", "val": 96.2, "status": "Ultra-Fast Fulfillment", "color": (16, 185, 129)},
        {"band": "Zone 2: 1.8 – 2.5 km", "pct": "93.4%", "val": 93.4, "status": "High Reliability SLA", "color": (16, 185, 129)},
        {"band": "Zone 3: 2.5 – 3.2 km", "pct": "88.1%", "val": 88.1, "status": "Optimal SLA Boundary", "color": (248, 203, 70)},
        {"band": "Zone 4: 3.2 – 4.2 km", "pct": "63.5%", "val": 63.5, "status": "Rapid Latency Dropoff", "color": (245, 158, 11)},
        {"band": "Zone 5: > 4.2 km", "pct": "39.8%", "val": 39.8, "status": "Severe Violation Risk", "color": (244, 63, 94)},
    ]

    r_bars_y = panels_y + 85
    r_chart_w = panel_w - 240
    for idx2, rb in enumerate(r_bands):
        rby = r_bars_y + idx2 * 50
        draw.text((p2_x + 24, rby), rb["band"], font=font_reg_md, fill=(220, 230, 245))
        # Track
        draw.rounded_rectangle([p2_x + 24, rby + 22, p2_x + 24 + r_chart_w, rby + 34], radius=3, fill=(22, 30, 44))
        # Fill
        rf_w = int(r_chart_w * (rb["val"] / 100.0))
        draw.rounded_rectangle([p2_x + 24, rby + 22, p2_x + 24 + rf_w, rby + 34], radius=3, fill=rb["color"])
        # Numbers
        draw.text((p2_x + 36 + r_chart_w, rby + 16), rb["pct"], font=font_bold_md, fill=rb["color"])
        draw.text((p2_x + 105 + r_chart_w, rby + 18), rb["status"], font=font_mono_xs, fill=(120, 138, 160))

    # Right footer insight
    draw.line([(p2_x + 24, note_box_y), (p2_x + panel_w - 24, note_box_y)], fill=(26, 36, 50), width=1)
    draw.text((p2_x + 24, note_box_y + 14), "STRATEGY: Geofencing < 3.2 km hubs projects an 18% turnaround velocity increase", font=font_mono_xs, fill=(16, 185, 129))

    # 5. Bottom Dashboard Footer Status Bar
    foot_y = H - 52
    draw.line([(pad_x, foot_y - 12), (pad_x + content_w, foot_y - 12)], fill=(22, 30, 44), width=1)
    pipeline_txt = "ANALYTICS PIPELINE: SQL (Windowing & Aggregations)  ➔  Python (Outliers & Imputation)  ➔  Power BI (Star Schema)  ➔  DAX Measures"
    draw.text((pad_x, foot_y), pipeline_txt, font=font_mono_xs, fill=(110, 130, 155))
    draw.text((pad_x + content_w - 260, foot_y), "BLINKIT OPERATIONS CASE STUDY", font=font_mono_xs, fill=(248, 203, 70))

    # Save
    base.save('public/images/projects/banner-blinkit.jpg', 'JPEG', quality=96)
    print("Generated authentic Power BI style Blinkit Analytics banner: (1600, 900)")

if __name__ == '__main__':
    make_blinkit_dashboard()
