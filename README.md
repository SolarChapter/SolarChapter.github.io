✨☀️ Solar Chapter ☀️✨
===

## Non-Technical notes
### How to update page's content?
1. All content are stored under the [content](content) directory. So go to that directory.
    - All page content have a file extension, namely `.md` (Markdown). This type of file is used to format your text. See what formatting you can do to your text using this [cheatsheet](https://www.markdownguide.org/cheat-sheet/).
    - File name normally follow the link's name. i.e: content of solarchapter.com/donate page should live under `content/donate.md`
    - All media content lives in the [assets](assets) directory and can be referenced in your content. Assets media can be such as logo/small images. All image resources for gallery use should be stored outside of this repository. See [Where to store image resources?](/#where-to-store-image-resources) section
2. You should see the following `key-value` pairs. The key names should be self-explanatory.
    i.e:
    ```
    title: "Chapter One: Water for Umutnana"
    ```
    This means that this pair should correspond to the page's title. I would recommend to refer to the actual page's content and backtrack the content to the markdown file.

### Adding a new project page?
1. Check the [first project page](content/projects/chapter-one-umutnana.md) and use it as an example

### Editing map in the projects page?
1. Open [projects.js](assets/js/projects.js#L1) file
2. Update `chaptersData` variable. It's pretty self-explanatory. It contains list of "Province", "Kabupaten" and villages where Solar Chapter's projects are

### [Where to store resources](#where-to-store-image-resources)?
If possible, always serve files through Content Delivery Network (CDN) so that they can be highly available and accessed quicker.
- Upload media files (pictures/videos) at Cloudinary. Contact Solar Chapter for account access.
- Use the URL from the hosted files

## Technical notes
### Technologies
- Jekyll: Static site generator.

### Setting up local development
- Start a local server
```
jekyll serve --livereload
```