Solar Chapter
---

## Editing pages' content?
- All page content lives in the [src/content](src/content) directory.
- All page content have a file extension, namely `.md` (Markdown). This type of file is used to format your text. See what formatting you can do to your text using this [cheatsheet](https://www.markdownguide.org/cheat-sheet/).
- All media content lives in the [src/assets](src/assets) directory and can be referenced in your content.

## Editing map in the projects page?
- Open [projects.js](assets/js/projects.js#L1) file
- Update `chaptersData` variable. It's pretty self-explanatory. It contains list of "Kabupaten" and villages where Solar Chapter's projects are

## Technical notes
### Technologies
- Jekyll: Static site generator

### Setting up local development
- Start a local server
`jekyll serve --livereload`

### Using media
If possible, always serve files through Content Delivery Network (CDN) so that they can be highly available and accessed quicker.
- Upload media files (pictures/videos) at Cloudinary. Contact Solar Chapter for account access.
- Use the URL from the hosted files