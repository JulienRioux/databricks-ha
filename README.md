# Databricks Gihub repository list

You can find a deployed version of the app here:
https://databricks-4v6coyrj1-julienriouxs-projects.vercel.app/

## Getting Started

Add a Github basic auth token to your `.env.local` file:

````bash
NEXT_PUBLIC_GITHUB_ACCESS_TOKEN=MY_GITHUB_AUTH_TOKEN
```bash

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

## Project structure

The project contains 7 main folders:

- `/app`: Contains basic layout and is the entry point of the app.
- `/components`: Mostly contains block of components or components specific of the app.
- `/components-library`: Contains basics reusable UI components.
- `/config`: Contains app configurations (ex: API_URLS, ITEM_PER_PAGE, etc.)
- `/contex`t: Contains the state of the app using React context.
- `/lib`: Contains helpers functions.

## Testing metrics and results

| Metric      | Result              |
| ----------- | ------------------- |
| Test Suites | 17 passed, 17 total |
| Tests       | 55 passed, 55 total |
| Snapshots   | 0 total             |
| Time        | 2.774 s             |
| Total Time  | Done in 4.88s       |

### Happy reviewing!
