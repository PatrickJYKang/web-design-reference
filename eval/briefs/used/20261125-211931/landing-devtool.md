# Landing page for a developer tool

Tern is a command-line tool that runs database migrations safely on large Postgres tables. The audience is backend engineers at companies with a production database they are afraid to touch. The page should make them trust it enough to try it on staging.

## Content

Nav: Docs · Changelog · Pricing · GitHub · Sign in

Headline: Change a billion-row table on a Tuesday afternoon

Subhead: Tern rewrites risky migrations into small, reversible steps and runs them without locking your tables.

Primary action: Install Tern. Secondary action: Read the docs.

Install command: `brew install tern-db/tap/tern`

Three things it does:
- **Plans before it touches anything.** Tern reads your migration, finds the statements that would take a lock, and shows you the plan it will run instead.
- **Backfills in the background.** New columns are filled in batches sized to your replica lag, and pause on their own when the database is busy.
- **Rolls back in one command.** Every step keeps the old shape alive until you say it's done.

Example terminal output:

```
$ tern plan 0042_add_region_to_orders.sql
  orders  1.2B rows  ALTER TABLE … ADD COLUMN region text NOT NULL
  ! would hold ACCESS EXCLUSIVE for ~41 min
  rewritten as 4 steps, longest lock 80 ms
$ tern apply
  step 2/4  backfill  38%  replica lag 0.4s
```

Quote: "We had a migration sitting in a branch for seven months because nobody wanted to be the one to run it. Tern ran it during standup." — Ines Okonkwo, Staff Engineer, Parcelry

Closing line: Free for one database. $40 a month per database after that.

Footer: Docs · Changelog · Security · Status · Privacy · Terms
