# Aadhi Cement Works --- Project Knowledge & Conversation Record

**Purpose:** Consolidated knowledge base for continuing the Aadhi Cement
Works app project while preserving business context, confirmed
requirements, decisions, examples, open questions, and related
conversation notes.

**Prepared:** 12 October 2026\
**Primary project:** Workforce Management first; Quotation Maker is also
in agreed Phase 1 scope.\
**Business location context:** Manjavayal, Tamil Nadu, India.

## Contents

1.  Executive summary
2.  Business profile
3.  Products and operations
4.  Compound-wall pricing method
5.  Workforce and wage practices
6.  App goals and scope
7.  Confirmed workforce requirements
8.  Production workflow and calculations
9.  Deployment workflow
10. Payments and outstanding balances
11. Technology and cost constraints
12. First working app base
13. Technical limitations and accuracy notes
14. Confirmed decisions
15. Open questions
16. Recommended development sequence
17. Marketing context
18. Other recent user projects
19. Quick reference

------------------------------------------------------------------------

## 1. Executive summary

Aadhi Cement Works is a small family business run by the user's father.
It manufactures precast concrete/RCC products and also performs on-site
installation and construction work. The user wants to replace paper
notebooks with a simple mobile-friendly app, primarily operated by the
father.

The strong preference is to keep costs at **₹0 wherever possible**: no
mandatory paid backend, hosted database, or custom domain. The app
should be local/offline-first, with backup and restore.

The user explicitly defined Phase 1 as: 1. **Quotation Maker** 2.
**Workforce Management**

The current implementation priority is **Workforce Management first**.

Confirmed workforce decisions: - Save worker names in a reusable list;
select existing workers and add new ones. - Two work types:
**Production** and **Deployment**. - Production supports both one
product per entry and multiple products in one entry. - Each product has
a fixed piece rate managed by the administrator in settings. - Selecting
a product displays its configured rate; quantity/count calculates the
line total and entry total. - Daily earnings automatically total all
saved entries for the same worker and date. - Earnings, actual payments,
and outstanding balance are separate values.

Business facts: - Current workforce is about **5 workers**. - Production
uses piece-rate pay. - Deployment is contract-based and connected to a
local compound installation unit described as "paanthu" / "2 kaal" with
plates between posts. The exact calculation is not yet defined. -
Workers can receive partial payments/advances. Example: earn ₹1,000,
receive ₹200, remain owed ₹800. - Workers may receive accommodation and
food. App discussion described **2 meals plus 1 snack**; a previous
recruitment poster requested **3 meals per day**. These are
context-specific descriptions and should not be silently treated as
identical.

## 2. Business profile

-   **Name:** Aadhi Cement Works.
-   **Location context:** Manjavayal, Tamil Nadu, India.
-   **Owner/operator context:** User's father runs the business.
-   **Nature:** Precast concrete/RCC product manufacturing plus site
    installation/construction.

The business is more than a cement or raw-material shop. It can procure
raw materials, manufacture products, transport them to customer sites,
excavate holes, place/fix posts or rings, install panels, and provide
labour and some installation materials. Charges may include transport,
labour, site work and materials needed to fix components securely.

Raw materials mentioned: - Cement - M-sand (manufactured sand) - "Jelly"
/ ஜல்லி: coarse stone aggregate - Steel rods/rebar in different sizes,
including small sizes - Water and other required materials

Basic production flow: obtain raw materials from wholesalers/vendors;
mix concrete with labour; use steel reinforcement where needed; pour
concrete into moulds; cure products; prepare them for delivery or
installation.

## 3. Products and operations

### 3.1 Ready-made RCC compound wall

Main product is a precast boundary/compound-wall system made from RCC
posts/poles and rectangular RCC plates/panels. Posts have grooves into
which plates are inserted/stacked. Different post lengths and panel
designs/sizes may be available. The business may sell components alone
or provide full installation.

### 3.2 RCC urai (உறை)

Cylindrical precast concrete/RCC rings used in underground structures
such as septic/soak pits, leach pits and similar applications. Multiple
rings can be stacked in an excavated hole. "Mudi" / மூடி refers to a
concrete/RCC cover slab. Exact dimensions and worker rates are not yet
supplied.

### 3.3 Other products

Other flat precast slabs/covers may also be made. The product catalogue
should be configurable rather than hard-coded to only the starter items.

## 4. Compound-wall pricing method

This is a key business rule.

The user's father normally quotes around **₹75--₹80 per square foot**.
The latest example uses **₹75**. The actual method is based on assigned
component lengths/units rather than a conventional measurement of
geometric wall face area. The business calls it a square-foot rate, but
it is more accurately a component-length-based billing unit system.

Assigned values: - One 10-ft post = 10 billable units - One 9-ft post =
9 billable units - One 8-ft post = 8 billable units - One 6-ft plate = 6
billable units

Formula:
`Total billable units = (10 × number of 10-ft posts) + (9 × number of 9-ft posts) + (8 × number of 8-ft posts) + (6 × number of 6-ft plates)`

`Quotation total = Total billable units × selling rate`

### Verified notebook example

  Component                    Quantity   Unit value    Subtotal
  -------------------------- ---------- ------------ -----------
  10-ft posts                        43           10         430
  9-ft posts                         84            9         756
  6-ft plates                       882            6       5,292
  **Total billable units**                             **6,478**

Calculation: 430 + 756 + 5,292 = 6,478. Then 6,478 × ₹75 =
**₹4,85,850**.

The user explicitly corrected a prior misunderstanding: the rate is
**₹75, not ₹7.50**, and the final amount is **₹4,85,850**.

Quotation module implications: - Preserve this formula; do not
substitute a standard wall-area formula. - Allow component quantities
and a selling rate (default ₹75) to be entered. - Save the exact
quantities, unit values and rate used in each quote. - Customer selling
price is not the same as worker production piece rate. - Planned quote
features: customer name, site/location, date/quote number, save/history,
edit/revise, PDF and WhatsApp sharing. The delivered first base
described later is workforce-only; the quote module is not yet included.

## 5. Workforce and wage practices

### Workforce size and type

About five workers. They are described generally as daily wagers, but
not all earnings are calculated as a simple daily wage.

### Production wages

Production uses **piece rates**: each product has a worker rate per
unit, and earnings depend on quantity made. Rates should be configured
centrally. The user has not supplied the real rates for posts, plates,
urai, mudi or other products. Do not treat illustrative rates from
earlier examples as actual rates.

### Deployment wages

Deployment/site installation uses a **contract/work-rate basis**. The
user described calculation by compound installation length or a local
unit "paanthu" / "2 kaal" with a plate between posts. Exact terminology
and arithmetic remain unclear. Site work may involve compound-wall
installation, transport, excavation, placing/fixing posts, installing
panels, and placing rings/urai in holes. Customer charges may separately
include transport, labour and materials. Do not invent an automated wage
formula until the rule is confirmed.

### Food and accommodation

Workers staying with the business may receive free accommodation and
food. The app discussion specified 2 meals and 1 snack per day; an
earlier recruitment poster said 3 meals free per day. If
food/accommodation costs are later included in the app, confirm the
current actual arrangement. The first base only stores simple yes/no
attributes; it does not calculate these costs.

## 6. App goals and scope

The father currently records worker wages/payments in physical
notebooks. The user is concerned notebooks can be lost or maintained
inconsistently. The app should make records easy to enter, search and
preserve.

Intended scale and constraints: - Primary operator: user's father. -
Internal/family business use, not a public SaaS. - Around five
workers. - User estimates lifetime data will likely stay below 1 GB. -
Aim for **₹0 recurring costs**. - Mobile convenience and offline use
matter.

Agreed Phase 1 scope: **Quotation Maker and Workforce Management**.
Immediate priority is workforce. Avoid prematurely expanding into full
inventory, accounting or ERP.

Potential later/out-of-scope areas unless requested: raw-material
inventory, full accounting/profit and loss, transport cost allocation,
food/accommodation costing, customer invoice/receipt management,
multi-user cloud sync, and automatic deployment wages before the rules
are known.

## 7. Confirmed workforce requirements

### Worker list

-   Add worker and save name.
-   Select a saved worker when creating a work entry.
-   Edit worker details.
-   Deactivate without deleting history.
-   Optional phone number.
-   Record whether worker stays at accommodation and whether food is
    provided.

### Work types

-   Production
-   Deployment

### Production entry

1.  Select worker.
2.  Select date.
3.  Choose Production.
4.  Select one or more products.
5.  Enter count/quantity for each product.
6.  Display fixed rate from settings.
7.  Calculate each line total.
8.  Display total at the bottom.
9.  Save.

### Rates

The user chose option **B**: each product has a fixed rate, changed only
by the administrator in settings. The ordinary production entry form
should not permit casual per-entry rate changes. Real rates remain
unknown and must be entered by the user.

### Daily totals

The user answered **Yes** to automatic daily totals. Sum all saved
entries for the same worker/date. Keep Production and Deployment
identifiable as separate categories, while also showing an overall daily
total.

### Work history

Useful fields: date, worker, work type, production products/quantities,
deployment site/description, earned amount, notes. Filtering by worker,
date and type is useful and included in the starter base.

### Payments/balance

Keep total earned, total paid and outstanding separate. Basic current
formula is `Outstanding = Total earned − Total payments`. If migrating
from notebooks, opening balances may be needed; this is not in the first
base yet.

## 8. Production workflow and calculations

### Illustrative example only --- not actual rates

  Product        Example rate   Quantity   Example earnings
  ------------ -------------- ---------- ------------------
  6-ft plate              ₹15         20               ₹300
  9-ft post               ₹40          5               ₹200
  10-ft post              ₹50          3               ₹150
  **Total**                                        **₹650**

These figures were only used to explain the UI and are **not confirmed
business piece rates**.

`Line earnings = Quantity × Configured fixed piece rate`

`Production entry total = Sum of all product line earnings`

`Worker daily earnings = Sum of all saved work entry totals for that worker on that date`

Starter product list in the app: - 10-ft post - 9-ft post - 8-ft post -
6-ft plate - RCC urai - RCC mudi (cover)

Rates initialize at ₹0 so the app does not make up values. Before real
production is recorded, enter the actual rates in Product Rates. If
products have different rates by size/design, create distinct products
or variants.

Each saved production line should preserve product ID/name, quantity,
rate used and calculated amount, so later settings changes do not
rewrite historical earnings. The starter base stores these line details.

## 9. Deployment workflow

Known: deployment is a distinct work type; it is contract-based; may
include compound wall installation and other precast site work;
measurement may use "paanthu" / "2 kaal" terminology. The exact
definition and arithmetic are not finalized.

The starter base has fields for worker, date, customer/site, work
description, optional quantity/measurement, total earning amount and
optional note. The operator enters the agreed amount manually.

Before automation, use actual notebook examples to clarify: - What
exactly is one "paanthu" or "2 kaal"? - Is it per span, pair of posts,
or another unit? - Does rate vary by wall height, post size, difficulty
or product? - Is the rate paid to one worker or divided across a
group? - Are transport, excavation, installation materials and labour
separate? - How are amounts divided when multiple workers do one job? -
Are partial completions allowed, and how are they valued?

Until clarified, manual entry is intentional and safer than guessing.

## 10. Payments and outstanding balances

Example: a worker earns ₹1,000 and receives ₹200. Earnings = ₹1,000;
paid = ₹200; outstanding = ₹800. If the worker later receives another
₹300 and no new work was done, total earned remains ₹1,000, total paid
becomes ₹500, and outstanding becomes ₹500. A payment is not new
earnings.

Suggested future ledger: - Opening balance (if migrating from
notebooks) - Work/earning entries - Payment entries - Total earnings -
Total payments - Current outstanding

With opening balance:
`Outstanding = Opening balance + Earnings − Payments`. The starter base
currently calculates only earnings minus payments.

If payments exceed recorded earnings, the current base can show a
negative balance. A future version should represent this clearly as an
advance/amount paid ahead, rather than an unexplained negative amount
owed. The user has described partial payments and advances. Current
payment notes are free text; payment categories such as wage payment,
advance, settlement or other have not been finalized.

The base permits deletion of entries/payments after confirmation, but
has no full audit log. A future version should consider editing, audit
history, undo and stronger safeguards.

## 11. Technology and cost constraints

The user wants no paid backend hosting, database, or domain; small data;
local/offline operation; convenient phone use; and one primary operator.

Architecture discussed: - Mobile-first web app/PWA. - Local device
storage. - Offline use after the app shell is available locally. - JSON
backup and restore. - PDF generation and WhatsApp sharing as later
useful features. - No cloud database for the first single-user version.

Local-only data avoids backend costs but does not sync between devices.
Risks include device loss/damage, browser data being cleared, switching
browsers/profiles, and stale backups. Regular backup is essential.

**Important technical distinction:** The original architecture
discussion mentioned IndexedDB as a suitable local database, but the
actual first working HTML base uses **`localStorage`**, not IndexedDB.
`localStorage` is simple for a prototype; IndexedDB may be a better
foundation for a more robust structured offline app later. Do not
describe the delivered base as already using IndexedDB.

PWA details: the ZIP includes `index.html`, `manifest.webmanifest`,
`service-worker.js`, and `README.txt`. Opening `index.html` directly
lets the user test the app, but service workers generally require HTTPS
or localhost. Opening via a `file://` path does not enable full PWA
installation. A zero-cost installation/serving method still needs to be
chosen.

Earlier hosting discussion considered GitHub Pages and Firebase Spark.
GitHub Pages should not automatically be assumed suitable as the
foundation for a business app given its restrictions. Firebase's no-cost
tier may be enough for tiny data, but introduces cloud/backend
complexity and is not needed for a single-user local-first start. No
hosting provider has been configured.

## 12. First working app base

A starter implementation was created and delivered on 12 October 2026.

Files delivered: - `aadhi_workforce_base.zip` - `index.html` -
`manifest.webmanifest` - `service-worker.js` - `README.txt`

Navigation areas: 1. Overview 2. Add work 3. Workers 4. Work history 5.
Product rates 6. Backup

### Overview

Shows active worker count, today's earnings, overall calculated
outstanding balance, today's work summary and a short worker list.

### Workers

Add/edit workers, optional phone, stay/food flags, activate/deactivate,
and view total earned, paid and balance. Deactivation preserves
historical records and removes the worker from active selection lists.

### Add work

Worker and date selection; Production/Deployment toggle; multiple
production product lines; configured rates; quantity; automatic
line/overall production totals; deployment site/description/optional
measurement/manual earning; notes; save.

### Product rates

Starter products are 10-ft post, 9-ft post, 8-ft post, 6-ft plate, RCC
urai and RCC mudi (cover). All start at ₹0. The operator can update
rates, add products and remove products.

### Work history

Filter by worker, type and date; see work and payment records. Delete
controls use confirmation prompts.

### Payments

Record worker, date, amount and optional note. Saving a payment updates
the calculated balance.

### Backup

Export JSON and restore JSON. Restore warns that current browser data
will be replaced. Backup includes workers, products, entries and
payments.

Implementation details: - Data is stored in browser `localStorage` under
key `aadhi-workforce-v1`. - No backend or online database is
connected. - No actual product rates have been configured. - Deployment
amount is manual. - Quotation Maker is not yet part of this delivered
workforce base. - It is a starter prototype, not yet a fully audited
production accounting system.

## 13. Technical limitations and accuracy notes

1.  **Local data:** Browser-local; export backups regularly and test
    restore before entering many real records.
2.  **PWA installation:** The included files do not make service-worker
    installation work just by opening a local HTML file. HTTPS or
    localhost is required.
3.  **No login:** Anyone with access to the same browser profile may
    view/change records.
4.  **Rate history:** Each saved production line should retain the rate
    used; test that later settings changes do not alter past earnings.
5.  **Derived values:** Daily earnings and balances are computed from
    saved entries/payments; no opening balance yet.
6.  **Deletion:** Entry/payment deletion changes totals. Edit/audit/undo
    may be needed for business reliability.
7.  **Negative balance:** Payments can exceed earnings; future version
    should handle advances explicitly.
8.  **No sync:** Computer and phone records do not automatically sync.
    Export/restore is the only included transfer path.
9.  **Deployment:** No automated formula yet by design.
10. **Quotation:** Pricing rule is documented here but not yet
    implemented in the delivered workforce base.

## 14. Confirmed decisions

  Topic                      Decision
  -------------------------- ------------------------------------------------------
  Phase 1 scope              Quotation Maker and Workforce Management
  Immediate priority         Workforce Management first
  Main operator              User's father
  Workforce size             About 5 workers currently
  Cost target                ₹0 recurring cost wherever possible
  Internet                   Local/offline-first after initial setup
  Worker list                Saved, selectable, addable
  Work types                 Production and Deployment
  Production entries         Both single- and multi-product entries
  Product rates              Fixed per product, administrator changes in settings
  Production totals          Rate × count, line total and overall total
  Daily earnings             Automatically total entries for worker/date
  Payments                   Separate from earnings
  Balance                    Show outstanding after payments
  Deployment formula         Manual amount until actual rule is clarified
  Backup                     JSON export/restore
  Actual prototype storage   `localStorage`, not IndexedDB

The user answered the three setup questions: **1 C, 2 B, 3 Yes**.

## 15. Open questions

### Actual worker piece rates

Need rates per unit for 10-ft post, 9-ft post, 8-ft post, 6-ft plate,
RCC urai (possibly by size), RCC mudi/cover (possibly by size), and
other products. Rates shown in explanatory examples are not real rates.

### Product catalogue

Confirm all products, sizes, local names/spellings, and whether
different sizes/designs have different rates.

### Deployment rules

Clarify "paanthu" / "2 kaal" with real notebook examples and how total
contract amounts are divided among workers.

### Opening balances

When switching from notebooks, confirm whether workers have existing
balances owed or advances already received. A field will likely be
needed.

### Payment categories

Decide whether to label payments as wage, advance, settlement/final
payment or other.

### Corrections

Decide whether old entries can be edited, and whether a simple audit
log/undo is needed.

### Backup

Choose a regular safe destination for the downloaded JSON file. Current
backup is manual; it does not automatically upload to Drive/cloud.

### Installation

Choose a practical zero-cost way to serve/install the PWA once, so it
can reopen offline on the father's phone.

## 16. Recommended development sequence

1.  Test the current base with test workers, test rates, single/multiple
    production products, deployment manual amount, payment and balance.
    Export a backup and test restoring it.
2.  Enter actual worker piece rates. Keep unknown rates at zero until
    confirmed.
3.  Improve ledger reliability: opening balances, explicit advances,
    editing records, safer deletion/audit history, worker statement with
    date-by-date earnings/payments/balance.
4.  Document deployment formula with real examples before automating it.
5.  Improve offline storage/installation: consider IndexedDB migration,
    test PWA cache/offline reopening, and test backups on the actual
    phone/browser.
6.  Build Quotation Maker with the known compound-wall formula, quote
    history and save first; then PDF and WhatsApp sharing.
7.  Keep original notebooks until the app has been tested and verified
    in real use; back up regularly.

## 17. Other Aadhi Cement Works marketing context

### Address used on poster

`ECR ரோடு, முருகன் கோவில் தெற்குவீதி, மஞ்சவயல்`

### Earlier recruitment poster request

The user wanted a Tamil-only poster with: - "Petchi Amman Thunai" -
"Muthugan Thunai" (user's approximate transliteration) - "Concrete
Velaiku aatkal thevai" --- workers needed for concrete work -
₹1,000--₹2,000 per day depending on qualification - Accommodation and
three meals free for that poster - Ready-made compound-wall work - The
address above - A ready-made compound-wall image instead of a generic
concrete photo - Contact details taken from a reference image supplied
in that conversation

### Retail materials poster

The user also wanted a business flex/poster highlighting retail
availability of jelly/ஜல்லி, M-sand and cement. Intended wording was
approximately "சில்லறை விலையில் ஜல்லி, M-sand, சிமெண்ட் கிடைக்கும்" (available
at retail prices). Confirm exact Tamil wording/spelling before final
artwork.

These marketing details are context only unless the user asks to use
them in the app or create another poster.

## 18. Other recent user projects mentioned in conversations

These are separate topics and should not be mixed into the app
requirements unless explicitly connected by the user.

### 18.1 Mahindra Bolero Maxitruck Plus gearbox issue

The vehicle became stuck in mud. The driver repeatedly shifted between
first gear and reverse to rock/pull it out. Afterwards, reverse caused
loud noise and the vehicle would not move backward; forward gears 1--3
made some noise.

Mechanic's quote as transcribed by the user:

  -----------------------------------------------------------------------
  Part as described                                                 Quote
  ------------------------------ ----------------------------------------
  Counter gear                                                     ₹7,000

  "Revacer" / reverse gear                                         ₹1,500

  "Singer nexus cone" (possibly                                    ₹5,000
  synchronizer cone; verify      
  exact part name)               

  Bearing                                                          ₹4,000

  Gearbox backing kit                                              ₹1,000

  Oil seal                                                           ₹400

  **Total quoted**                                            **₹18,900**
  -----------------------------------------------------------------------

### 18.2 Home portico stainless-steel cover/gate

The user wanted a modern premium-looking stainless-steel cover/gate to
block direct sunlight and reduce animals/dogs entering.
Preferences/constraints: - Cover the whole front; left half/open area
needs covering while existing granite pillar remains. - Modern
decorative bar-grill look, not jail-like. - Premium, minimalist and
cost-optimized. - Rounded elements. - Left lower back fully covered. -
Right-side vertical flower design with maximum covering. - Small SS
decorative beads/sections on vertical rods. - Clean horizontal
framing. - Do not assume dimensions/details not visible in supplied
photos.

### 18.3 Family hill-station trip

User considered a one-night/two-day nearby hill-station family trip from
Manjavayal, budget around ₹15,000, travelling by public transport to the
destination and cab locally. Group: user, father, mother and younger
sister. Considered a TWS Holidays Kodaikanal 2-day/1-night package with
pickup at Dindigul Junction. Possible stops mentioned: Chettiyar Park,
Upper Lake View Point, Coaker's Walk, Bryant Park, boating/lake
activities, Mahalakshmi temple, Palani Hill View, Poomparai village
view, and Kulandhaivelappar Temple. The user noticed sightseeing might
be modified and that two days could be selected.

### 18.4 Office chair shopping

User asked to compare Amazon India and Flipkart office chairs similar to
an uploaded image: - Budget up to ₹3,000. - Daily sitting 4--6 hours. -
Main priority: best deal. - Wanted current offers, ratings/review
counts, specifications, warranty, recurring negative reviews and direct
product links.

## 19. Quick reference: facts that must not be lost

### Business and products

-   Aadhi Cement Works; Manjavayal, Tamil Nadu.
-   Precast RCC/concrete manufacturing plus installation/site work.
-   Main products: compound-wall posts/plates, RCC urai rings, RCC
    mudi/cover slabs.
-   Materials: cement, M-sand, jelly/coarse aggregate, steel rods/rebar.

### Quotation pricing

-   Latest example rate: **₹75**.
-   Unit values: 10-ft post = 10; 9-ft post = 9; 8-ft post = 8; 6-ft
    plate = 6.
-   Example quantities: 43 ten-foot posts, 84 nine-foot posts, 882
    six-foot plates.
-   Total units: **6,478**.
-   Total price: **₹4,85,850**.
-   Component-length-based unit system, although business calls it per
    sq.ft.
-   Customer selling price differs from worker production rate.

### Workforce

-   About five workers.
-   Production is piece-rate.
-   Deployment is contract-based but not fully defined.
-   Earnings and payments must be separate.
-   Example: earned ₹1,000, paid ₹200, outstanding ₹800.
-   Some workers receive food/accommodation.
-   Names must be saved and selectable.

### Confirmed production choices

-   Single and multiple product lines in one entry.
-   Fixed rates managed in settings by administrator.
-   Automatically total daily earnings per worker.
-   Actual worker rates not yet provided; prototype starts rates at ₹0.

### Technology

-   Zero recurring cost is a strong preference.
-   Local/offline-first.
-   Prototype uses `localStorage`, not IndexedDB.
-   JSON backup/restore included.
-   Full PWA service-worker installation requires HTTPS or localhost;
    opening a local HTML file alone is not enough.
-   No cloud sync configured.

### Delivered first base

-   `aadhi_workforce_base.zip`, containing `index.html`,
    `manifest.webmanifest`, `service-worker.js`, `README.txt`.
-   Includes worker management, production/deployment forms,
    product-rate settings, history, payments, balances and JSON
    backup/restore.
-   Quotation module and automated deployment formula are not yet
    implemented.

------------------------------------------------------------------------

**End of document.** This knowledge base combines user-provided details,
confirmed decisions, explanatory examples and implementation notes.
Example figures are not confirmed business rates. Unknown rates and
deployment rules must be confirmed, not guessed.
