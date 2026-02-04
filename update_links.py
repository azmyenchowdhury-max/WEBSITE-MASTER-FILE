import os
import re

# List of attorney profile files to update
files = ['attorney-kamal.html', 'attorney-mustafa.html', 'attorney-kabir.html', 'attorney-rashed.html', 'attorney-mahadi.html']

# Mapping of attorney names to their profile pages
attorney_links = {
    'Nasrin Akter': 'attorney-nasrin.html',
    'Harun Rayhan': 'attorney-harun.html',
    'Mustafa Kamal Chowdhury': 'attorney-mustafa.html',
    'Mohammad Kabir': 'attorney-kabir.html',
    'Rashed': 'attorney-rashed.html',
    'Mahadi': 'attorney-mahadi.html',
    'Mohammed Mostofa Kamal': 'attorney-kamal.html'
}

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Replace each attorney card that doesn't have a link
        for attorney_name, link in attorney_links.items():
            # Pattern to match attorney cards without links
            pattern = rf'(<!-- {re.escape(attorney_name)} -->\s*<div class="col-lg-4 col-md-6">\s*<div class="attorney-card-compact">.*?</div>\s*</div>)'

            def replace_card(match):
                card_html = match.group(1)
                # Wrap with link
                return f'<!-- {attorney_name} -->\n                  <div class="col-lg-4 col-md-6">\n                    <a href="{link}" class="attorney-card-link">\n                      <div class="attorney-card-compact">' + card_html.split('<div class="attorney-card-compact">')[1].rsplit('</div>', 1)[0] + '</a>\n                  </div>'

            content = re.sub(pattern, replace_card, content, flags=re.DOTALL)

        if content != original_content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {file}')
        else:
            print(f'No changes needed for {file}')

print('All attorney profile pages have been updated with clickable attorney cards!')