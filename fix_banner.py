import os
import re

files = [
    'pages/index.html',
    'pages/blog/index.html',
    'pages/connect/index.html',
    'pages/directory/index.html',
    'pages/docs/index.html',
    'pages/pricing/index.html',
    'pages/profile/index.html',
    'pages/projects/index.html',
    'pages/resume/index.html',
    'pages/services/index.html'
]

# Regex for the old script tag (without defer)
old_script_re = re.compile(r'\s*<script src="https://keepandroidopen\.org/banner\.js"></script>')
# Regex for the new script tag (with defer) in case it was partially inserted correctly
new_script_re = re.compile(r'\s*<script src="https://keepandroidopen\.org/banner\.js" defer></script>')

body_re = re.compile(r'(<body[^>]*>)', re.IGNORECASE)
new_script_text = '\n    <script src="https://keepandroidopen.org/banner.js" defer></script>\n'

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Remove all variations of the script tag from the entire file
        content = old_script_re.sub('', content)
        content = new_script_re.sub('', content)
        
        # 2. Clean up literal backtick-n or backtick-r-n introduced by previous PowerShell failure
        content = content.replace('`n', '\n')
        content = content.replace('`r', '\r')
        
        # 3. Insert the correct script tag right after the body tag
        content = body_re.sub(r'\1' + new_script_text, content)
        
        # 4. Clean up any potential double newlines if we removed them elsewhere
        # (Optional, but let's keep it simple)

        with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print(f"Processed {file_path}")
    else:
        print(f"File not found: {file_path}")
