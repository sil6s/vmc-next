# VMC Veterinary Medical Center – WordPress Theme

A fully custom WordPress theme for Veterinary Medical Center (Fort Thomas & Independence, KY). Built around the VMC brand identity: cream/warm palette, Playfair Display + Instrument Sans typography, Fear-Free Certified positioning, and a mobile-first responsive layout.

---

## Installation

1. Upload the `vmc-theme` folder to `/wp-content/themes/`
2. In WordPress Admin → **Appearance → Themes**, activate **VMC Veterinary Medical Center**
3. Go to **Appearance → Customize** to configure all editable content (see below)
4. Set your **Front page** under **Settings → Reading → A static page** → assign any blank page as the front page
5. Create navigation menus under **Appearance → Menus** and assign to **Primary Navigation** and **Footer Navigation** locations

---

## Customizer Settings

All located under **Appearance → Customize → VMC Site Settings**:

### Contact & Locations
| Setting | Description |
|---|---|
| Fort Thomas Address | Street address shown in booking & footer |
| Fort Thomas Phone | Display format e.g. `(859) 442-4420` |
| Fort Thomas Phone (tel link) | Digits only e.g. `8594424420` |
| Independence Address | Street address |
| Independence Phone | Display format |
| Independence Phone (tel link) | Digits only |
| Patient Portal URL | Link to PetDesk or your portal |
| Google Maps Embed URL | Paste your embed src URL |

### Hours
Separate weekday / Saturday / Sunday fields for each location.

### Homepage Hero
| Setting | Description |
|---|---|
| Eyebrow Text | Small text above headline |
| Headline | Main H1 — last line becomes italic red |
| Subtext | Paragraph below headline |
| Button 1 Label | Calls the Fort Thomas number |
| Button 2 Label / URL | Second CTA link |
| Stat 1–3 Number/Label | The three statistics below buttons |
| **Hero Image** | Upload via media picker — replaces the right-side panel |

### Why VMC Section
Headline, intro paragraph, and all 4 card titles + descriptions are editable.

### Quote Banner
Quote text, attribution, and optional background image upload.

### Newsletter Bar
The description text shown next to the email signup.

### Footer
Tagline line and legal/certification text.

---

## WordPress Admin – Custom Post Types

### Services (`vmc_service`)
- **Admin → Services → Add New**
- Set Title = service name, write content in the editor
- In the sidebar, set **Icon Slug** (options: `wellness`, `dental`, `surgery`, `behavioral`, `urgent`, `feline`) and **Display Order**
- Add a Featured Image for the service detail page

### Team Members (`vmc_team`)
- **Admin → Team → Add New**
- Title = person's name, content = bio paragraphs
- Sidebar: **Role/Title**, **Credentials** (one per line), check **Featured doctor** for the large profile section
- Add a **Featured Image** (recommended 700×875px portrait)

### Reviews (`vmc_review`)
- **Admin → Reviews → Add New**
- Title = anything for reference, content = the review text
- Sidebar: **Author Name**, **Location**, **Rating (1–5)**, **Initials**

### FAQs (`vmc_faq`)
- **Admin → FAQs → Add New**
- Title = the question, content = the answer
- Drag to reorder via **Quick Edit → Menu Order**

### Appointments (`vmc_appointment`)
- Private CPT — auto-created when the booking form is submitted
- View submissions under **Admin → Appointments**
- An email notification is sent to the site admin email on each submission

---

## Navigation Menus

Create menus under **Appearance → Menus** and assign to:
- **Primary Navigation** — shown in the top nav bar (desktop)
- **Footer Navigation** — shown in the footer left column

If no menus are assigned, fallback links pointing to homepage sections (`#why`, `#services`, etc.) are used automatically.

---

## Replacing the Hero Image

1. **Appearance → Customize → VMC Site Settings → Homepage Hero → Hero Image**
2. Click **Select Image** → upload or choose from media library
3. Click **Publish**

Or via the Media Library: upload a 1600×900px image and assign it.

---

## Replacing the Quote Banner Background

1. **Appearance → Customize → VMC Site Settings → Quote Banner → Background Image**
2. Upload any full-width photo

---

## Theme File Structure

```
vmc-theme/
├── style.css                    Theme header
├── functions.php                Setup, enqueues, Customizer, CPTs, AJAX
├── header.php                   Nav + mobile drawer
├── footer.php                   Newsletter bar + footer + call floater
├── front-page.php               Homepage template
├── page.php                     Generic page
├── single.php                   Single post/service/team member
├── archive.php                  Services/team archives
├── index.php                    Blog index fallback
├── 404.php                      404 page
├── search.php                   Search results
├── screenshot.php               Theme thumbnail
├── inc/
│   └── nav-walkers.php          Desktop + mobile nav walker classes
├── template-parts/
│   ├── section-why.php          Why VMC cards
│   ├── section-services.php     Services grid (CPT or fallback)
│   ├── section-quote.php        Quote photo break
│   ├── section-team.php         Doctor profile + staff grid
│   ├── section-new-patients.php New patient steps + checklist
│   ├── section-pets.php         Pets we see chips
│   ├── section-reviews.php      Review grid (CPT or fallback)
│   ├── section-faq.php          FAQ accordion (CPT or fallback)
│   ├── section-booking.php      Appointment request form
│   └── section-locations.php    Hours + Google Maps embed
└── assets/
    ├── css/
    │   ├── main.css             All front-end styles
    │   └── editor.css           Gutenberg editor styles
    ├── js/
    │   └── main.js              Nav, mobile menu, counters, AJAX forms, paw trail
    └── images/
        └── (place images here)
```

---

## Customizing Colors

Edit the CSS variables at the top of `assets/css/main.css`:

```css
:root {
  --red:   #A91B1B;   /* Primary brand red */
  --rdark: #7A0E0E;   /* Hover state red */
  --dark:  #131010;   /* Near-black text */
  --mid:   #5A5050;   /* Body text */
  --cream: #F7F3EC;   /* Light section bg */
  --warm:  #EDE5D8;   /* Warm section bg */
  --gold:  #B87D3A;   /* Accent / labels */
  --white: #FFFFFF;
}
```

---

## Requirements

- WordPress 6.0+
- PHP 8.0+
- Permalinks set to anything other than Plain (**Settings → Permalinks**)

---

## Production Checklist

- [ ] Replace `screenshot.php` with a real `screenshot.png` (1200×900)
- [ ] Upload hero image via Customizer
- [ ] Update all phone numbers, addresses, hours
- [ ] Update Google Maps embed URL
- [ ] Update Patient Portal URL
- [ ] Create Primary and Footer navigation menus
- [ ] Add Services, Team Members, Reviews, FAQs via WP Admin
- [ ] Set Reading settings → Front page to a static page
- [ ] Install an SEO plugin (Yoast or RankMath)
- [ ] Enable caching plugin for production
- [ ] Connect newsletter to Mailchimp or similar in `functions.php → vmc_newsletter_signup()`
