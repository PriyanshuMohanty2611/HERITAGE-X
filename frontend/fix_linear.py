import os
import re

files_to_check = [
    r'app/vault/page.tsx',
    r'app/profile/page.tsx',
    r'app/page.tsx',
    r'app/ai/page.tsx',
    r'app/explore/page.tsx'
]

for file in files_to_check:
    path = os.path.join(r"C:\Users\ASUS\OneDrive\Desktop\NIT\frontend", file)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # fix tailwind linear gradient
        new_content = content.replace('bg-linear-to-', 'bg-gradient-to-')
        
        if content != new_content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Fixed bg-linear-to in", file)
