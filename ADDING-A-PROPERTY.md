# Adding, Updating, and Hiding a Property

Every property on the website — the homepage cards, the Available Homes
page, and each property's own page — comes from one file:

**`assets/properties-data.js`**

You don't need to touch any other file to add, change, or hide a property.
Open that file in a plain text editor (Notepad works fine).

## Adding photos

1. Put the photo file somewhere inside the `assets` folder — for example,
   create `assets/photos/` and drop it there.
2. Before using any photo, check it for:
   - house numbers visible anywhere in the shot
   - license plates
   - street signs
   - anything else that could identify the exact address
3. In the property's record in `properties-data.js`, set:
   - `mainImage` to the file's path, e.g. `"assets/photos/mount-holly-1.jpg"`
   - `galleryImages` to a list of additional photo paths, e.g.
     `["assets/photos/mount-holly-2.jpg", "assets/photos/mount-holly-3.jpg"]`
4. Save the file and reload the page — the placeholder icon is replaced by
   your photo automatically, everywhere that property appears.

If you leave `mainImage` as `""`, the site shows a plain "Photo coming soon"
placeholder instead. That's expected and fine — better than a fake photo.

## Adding a new property record

1. Open `assets/properties-data.js`.
2. Copy one whole record — from its opening `{` to its closing `},` —
   and paste it as a new entry in the list.
3. Fill in the fields for the new property. Leave anything you don't know
   yet as `""` (or `[]` for lists) — never guess or invent a number.
4. Give it a unique `id` (letters, numbers, and dashes only, no spaces),
   for example `"belmont-nc-1"`.
5. Set `status` to one of: `available`, `coming-soon`, `under-contract`,
   `sold`, or `hidden` (see below).
6. Set `displayOrder` to control where it appears among other properties
   with the same status — lower numbers show first.
7. Update `lastUpdated` to today's date, in `YYYY-MM-DD` format.
8. Save the file. No other page needs to change.

**Never put a street address, owner name, occupant information, parcel
number, loan information, or a private Drive link in this file.** It is
public. City and state only.

## Changing a property's status

Open the record and change the `status` field:

| status            | Where it shows                          |
|-------------------|------------------------------------------|
| `available`       | "Available" section, with a live link to its property page |
| `coming-soon`      | "Coming Soon" section, with a "Join the Buyer List" button |
| `under-contract`   | "Under Contract" section, no button |
| `sold`             | "Previously Available" section (city/state only, no button) |
| `hidden`           | Nowhere — fully removed from every page |

That's it — one field change updates the homepage, the Available Homes
page, and the property's own page all at once.

## Hiding a property

Set `status` to `"hidden"`. The record stays in the file (so you don't
lose the data) but disappears from the entire site. To bring it back
later, just change `status` back to whatever it should be.

## Checking your result

The whole site is plain HTML, CSS, and JavaScript — no server or install
needed to preview it.

1. Save `properties-data.js`.
2. Double-click `index.html` (or whichever page you're checking) to open
   it in your browser.
3. If it was already open, just reload the page (F5).

If a section looks wrong, double-check for a missing comma between
records in `properties-data.js` — that's the most common mistake, and it
will make the whole properties list fail to load on every page.
