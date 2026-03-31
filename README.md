## Solace Candidate Assignment

Hey y'all 👋
I wanted to leave some context on the set up here.

The commit history is unfortunately nonexistent because I've been running into some issues using my old personal github account rather than the separate work account I've been using for the last few years. I spent some time troubleshooting but didn't want to delay submitting the assignment so I ended up just doing a straightforward file upload instead. So, reproducing the commit history via `git log` here:
```
920b5c4 discussion.md
6519dc2 bug fixes
80c990c misc
acbf10e add frontend seeding/refetch code, make table scrollable
32428d5 set up postgres db, enhance seeding code
e349799 some comments
8797e94 run next.js critical vulnerability patch update
0d29993 two hour mark
107d46d initial frontend refactor and set up
```

#### To elaborate on the commit descriptions:
`107d46d initial frontend refactor and set up`
- Went through and got the app up and running, refactored some of the code, and fixed any immediately obvious bugs

`0d29993 two hour mark`
- Note: I took the time limit pretty literally as I worked on this task -- this is why this chunk of work didn't include meaningful backend changes. I realized that I had a buggy 6 year-old Postgres set up on my machine (I use MySQL in my current work) and would have to go through a whole upgrade/reinstallation process so I instead I got the API fetch for seed data working and focused the initial core of my work on updating the frontend. Backend updates were done as quick follow-ups (below).
- Created AdvancedFilters component and filtering logic, add to HomepageContent (filtering by specific table fields)
- Created generic Selector component
- Added styling to the app as a whole (via Tailwind) based on my impression of Solace's branding from [solace.health](https://www.solace.health/)
  - Used Claude Code here to autopopulate base Tailwind styles to get started, then QA-ed and updated colors/spacing/etc myself
- Added custom table cells for headers and for the specialty field
- Set up a `useAdvocates` hook using `react-query` for data fetching

`8797e94 run next.js critical vulnerability patch update`
- Bumped next.js to a more recent minor version at this point due to [this security warning](https://nextjs.org/blog/security-update-2025-12-11)

`32428d5 set up postgres db, enhance seeding code`
- After fixing my local postgres set up, I got back to work and set up the backend, seeding the database using a random data generator and setting it up so I could continually reseed to test performance with larger amounts of data

`acbf10e add frontend seeding/refetch code, make table scrollable` + `80c990c misc`
- Set up a small frontend form for adding a custom number of new seed records
- Set up automatic data fetching and reload on update functionality using `react-query`
- Made table scrollable to support larger data loads in the UI

`6519dc2 bug fixes`
- Fixed a couple bugs in filtering code

And finally, I wrote down thoughts on future enhancements/technical considerations to the app in DISCUSSION.md.

Thanks for reading!

Best,
Colin Alexander

------
# original readme:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```
