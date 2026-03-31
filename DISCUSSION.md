# Future Enhancement Notes

(most of these notes exist within the files referenced but some have been added only here)

## Advanced Filters Component

**File:** [src/app/components/advanced_filters.tsx](src/app/components/advanced_filters.tsx#L19-L23)

- Create multi-select component
- Enable more complex/feature-rich filters (multi-select, searchable, range slider)

## Advocates Table Component

**File:** [src/app/components/advocates_table.tsx](src/app/components/advocates_table.tsx#L27-L34)

- Create separate, more generic table component
- Add generic sorting, filtering, text search
- Add optional pagination and virtualization for larger datasets
- Support more complex, custom & interactive table cells
  - e.g.: checkboxes, action buttons, pop-out windows, etc

## Homepage Content

**File:** [src/app/homepage_content.tsx](src/app/homepage_content.tsx#L38-L44)

- Allow users to select multiple advocates and create a pop-up card view to compare multiple advocates
- Break basic input and button components out into their own generic UI library components to apply consistent styling
- Add fuzzy search, autocomplete/type-ahead to search bar
- If not fuzzy, then just adding a more nuanced search algorithm than JSON.stringify

## Database Interactions

- Create a "db/models/" folder that contains files related to table definitions (like `schema.ts`) and utilities for interacting with them
- For instance, any table could have its own utility, abstracting out some of the boilerplate logic for different operations and queries, returning an object like `advocatesTable` with properties `select, update, insert, etc.`
- Within a more complex database set up, these abstractions can also handle more complicated updates and relationships, like foreign keys and cascading deletes, joins, etc.

## Scaling

- The app is built for cases where we only have a few thousand advocates. Once it grows beyond that, we'll start to run into performance issues with loading/filtering the data. Some potential updates:
  - Debounced search input: easy performance boost, just don't apply filters after every keystroke
  - Server-side filtering: we can move filtering into the API endpoint so that we aren't handling that in the browser, which also benefits users with older or non-updated machines/browsers, which I'd guess is a concern for a lot of your clients. (Curious how this affects you all, especially given that engineers are typically building and testing on more modern machines than most users)
  - Adding indices to the table: if we're getting really serious here about wanting quick searches in the database, we can start indexing on certain properties that are common search/filter criteria
- Specialties should eventually be broken out into their own table: the `specialties` table would have a many-to-many relationship with `advocates` and be connected by a join table with columns referencing both of their ids. Since this would all be primary key-based, these would be automatically indexed and provide quick look ups for advocates by specialty
- Another potential concern is user-generated content: if advocates are signing themselves up as service providers we'll have to handle input validation and standardization, for instance with varying phone number formats (or handling country codes if expanding internationally). This is usually best done when the information is submitted but typically there will be a need for some validation somewhere downstream as well.
- Analytics: adding in some usage tracking to get to know the users better -- which filters do they like, what are they drawn to on the page, etc.
- Error monitoring: implementing some basic logging and monitoring using Bugsnag or DataDog or equivalent service
- Load balancing, auto-scaling, & microservices: With a sufficient user base, we'd need to handle larger request loads, which can be handled by running multiple instances of the server with a load balancer to distribute traffic, taking advantage of auto-scaling features from cloud service providers, and/or by breaking out different operations into different specialized microservices that can be scaled independently according to need.

## Testing

- Unit tests: can be done using Jest or similar, the current filtering logic is a good candidate for this, as is any formatting or validation logic
- Integration tests: at this scale/simplicity there isn't too much to test in this way other than the fact that the frontend can communicate with the server and the server with the database. Good candidates for integration tests from the mentioned enhancements would be endpoints with more backend filtering logic or database models with more complex and coordinated query logic
- Frontend simulation testing: using a service like Cypress to simulate user pathways, set up automated usage testing to prevent feature regression and catch bugs before they get into production
- API performance testing: along the lines of the notes on scaling above, it's a good idea to see how much traffic your server can handle before it falls over
