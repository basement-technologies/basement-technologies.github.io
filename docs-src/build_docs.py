"""
This script builds out the docs/ directory based on the HTML template, Markdown files, and JSON config in docs-src/
It creates directories and in them an index.html file.
This is for pretty URLs, like /docs/introduction, rather than /docs/introduction.html
"""

import json
import sys
import re
from pathlib import Path

from markdown import Markdown
from jinja2 import Template


def preprocess_inline_code(text):
    """
    Convert the inline highlighting syntax that was used with MkDocs:
    
    `#!douglang code`

    into something that can be used by this script.
    """
    return re.sub(
        r"`#!douglang\s+(.*?)`",
        r'<code class="language-douglang">\1</code>',
        text,
        flags=re.DOTALL,
    )


if __name__ == "__main__":
    try:
        with open("template.html") as f:
            tpl = Template(f.read())

        with open("pages.json") as f:
            pages = json.load(f)

        # Build URLs before rendering navigation
        for page in pages:
            slug = page["title"].replace(" ", "-").lower()
            page["slug"] = slug
            page["url"] = f"/docs/{slug}/"

        md = Markdown(
            extensions=[
                "extra",
                "fenced_code",
            ]
        )

        for page in pages:
            with open(page["file"]) as content:
                markdown_text = content.read()

            markdown_text = preprocess_inline_code(markdown_text)

            html_content = md.convert(markdown_text)

            output_dir = Path("../docs") / page["slug"]
            output_dir.mkdir(parents=True, exist_ok=True)

            output_file = output_dir / "index.html"

            with open(output_file, "w") as f:
                f.write(
                    tpl.render(
                        pages=pages,
                        page=page,
                        content=html_content,
                    )
                )

    except Exception as e:
        print(e)
        sys.exit(1)