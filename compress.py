# CONFIGURATION ---------------------------------

# Paths to a files with all your html, css, and js
# Note: They must use ONLY single quotes (') to denote strings!

source_dir = "src"

files = {
  "index.html": "index_html",
  "style.css": "style_css",
  "rsa-utils/jsbn_1.js": "jsbn_1_js",
  "rsa-utils/jsbn_2.js": "jsbn_2_js",
  "rsa-utils/rng.js": "rng_js",
  "rsa-utils/prng4.js": "prng4_js",
  "rsa-utils/rsa.js": "rsa_js",
  "script.js": "script_js"
}

output_dir = "build"

output_file = "softap_pages.h"

# END CONFIGURATION -----------------------------

import re
import sys
import os
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
  
  if not os.path.exists(output_dir):
      os.makedirs(output_dir)
      
  open_type = "w"
  
  # compress by filetype
  for filename, variable in files.items():
    text = ""

    with open(os.path.join(source_dir, filename), "r") as f:
      text = f.read()
      extension = filename.split(".")[-1]
      
      if (extension == "js"):
        text = js_minify(text, mangle=True, mangle_toplevel=False)
        text += "\n"
      
      elif (extension == "css"):
        text = css_minify(text)
      
      elif (extension == "html"):
        text = compress_html(text)
      
      else:
        print >> sys.stderr, "Failed to compress file, unknown extension: " + extension
    
        
    with open(os.path.join(output_dir, output_file), open_type) as o:
      o.write("\nconst char " + variable + "[] = ")
      o.write('"'+text.replace("\n", "\\n")+'";\n')
  
    with open(os.path.join(output_dir, "intructions.txt"), open_type) as o:
      if open_type =="w":
        # First loop
        o.write("Add {0} to hal/src/photon/ \n\nIn softap.cpp, modify line 923 to read ... page[{1}];\n\nIn softap_ip.c, add '#include \"{0}\" and add the below lines to the list of pages.\n\n".format(output_file, 9+len(files)))
        
      template = '{{ "/{0}", "text/html", WICED_STATIC_URL_CONTENT, .url_content.static_data = {{{1}, sizeof({1}) }}}},\n'
      o.write(template.format(filename, variable))
    
    open_type = "a" # Append future
