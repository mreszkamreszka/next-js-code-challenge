# PokeApp - Web Code Challenge

<!-- ## Techstack

- Next.js
- TailwindCSS
- TypeScript
- Shadcn/UI
- React Query -->

## Fork and Clone the repository

Before you get started on this we would like you to fork this repo and name it as following:
`code_challenge_next.{firstname}.{lastname}`
This will be the repository you will be working in and where you will be able to create Pull Requests in as well.
You will create a PR per functionality/user story. It can be possible that a user story is to big to place in a single PR, if this happens, you can 'split' the work in 2 different PRs (for example: one for the functionality and one for UI).
The guideline of a PR is a maximum of about 20-30 files, if it gets bigger than this, it should be split in multiple PR's.

## Get the app up and running

To get this app started, always run the following commands:

Install the packages:

```bash
npm ci
```

Start the application:

```bash
npm run dev
```

This will get the app started and running on port `3000`

## The Design

There is a design that is created in Figma, Figma also is the tool that we use for all the designs within Triple.
This way you will get to know how to work with Figma and to recreate the design in the web application.
https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pokemon-Code-Challenge

## The API

The app is build on the PokeAPI, all documentation of this API can be found on the following url:
https://pokeapi.co/

## Tailwind

We use Tailwind CSS v4 for styling the app. The theme configuration uses the CSS-first approach with the `@theme` directive in `src/ui/styles/global.css`. The `tailwind.config.js` file is used for content paths.
You can find documentation on the following url: https://tailwindcss.com/docs/configuration

## The challenges

To get you started, a small base has already been setup in Next, the first API calls are already implemented and from here on you should be able to continue by taking on each challenge step by step.
The most important thing to know is that you can always ask questions to your mentor. This is why they are here, and why they are seated near you. They are already familiar with the challenge and therefore will be able to help you where needed.
Next to that you'll need to know that there is no deadline for this, you can work on the challenges and get to know Next on your own tempo. As you can see the user stories are setup with MoSCoW, so not all challenges **must** be done.

With each PR you can 'check' the user story that is related to it, so you have a clear overview of what still needs to be done.

- [ ] The user must be able to see all of the following stories on either PC, Tablet of Mobile (Responsive)
- [ ] The user must be able to see a list of Pokemon in the styled overview
- [ ] The user must be able to see the sidebar and its content
- [ ] The user must be able to click on a Pokemon to navigate to a detail page of a single Pokemon
- [ ] The user must be able to see all the stats of a Pokemon in three tabs
- [ ] The user must be able to check/uncheck a Pokemon as favorite
- [ ] The user must be able to see an overview of all their favorite Pokemon on a different page/route
- [ ] The user should see a 'not found' page when the route is not identified
- [ ] The user should be able to search through all the Pokemon
- [ ] The user must be able to navigate the site with a keyboard
- [ ] Semantically correct HTML should be used to help with accessibility
- [ ] Aria attributes are added on interactive elements to provide screen readers a correct state

Extra's

- [ ] The user could be able to switch to dark mode in the sidebar (you can decide on the color palette)
- [ ] The user could be treated with nice animations throughout the app (for example: when a Pokemon is caught)
- [ ] The user could see a nice loading state when the app is loading (for example a loading spinner)
- [ ] The user could switch between languages (Dutch, English and Polish)

Super Extra

- [ ] The user can make Pokemon battle with each other
