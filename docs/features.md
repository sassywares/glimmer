# Features

- i18n 🌐 with Next-Intl
- Tailwind 💅 w/Shadcn UI
- DDD 🍱 (Domain-Driven Design)
- Bombshell 💣 ESLint + Prettier Configuration
- Fire 🔥 Data Fetching Utils (Axios + React Query + RSC)
- Dope 😎 Everyday Hooks (useMediaQuery, useLocalStorage, etc.)

## i18n 🌐 with Next-Intl

✨ Glimmer comes sass-packed with i18n support using Next.js' app router and [Next-Intl](https://next-intl-docs.vercel.app/).

Even if you don't have multiple languages to support, Next-Intl offers a great way to manage strings, and it's always better to not litter your code with strings.

To begin, go to `app/config.ts` and update the `locales` constant with your locales. Keep `en` if you don't need multiple languages. Then, go to the root folder and remove/add your locales to the `messages` directory.

To confirm if things are working, run `pnpm build` once.

You can read more in the [Best Practices](./best-practices#i18n).

## Tailwind 💅 w/Shadcn UI

Tailwind can't be used in production, across multiple files, across multiple components, reliably. I mean, it can be, but you'll end up with arbitrary values across multiple files which is neither fun nor consistent. And don't even think of refactoring that `p-3` from all the cards across all the files without messing something else up.

The best use case of Tailwind is to build a design system. That's what Shadcn does. It's not exactly a design system, but it does what I'm doing with ✨ Glimmer, providing you with all you need to go lightspeed.

## DDD 🍱 (Domain-Driven Design)

I've had my fair share of folder structures, architectures, and design systems in my five years of using React, and I've had enough. Very recently, I tried splitting my modules by domain, and I've fallen in love. This is the one, this is who I'd been searching for. (Albeit, I made 15 PRs to the template I built with DDD because there's always some room for improvement.) It's the most scalable, maintainable, and reusable way of building React/Next apps.

You can read more in the [Best Practices](./best-practices#folder-structure).

## Bombshell 💣 ESLint + Prettier Configuration

Did you notice that the features listed at the top are sorted by line length? That's how I like my code as well: sorted, neat, and consistent.

As soon as you start working, you'll notice a slurry of errors coming your way. That will hurt, but over time you'll get used to it while your code becomes super-consistent, organized, and neat.

The ESLint config uses the plugins from [Perfectionist](https://eslint-plugin-perfectionist.azat.io/). Coincidentally, I've also been called a perfectionist many times by my colleagues. I guess it's about time I embrace that and start producing near-perfect code.

You can read more in the [Best Practices](./best-practices#naming-conventions).

## Fire 🔥 Data Fetching Utils (Axios + React Query + RSC)

You can fetch data in a ton of different ways in modern-day Next.js. How you do it will be highly dependent on the nature of your app, your architecture, your deployment strategy, and your preferences.

But the idea behind ✨ Glimmer is to provide you with more than what you need so that you can simply use whatever you want without having to worry about anything.

You can read more in the [Best Practices](./best-practices#data-fetching).

## Dope 😎 Everyday Hooks (useMediaQuery, useLocalStorage, etc.)

I've religiously used [useHooks](https://usehooks.com/) as my go-to hooks library for pretty much all my past projects, but it's about time I addressed the fact that having control over your libraries is more important than your libraries being fully sass-packed.

useHooks has everything, has more than what you need, but your use case will either suit one of their hooks or not. You will end up creating custom hooks whenever you want even a slight bit of control.

The solution? I've added (with credits) many hooks to the `shared` module. Most of them are either inspired by or straight-up copied from useHooks, but the catch is that you can now modify each hook to suit your needs.

That wraps up the features of the MVP. Stay tuned as I'll be adding way more goodies (ORM, Auth, Database, Containerization, etc.) to the kit.

You can read more in the [Best Practices](./best-practices#utils).

---

That wraps up the features for ✨ Glimmer (so far), there is a lot more coming, please stay tuned and stay sassy!
