# Running Calorie Average Tracker

This is a statically generated SPA that allows users to note down their calories against days,
and then, if they've recorded enough calorie information, view rolling daily calorie averages for the day
they're looking at.

For example, if you had 1000 calories 3 days ago, 1000 calories 2 days ago, and 2000 calories today, the app
would inform you that your 3 day calorie average for today is 1333. This is useful for people that monitor
their calories and want a more flexible system than hyper-strict daily calorie requirements, for example
allowing such people to make up for a holiday with lots of calories with more aggressive fasting in the
days before or after.

Data is stored in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
Long term, I'd like a more persistent data storage method, allowing both for true-offline usage (such as
PWA), as well as eventually persistence against a database.

The app is developed by the software engineering co-op, [508.dev](https://508.dev). 508.dev LLC is a
software engineering co-op that functions as a design and development firm, a software consultancy,
and a software engineering agency.

If you don't want to use the 508 deployed version of this app, you are free to deploy the code on your own
in the manner of your choosing. It is licensed under AGPL3.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

This app is currently deployed on github pages. The repo is [mirrored to github](https://github.com/508-dev/running-calorie-average) for this purpose.

A special branch is created for the github pages deployment. Pushes to this branch occur automatically when you run `npm run deploy`.

To deploy, do the following:

```bash
npm run build
npm run deploy
```

Then, either way up to 8 hours for the codeberg repo to automatically mirror to the github repo, or manually trigger an update from codeberg [from within the codeberg repo settings](https://codeberg.org/508_dev/running-calorie-average/settings), if you have access.

# Design

![First draft design for the app](design.png 'This is just a first draft')

Test
