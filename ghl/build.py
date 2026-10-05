#!/usr/bin/env python3
"""
Bygger de filer, der kopieres ind i GoHighLevel (GHL).

  python3 ghl/build.py                      # assets fra jsDelivr (commit i ASSET_COMMIT)
  python3 ghl/build.py --base http://localhost:3000/ --out .claude/test/ghl   # lokal test

Output i ghl/:
  lang.html          Lang kampagneside (variant B). Genereres fra landing.html,
                     landing.css og landing.js, så de tre filer er den eneste kilde.
  kort.html          Kort kampagneside (variant A), fra ghl/src/kort.html
  tak.html           Takkeside, fra ghl/src/tak.html
  head-*.html        Kode til GHL's "Tracking Code > Head" (fra ghl/src/head-*.html)

Den lange side scopes, så den kan ligge i et Custom Code-element uden at
kollidere med GHL's globale CSS:
  - alle klasser får prefix "tf-" (i CSS, HTML og strenge i JS)
  - alle CSS-regler scopes under #tf-lang, keyframes får prefix
  - CSS-regler, der ikke bruges af siden, fjernes
  - stier til images/ og fonts/ peger på ASSETS (CDN)
"""
import argparse
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
ROOT_ID = "tf-lang"
PREFIX = "tf-"

# jsDelivr med et FULDT commit-hash giver "max-age=31536000, immutable".
# Opdatér hashet, når der er pushet nye billeder/fonte/videoer.
ASSET_COMMIT = "REPLACE_WITH_COMMIT_HASH"
REPO_SLUG = "Majestic100/tattoo-fashion-r-dovre"


def read(p):
    with open(os.path.join(REPO, p), encoding="utf-8") as f:
        return f.read()


def write(p, s):
    p = os.path.join(REPO, p) if not os.path.isabs(p) else p
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)


# ---------------------------------------------------------------- CSS ---

def strip_css_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def parse_blocks(css):
    """Returnerer [(prelude, body)] på topniveau; body er tekst mellem { }."""
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find("{", i)
        if j == -1:
            break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == "{":
                depth += 1
            elif css[k] == "}":
                depth -= 1
            k += 1
        out.append((prelude, css[j + 1:k - 1]))
        i = k
    return out


CLASS_RE = re.compile(r"\.(-?[_a-zA-Z][\w-]*)")


def is_external(c):
    """Klasser som GHL's form_embed.js selv indsætter (ep-*): må ikke omdøbes."""
    return c.startswith("ep-")


def css_classes(css):
    names = set()
    for prelude, body in parse_blocks(strip_css_comments(css)):
        if prelude.startswith("@media") or prelude.startswith("@supports"):
            names |= css_classes(body)
        elif not prelude.startswith("@"):
            names |= set(CLASS_RE.findall(prelude))
    return names


def scope_selector(sel, used, rename):
    sel = sel.strip()
    if not sel:
        return None
    classes = CLASS_RE.findall(sel)
    if any(c not in used for c in classes if c != "js" and not is_external(c)):
        return None  # reglen bruges ikke af siden
    if sel.startswith("html"):
        return sel  # fx scroll-behavior på hele siden
    js = False
    if sel.startswith(".js "):
        js, sel = True, sel[4:]
    sel = CLASS_RE.sub(lambda m: "." + (m.group(1) if is_external(m.group(1)) else rename(m.group(1))), sel)
    root_tok = re.match(r"(:root|body)(?![\w-])", sel)
    if root_tok:
        sel = "#" + ROOT_ID + sel[root_tok.end():]
    else:
        sel = "#" + ROOT_ID + " " + sel
    return ("." + PREFIX + "js " + sel) if js else sel


def transform_rules(css, used, rename, keyframes):
    out = []
    for prelude, body in parse_blocks(css):
        if prelude.startswith("@media") or prelude.startswith("@supports"):
            inner = transform_rules(body, used, rename, keyframes)
            if inner.strip():
                out.append(prelude + "{" + inner + "}")
        elif prelude.startswith("@keyframes"):
            name = prelude.split()[1]
            out.append("@keyframes " + PREFIX + name + "{" + minify_decls(body, nested=True) + "}")
        elif prelude.startswith("@font-face"):
            out.append("@font-face{" + minify_decls(body) + "}")
        elif prelude.startswith("@"):
            out.append(prelude + "{" + body + "}")
        else:
            sels = [scope_selector(s, used, rename) for s in prelude.split(",")]
            sels = [s for s in sels if s]
            if not sels:
                continue
            decls = minify_decls(body)
            for k in keyframes:  # animation-navne
                decls = re.sub(r"(?<![\w-])" + re.escape(k) + r"(?![\w-])", PREFIX + k, decls)
            out.append(",".join(sels) + "{" + decls + "}")
    return "".join(out)


def minify_decls(body, nested=False):
    if nested:  # keyframes: "from{..} 50%{..}"
        return "".join(p + "{" + minify_decls(b) + "}" for p, b in parse_blocks(body))
    body = re.sub(r"\s+", " ", body).strip()
    body = re.sub(r"\s*([:;,])\s*", r"\1", body)
    body = body.replace(";}", "}").rstrip(";")
    # url(...) og strenge må ikke få fjernet mellemrum inde i sig, men vores
    # CSS har ingen sådanne; gendan mellemrum efter komma i fx rgba() er ok.
    return body


# GHL sætter egne fonte/farver/margener på elementer. Nulstil til arv inde i
# roden; klasse-regler (#tf-lang .tf-x) har højere specificitet og vinder.
RESET = (
    "#{r} :is(h1,h2,h3,h4,p,li,ul,ol,figure,blockquote,strong,em,s,small,span,label)"
    "{{color:inherit;font-family:inherit;font-size:inherit;font-weight:inherit;"
    "line-height:inherit;letter-spacing:inherit;text-transform:inherit;text-align:inherit}}"
    "#{r} :is(strong,b){{font-weight:700}}"
    "#{r} ul,#{r} ol{{list-style:none}}"
    "#{r} img,#{r} video,#{r} iframe{{border:0;max-width:100%}}"
    "#{r} a{{text-decoration:none}}"
    "#{r} button{{background:none;border:0;cursor:pointer;line-height:inherit;text-transform:none}}"
).format(r=ROOT_ID)


# ----------------------------------------------------------------- JS ---

STR_RE = re.compile(r"'(?:[^'\\\n]|\\.)*'")


def js_classes(js):
    toks = set()
    for s in STR_RE.findall(js):
        toks |= set(re.findall(r"[a-zA-Z][\w-]*", s))
    return toks


def rename_in_js(js, names):
    pat = re.compile(r"(?<![\w-])(" + "|".join(sorted(map(re.escape, names), key=len, reverse=True)) + r")(?![\w-])")

    def fix(m):
        s = m.group(0)
        if "images/" in s or "http" in s:
            return s
        return pat.sub(lambda k: PREFIX + k.group(1), s)
    return STR_RE.sub(fix, js)


def minify_js(js):
    js = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
    js = "\n".join(l for l in js.split("\n") if not l.strip().startswith("//"))
    js = re.sub(r"\n\s*\n+", "\n", js)
    return "\n".join(l.strip() for l in js.split("\n") if l.strip())


# --------------------------------------------------------------- HTML ---

ASSET_ATTR_RE = re.compile(r'((?:src|poster|data-src|href)=")(images/|fonts/)')
SRCSET_RE = re.compile(r'((?:srcset|imagesrcset)=")([^"]+)(")')


def absolutize(html, base):
    html = ASSET_ATTR_RE.sub(lambda m: m.group(1) + base + m.group(2), html)
    html = SRCSET_RE.sub(lambda m: m.group(1) + re.sub(r"(^|,\s*)(images/)", lambda k: k.group(1) + base + k.group(2), m.group(2)) + m.group(3), html)
    return html


def rename_classes_in_html(html, names):
    def fix(m):
        toks = [PREFIX + t if t in names else t for t in m.group(2).split()]
        return m.group(1) + " ".join(toks) + m.group(3)
    return re.sub(r'(\sclass=")([^"]*)(")', fix, html)


# ------------------------------------------------------------- BUILD ---

def build_lang(base):
    html = read("landing.html")
    css = read("landing.css")
    js = read("landing.js")

    body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)
    body = re.sub(r'\s*<script src="landing\.js"></script>', "", body)
    body = re.sub(r"<!--(?!\s*\[).*?-->", "", body, flags=re.S)  # HTML-kommentarer ud
    # form_embed.js må vente til markup er parset

    css_names = css_classes(css)
    html_names = set()
    for m in re.findall(r'\sclass="([^"]*)"', body):
        html_names |= set(m.split())
    js_names = js_classes(js) & (css_names | html_names)
    used = html_names | js_names
    all_names = css_names | html_names
    rename = lambda n: PREFIX + n

    keyframes = re.findall(r"@keyframes\s+([\w-]+)", css)
    scoped = transform_rules(strip_css_comments(css), used, rename, keyframes)
    scoped = scoped.replace("url(fonts/", "url(" + base + "fonts/").replace("url('fonts/", "url('" + base + "fonts/")

    # En overskydende </div> ignoreres på en selvstændig side, men inde i
    # snippet'ens wrapper lukker den #tf-lang for tidligt. Stop buildet.
    for tag in ("div", "section", "a", "ul", "header", "footer"):
        opened = len(re.findall(r"<%s[\s>]" % tag, body))
        closed = len(re.findall(r"</%s>" % tag, body))
        if opened != closed:
            raise SystemExit("landing.html: %d <%s> men %d </%s>. Ret markup før build." % (opened, tag, closed, tag))

    body = rename_classes_in_html(body, all_names)
    body = absolutize(body, base)

    js = rename_in_js(js, all_names & (js_names | css_names))
    js = js.replace("'images/", "'" + base + "images/")
    js = minify_js(js)

    head_links = extract_head_assets(html, base)

    return (
        "<!--\n"
        "  TATTOO FASHION RØDOVRE: LANG KAMPAGNESIDE (variant B i split-testen)\n"
        "  GENERERET af ghl/build.py ud fra landing.html, landing.css og landing.js.\n"
        "  Ret ikke i denne fil. Ret i landing.* og kør: python3 ghl/build.py\n"
        "  Indsæt HELE filen i ét Custom Code-element i GHL (fuld bredde, 0 padding).\n"
        "-->\n"
        "<script>document.documentElement.classList.add('" + PREFIX + "js');"
        "document.documentElement.lang='da';</script>\n"
        + head_links +
        "<style>" + RESET + scoped + "</style>\n"
        '<div id="' + ROOT_ID + '">' + body.strip() + "</div>\n"
        "<script>\n" + js + "\n</script>\n"
    )


def extract_head_assets(html, base):
    """Preload-links fra landing.html's <head> (fonte og hero), gjort absolutte."""
    head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
    links = re.findall(r'<link rel="(?:preload|preconnect)"[^>]*>', head)
    links += re.findall(r'<link href="https://fonts\.googleapis\.com[^>]*>', head)
    return "".join(absolutize(l, base) + "\n" for l in links)


def build_template(name, base):
    s = read("ghl/src/" + name)
    return s.replace("{{ASSETS}}", base)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", help="URL til repo-roden (slutter med /). Standard: jsDelivr@ASSET_COMMIT")
    ap.add_argument("--out", default="ghl", help="Mappe til output (relativt til repo)")
    a = ap.parse_args()
    if a.base:
        base = a.base
    elif re.fullmatch(r"[0-9a-f]{40}", ASSET_COMMIT):
        base = "https://cdn.jsdelivr.net/gh/%s@%s/" % (REPO_SLUG, ASSET_COMMIT)
    else:
        base = "https://majestic100.github.io/tattoo-fashion-r-dovre/"
    out = a.out
    write(os.path.join(out, "lang.html"), build_lang(base))
    for f in sorted(os.listdir(os.path.join(HERE, "src"))):
        if f.endswith(".html"):
            write(os.path.join(out, f), build_template(f, base))
    print("Bygget til", out, "med assets fra", base)


if __name__ == "__main__":
    main()
