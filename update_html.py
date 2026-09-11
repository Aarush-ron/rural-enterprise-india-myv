import glob
import re
for filepath in glob.glob("*.html"):
    with open(filepath, "r") as f:
        content = f.read()
    
    # Replace normal
    content = content.replace(
        '<li class="login-nav"><a href="login.html">👤 Login</a></li>',
        '<li class="login-nav" style="position:relative;"><a href="login.html" id="loginBtn">👤 Login</a><div id="accountMenu" class="dropdown-menu"></div></li>'
    )
    # Replace active one (login.html)
    content = content.replace(
        '<li class="login-nav"><a class="active" href="login.html">👤 Login</a></li>',
        '<li class="login-nav" style="position:relative;"><a class="active" href="login.html" id="loginBtn">👤 Login</a><div id="accountMenu" class="dropdown-menu"></div></li>'
    )
    
    with open(filepath, "w") as f:
        f.write(content)
print("Done")
