# PowerSync + Supabase Next.js Demo: Nomad Notes

## Overview

This app uses PowerSync to make it possible for travellers to save photos and notes of their journeys while offline, and then sync and share them with friends.

## Getting Started

In your terminal, switch into the demo's directory.

Next, set up the Environment variables: Copy the `.env.local.template` file:

```bash
cp .env.local.template .env.local
```

And then edit `.env.local` to insert your credentials for Supabase.

Run the development server:

```bash
pnpm watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Progressive Web App (PWA)

This demo is PWA compatible. PWA is not available in development (watch) mode.

Build the production codebase

```bash
pnpm build
```

Run the production server

```bash
pnpm start
```

Open a browser on the served URL and install the PWA.

## Sync rules used

```

bucket_definitions:
  shared_journal_entries:
    parameters:
      - select owner_id as sharing_owner_id from user_shares where user_id = token_parameters.user_id
    data:
      - select id, created_at, owner_id, note, photo, location, rating from journal_entries where owner_id = bucket.sharing_owner_id
  owner_journal_entries:
    parameters: select token_parameters.user_id as user_id
    data:
      - select * from journal_entries where owner_id = bucket.user_id
  all_user_profiles:
    data:
      - select id, name, photo, owner_id from user_profiles
  user_shares_from_me:
    parameters: select token_parameters.user_id as user_id
    data:
      - select * from user_shares where owner_id = bucket.user_id
  user_shares_to_me:
    parameters: select token_parameters.user_id as user_id
    data:
      - select * from user_shares where user_id = bucket.user_id
```

