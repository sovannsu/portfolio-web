# assets/

## resume.pdf — the download link slot

The site has a **Download resume (PDF)** button in the hero on the home page and a
**Resume (PDF)** link in the footer of every page. Both are hidden by default.

To turn them on, drop your resume here with exactly this name:

```
assets/resume.pdf
```

Commit and push. `js/main.js` sends a HEAD request for the file on page load and
reveals both links only when the server returns 200, so nothing ever links to a
missing file. Remove the PDF and the links hide themselves again — no HTML edits
either way.

Note: the check only runs over `http://` or `https://`. When you open the pages
directly from disk (a `file://` URL) the links stay hidden even if the PDF is
there. Use the local server command in the root README to preview them.

### Before you commit a resume here

Anything in this folder becomes public the moment the site deploys, and search
engines will index a PDF. Your current resume has your phone number and home city
on it. Consider committing a version with the phone number removed, keeping email,
LinkedIn, and GitHub — that matches what the rest of the site shows.

## favicon.svg

The browser-tab icon: an "SS" monogram on the site's accent blue. Edit the colors
here, or swap the file for your own. If you want broader compatibility with older
browsers, add a `favicon.ico` and a second `<link rel="icon">` tag in each page's
`<head>`.
