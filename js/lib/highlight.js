highlight() {
    let pres = document.querySelectorAll("pre");
    for (let pre of pres) {
        try {
            // find code element (safe)
            const codeElem = pre.querySelector("code") || pre.firstElementChild;
            if (!codeElem) continue;

            // code text
            const code = codeElem.textContent || "";

            // find a class that indicates language, e.g. language-markdown, lang-md, md
            const classes = Array.from(codeElem.classList || []);
            let langClass = classes.find(c => /^language-|^lang-/.test(c)) || classes[0] || "";
            // strip prefixes like language- or lang-
            let language = langClass.replace(/^(language-|lang-)/, "").trim();
            if (!language) {
                // also try pre.classList as fallback
                const preClasses = Array.from(pre.classList || []);
                const preLang = preClasses.find(c => /^language-|^lang-/.test(c)) || preClasses[0] || "";
                language = (preLang || "").replace(/^(language-|lang-)/, "").trim();
            }
            if (!language) language = "plaintext";

            // attempt highlight, fall back to auto detect if language unknown
            let highlighted;
            try {
                // prefer explicit language if registered
                if (language !== "plaintext" && hljs.getLanguage && hljs.getLanguage(language)) {
                    highlighted = hljs.highlight(code, { language }).value;
                } else {
                    // fallback: auto detect
                    highlighted = hljs.highlightAuto(code).value;
                    // if detected language is useful, update language var
                    const autoLang = hljs.highlightAuto(code).language;
                    if (autoLang) language = autoLang;
                }
            } catch (err) {
                // very defensive: if highlight fails, use raw escaped text
                highlighted = code;
            }

            // render HTML (keep your structure)
            pre.innerHTML = `
            <div class="code-content hljs">${highlighted}</div>
            <div class="language">${language}</div>
            <div class="copycode">
            <i class="fa-solid fa-copy fa-fw"></i>
            <i class="fa-solid fa-check fa-fw"></i>
            </div>
            `;

            // line numbers (use the rendered content element)
            let content = pre.querySelector(".code-content");
            if (content && typeof hljs.lineNumbersBlock === "function") {
                try {
                    hljs.lineNumbersBlock(content, { singleLine: true });
                } catch (e) { /* ignore */ }
            }

            // copy button
            let copycode = pre.querySelector(".copycode");
            if (copycode) {
                // remove previous listeners (defensive)
                copycode.replaceWith(copycode.cloneNode(true));
                copycode = pre.querySelector(".copycode");
                copycode.addEventListener("click", async () => {
                    if (this.copying) return;
                    this.copying = true;
                    copycode.classList.add("copied");
                    try {
                        await navigator.clipboard.writeText(code);
                        await this.sleep(1000);
                    } catch (e) {
                        // ignore clipboard errors
                    }
                    copycode.classList.remove("copied");
                    this.copying = false;
                });
            }

        } catch (err) {
            // ensure one bad <pre> doesn't break all others
            // optionally console.error(err);
            continue;
        }
    }
}
