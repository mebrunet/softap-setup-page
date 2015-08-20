# CONFIGURATION ---------------------------------

# Paths to a files with all your html, css, and js
# Note: They must use ONLY single quotes (') to denote strings!

index_file = {"src/index.html": "index_html"}

css_files = {"src/style.css": "style_css"}

js_files = {  
  "rsa-utils/jsbn.js": "jsbn_js",
  "rsa-utils/rng.js": "rng_js",
  "rsa-utils/prng4.js": "prng4_js",
  "rsa-utils/rsa.js": "rsa_js",
  "src/script.js": "script_js"
}

output_file = "build/softap_pages.h"

# END CONFIGURATION -----------------------------

import re
from slimit import minify as js_minify
from csscompressor import compress as css_minify
 
def compress_html(text):
  
  # Remove comments
  text = re.sub(re.compile("<!--(.*?)-->", re.DOTALL), "", text) #DOTALL includes newlines
  
  # Then whitespace
  return re.sub(">\s+<","><",text)


# Main ----------------------------------------

# TODO - Add a check to verify no double quotes.

if __name__ == "__main__":

  # compress js
  for filename, variable in js_files.items():
    js = ""  

    with open(filename, "r") as f:
      js = f.read()
      js = js_minify(js, mangle=True, mangle_toplevel=False)

    with open(output_file, "a") as o:
      o.write("\n\nconst char " + variable + "[] = ")
      o.write('"'+js.replace("\n", "\\n")+'"') #Escape any newlines

"""
  # compress css
  with open(input_css, "r") as infile:
    css = infile.read()
    css = css_minify(css)

  # Now html
  with open(input_html, "r") as infile:
    html = compress_html(infile.read())

  # Combine results
  result = inject(html,css, js)
  
  # Escape newlines and write to output
  with open(output_file, "w") as outfile:
    outfile.write(result.replace("\n", "\\n"))
"""