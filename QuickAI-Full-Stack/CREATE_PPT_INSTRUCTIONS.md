# How to Create PowerPoint from Markdown

## Option 1: Using Python Script (Recommended)

### Step 1: Install Required Library
```bash
pip install python-pptx
```

### Step 2: Run the Script
```bash
python create_presentation.py
```

This will create `QuickAI_Presentation.pptx` in the same directory.

---

## Option 2: Manual Conversion

### Using Online Tools:
1. Go to https://www.markdowntopdf.com/ or similar
2. Upload `QuickAI_Presentation.md`
3. Convert to PDF
4. Import PDF into PowerPoint

### Using Pandoc (Command Line):
```bash
# Install pandoc first
pandoc QuickAI_Presentation.md -o QuickAI_Presentation.pptx
```

---

## Option 3: Copy to PowerPoint Manually

1. Open `QuickAI_Presentation.md` in a markdown viewer
2. Open PowerPoint
3. Copy each slide section
4. Paste into PowerPoint slides
5. Format as needed

---

## Option 4: Use VS Code Extension

1. Install "Markdown Preview Enhanced" extension in VS Code
2. Open `QuickAI_Presentation.md
3. Right-click and select "Export to PowerPoint"

---

## Notes

- The Python script (`create_presentation.py`) automatically formats slides
- You may need to adjust formatting manually after conversion
- Images and complex formatting might need manual adjustment
- The presentation has 26+ slides covering all aspects of the project

---

## Quick Start

```bash
# Navigate to project directory
cd QuickAI-Full-Stack

# Install python-pptx
pip install python-pptx

# Run conversion script
python create_presentation.py

# Open the generated PPTX file
start QuickAI_Presentation.pptx  # Windows
open QuickAI_Presentation.pptx   # Mac
```

