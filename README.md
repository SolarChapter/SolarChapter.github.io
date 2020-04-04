✨☀️ Solar Chapter ☀️✨
===

## How to?
### How to update page's content?
1. All content are stored under the [content](content) directory. So go to that directory.
    - All page content have a file extension, namely `.md` (Markdown). This type of file is used to format your text. See what formatting you can do to your text using this [cheatsheet](https://www.markdownguide.org/cheat-sheet/).
    - File name normally follow the link's name. i.e: content of solarchapter.com/donate page should live under `content/donate.md`
    - All media content lives in the [assets](assets) directory and can be referenced in your content. Assets media can be such as logo/small images. All image resources for gallery use should be stored outside of this repository. See [Where to store image resources?](#where-to-store-image-resources) section
2. You should see the following `key-value` pairs. The key names should be self-explanatory.
    i.e:
    ```
    title: "Chapter One: Water for Umutnana"
    ```
    This means that this pair should correspond to the page's title. I would recommend to refer to the actual page's content and backtrack the content to the markdown file.
    - There are some pairs that are for the "configuration" of the page. Refer to your web developer to understand what they are for. Here are all of configuration pairs:
        - `permalink`: Link of the page
        - `layout`: Layout's file name. It lives under [_layouts](_layouts) directory
        - `menu-color`: Color of the menu. Either `dark` or `light`
        - `title`: Page's title
        - `description`: Page's description. Used in the metadata for SEO purposes
        - `metadataImage`: Image displayed when the page is being shared in social media.
        - `custom_css`: List of CSS files for the page
        - `custom_js`: List of JS files for the page
    - Value can be in `html` format too for complex styling if needed.

### Adding a new project page?
1. Check the [first project page](content/projects/chapter-one-umutnana.md) and use it as an example.

### Editing map in the projects page?
Note: Province and Regency in the markdown and javascript file should be the same!
1. Open [projects.js](assets/js/projects.js#L1) file
2. Update `chaptersData` variable. It's pretty self-explanatory. It contains list of "Province", "Kabupaten" and villages where Solar Chapter's projects are

### <a id="where-to-store-image-resources"></a>Where to store image resources?
If possible, always serve files through Google Photos because repository is not designed to control revision of images. Other than that, storing images in the CDN will make them be highly available and accessed quicker.
1. Google Photos for images
- Upload media files (pictures/videos) at Solar Chapter's Google Photos account at the "SolarChapter.com Website" album. Contact Solar Chapter for account access.
- View the image and right-click the image and select "Copy image address". The image address should be hosted at `lh3.googleusercontent.com`.
2. Cloudinary for video. Contact Solar Chapter for account access 

## Notes
1. Don't forget to have `---` to start and end your `Markdown` files!

## Technologies
- Jekyll: Static site generator.

## Setting up local development
- Start a local server
```
jekyll serve --livereload
```