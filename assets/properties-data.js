/*
 * Fairway Homes — public property data
 * ======================================
 * This file is the single source of truth for every property shown on the
 * website (homepage cards, Available Homes page, and individual property
 * pages). Edit this file to add, update, hide, or remove a property.
 *
 * See ADDING-A-PROPERTY.md in the project root for full step-by-step
 * instructions written for a non-technical editor.
 *
 * THIS FILE IS PUBLIC. Never put any of the following in it:
 *   - street addresses
 *   - owner or occupant names
 *   - parcel numbers
 *   - loan or payoff information
 *   - private Google Drive links
 *   - internal notes
 *
 * Field reference
 * ---------------
 * id                    Unique, short, no spaces. Used in the property page
 *                        URL (property.html?id=...). Once published, avoid
 *                        changing it — links elsewhere may point to it.
 * status                One of: "available", "coming-soon", "under-contract",
 *                        "sold", "hidden".
 *                          available      -> shows under "Available"
 *                          coming-soon    -> shows under "Coming Soon"
 *                          under-contract -> shows under "Under Contract"
 *                          sold           -> shows under "Previously Available"
 *                          hidden         -> shows nowhere on the site
 * city / state          City and state only. Never a street address.
 * priceDisplay          Plain text, e.g. "$224,900". Leave "" if not ready
 *                        to publish a price yet — blank fields are simply
 *                        left off the page, never guessed at.
 * bedrooms              e.g. 3. Leave "" if unknown.
 * bathrooms             e.g. 1. Leave "" if unknown.
 * squareFeet            e.g. 1560. Leave "" if unknown.
 * propertyType          e.g. "Single-Family Home", "Manufactured Home".
 * shortDescription      One or two plain sentences. No invented claims.
 * keyFeatures           A list of short phrases, e.g. ["City water and sewer"].
 *                        Leave as [] if none entered yet.
 * purchaseTermsSummary  Plain-language only (e.g. "Owner financing may be
 *                        available for qualified buyers"). Never a rate,
 *                        payment amount, or down payment figure — the site
 *                        does not publish financing specifics.
 * mainImage             Path to an image file (e.g. "assets/photos/mount-holly-1.jpg").
 *                        Leave "" until a real, screened photo exists.
 * galleryImages         A list of additional image paths. Leave as [].
 * closedYear            "sold" status only — the closing year as a string
 *                        (e.g. "2023"), shown on the card. Leave "" otherwise.
 * featured              true/false — whether this property is eligible to
 *                        show in the homepage preview section.
 * displayOrder          A number controlling sort order within its status
 *                        group. Lower numbers show first.
 * lastUpdated           "YYYY-MM-DD" — update this whenever you change a
 *                        record so visitors can see the page is current.
 */

const FAIRWAY_PROPERTIES = [
  {
    id: "mount-holly-nc-1",
    status: "available",
    city: "Mount Holly",
    state: "NC",
    priceDisplay: "$224,900",
    bedrooms: 3,
    bathrooms: 1,
    squareFeet: 1560,
    propertyType: "Single-Family Home",
    shortDescription: "A spacious Mount Holly home with flexible living space, a large eat-in kitchen and convenient access to I-85, I-485 and Charlotte Douglas International Airport.",
    keyFeatures: [
      "Large eat-in kitchen",
      "Main-level laundry",
      "Covered carport",
      "Fully fenced yard",
      "Detached storage/studio building",
      "Third bedroom with a separate exterior entrance",
      "New carpet in the living room and third bedroom"
    ],
    purchaseTermsSummary: "Owner financing may be available. Down payment, monthly payment and other terms depend on buyer qualification and the final agreement.",
    mainImage: "assets/photos/mount-holly/exterior.jpg",
    galleryImages: [
      "assets/photos/mount-holly/exterior.jpg",
      "assets/photos/mount-holly/living-1.jpg",
      "assets/photos/mount-holly/living-2.jpg",
      "assets/photos/mount-holly/room-1.jpg",
      "assets/photos/mount-holly/room-2.jpg"
    ],
    featured: true,
    displayOrder: 1,
    lastUpdated: "2026-09-07"
  },
  {
    id: "gastonia-nc-1",
    status: "coming-soon",
    city: "Gastonia",
    state: "NC",
    priceDisplay: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    shortDescription: "",
    keyFeatures: [],
    purchaseTermsSummary: "",
    mainImage: "",
    galleryImages: [],
    featured: true,
    displayOrder: 2,
    lastUpdated: "2026-09-04"
  },
  {
    id: "lancaster-sc-1",
    status: "coming-soon",
    city: "Lancaster",
    state: "SC",
    priceDisplay: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    shortDescription: "",
    keyFeatures: [],
    purchaseTermsSummary: "",
    mainImage: "",
    galleryImages: [],
    featured: true,
    displayOrder: 3,
    lastUpdated: "2026-09-04"
  },
  {
    id: "kannapolis-nc-1",
    status: "sold",
    city: "Kannapolis",
    state: "NC",
    priceDisplay: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    shortDescription: "",
    keyFeatures: [],
    purchaseTermsSummary: "",
    mainImage: "assets/photos/kannapolis/exterior.jpg",
    galleryImages: [],
    closedYear: "2023",
    featured: false,
    displayOrder: 1,
    lastUpdated: "2026-09-07"
  },
  {
    id: "york-sc-1",
    status: "sold",
    city: "York",
    state: "SC",
    priceDisplay: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    shortDescription: "",
    keyFeatures: [],
    purchaseTermsSummary: "",
    mainImage: "assets/photos/york/exterior.jpg",
    galleryImages: [],
    closedYear: "2025",
    featured: false,
    displayOrder: 2,
    lastUpdated: "2026-09-07"
  },
  {
    id: "lancaster-sc-2",
    status: "sold",
    city: "Lancaster",
    state: "SC",
    priceDisplay: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    shortDescription: "",
    keyFeatures: [],
    purchaseTermsSummary: "",
    mainImage: "assets/photos/lancaster/exterior.jpg",
    galleryImages: [],
    closedYear: "2025",
    featured: false,
    displayOrder: 3,
    lastUpdated: "2026-09-07"
  },
  {
    id: "greensboro-nc-1",
    status: "sold",
    city: "Greensboro",
    state: "NC",
    priceDisplay: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    shortDescription: "",
    keyFeatures: [],
    purchaseTermsSummary: "",
    mainImage: "assets/photos/greensboro/exterior.jpg",
    galleryImages: [],
    closedYear: "2024",
    featured: false,
    displayOrder: 4,
    lastUpdated: "2026-09-07"
  },
  {
    id: "spartanburg-sc-1",
    status: "sold",
    city: "Spartanburg",
    state: "SC",
    priceDisplay: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    shortDescription: "",
    keyFeatures: [],
    purchaseTermsSummary: "",
    mainImage: "assets/photos/spartanburg/exterior.jpg",
    galleryImages: [],
    closedYear: "2025",
    featured: false,
    displayOrder: 5,
    lastUpdated: "2026-09-07"
  }
];
