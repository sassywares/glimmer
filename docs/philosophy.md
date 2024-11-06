# Philosophy

The idea behind ✨ Glimmer is to give you more than what you need, so that you never run out of options and you never need to waste time setting things up.

With that being said, a healthy, production-ready app is always consistent in its architecture and highly opinionated in its design, following are the best practices that ensure a robust DX and Development workflow:

## i18n

Always keep your strings outside your codebase, always. Even if you don't have multiple languages to support, it's always better to not litter your code with strings.

To begin, go to `app/config.ts` and update the `locales` constant with your locales. Keep `en` if you don't need multiple languages. Then, go to the root folder and remove/add your locales to the `messages` directory.

To confirm if things are working, run `pnpm build` once.

From here, you're good to go, the docs will help you out for the most part, like for the 98% part, here's the 1%:

1. Use translations in server components with `const t = await getTranslations('Namespace')`
2. Use tranlations in client components with `const t = useTranslations('Namespace')`

`Namespace` is the name of the object to use, check out [the docs](https://next-intl-docs.vercel.app/) for more.

And the remaining 1%:

1. In your `layout.tsx` and `page.tsx` files, if you're using static generation the file is a server component (doesn't have `use client` at the top), you'll have to forward the `locale` param from the page params to a function named `unstable_setRequestLocale`, see an example in the [users page](/src/app/[locale]/rsc/users/page.tsx)
2. For client components you can simply use the `useTranslations` hook and you'll be good to go, no need for specifying any locale.

## Styling

Let's end the never-ending quest to find the perfect CSS solution: It doesn't exist. But, my favorite solution for years now is Tailwind CSS, combine it with Shadcn UI and you have 100% control over your codebase while also having a design system that's easy to maintain.

As for components, I like keeping my Shadcn components inside the shared module, and then using them wherever I want. All shared components (navbar, footer, etc.) should be placed inside the shared module as well. This will allow you to not worry about useless drama and keep a clean codebase.

As for styling, use tailwind variants for variants, the `cn` function for conditional classes, and tailwind for everything else. ✨ Glimmer comes with `prettier-plugin-tailwindcss` configured, so you don't have to worry about organizing your classes, just write them and let Prettier do the rest.

## DDD (Domain-Driven Design)

I religiously follow DDD (Domain-Driven Design) after seeing almost all the other architecures fail at scale for React applications.

In my opinion, having a folder for each domain (user, product) and then packing everything regarding that domain within the same folder, is infinitely more scalable than having a central `components`, `hooks`, or `contexts` directory, you will end up with sharded domains that are super hard to maintain, let alone scale.

Here's what a typical `user` module looks like in my app:

```
modules/user
|_user.config.ts
|_user.types.ts
|_user.utils.ts
|_components
	|_index.ts
	|_user-card.component.tsx
	|_user-badge.component.tsx
	|_user-profile.component.tsx
|_providers
	|_index.ts
	|_user.provider.tsx
	|_user-profile.provider.tsx
|_services
	|_index.ts
	|_user.service.ts
	|_user-profile.service.ts
|_hooks
	|_index.ts
	|_use-user.ts // or user.hook.ts
	|_use-user-by-id.ts
	|_use-user-profile.ts
```

Read more about the file and directory naming conventions [below](#files-and-directories)

### What do these files even mean?

Config, utils, and types are pretty straightforward, but let me explain the other cowboys:

#### Components

All components regarding a module. Don't worry about dumb, smart, contextful, contextless, stateful, stateless, brother, sister, blah blah, anything. Do not worry about anything. Components are components, group them in the same directory and voila, you just saved yourself a ton of unnecessary headache.

#### Providers

You can't use Context.Provider in React Server Components, each of the providers inside the providers directory (or the user.provider.tsx file, in case you don't have multiple providers) exports a bunch of shit:

- The context
- A hook to use the context
- A provider component that's just a wrapper around Context.Provider
- Optionally, an HOC to wrap any component in the same context, dope.

#### Services

You won't need a whole directory, mostly, because you might not have multiple services, so a `user.service.ts` would suffice as well. The main goal of a service is to provide server-side query/mutation logic.

If your app uses some 3rd party server, your service just needs to export small wrappers around your APIs, such as:

```ts
export async function getUsers(): Promise<User[]> {
  return userService.get("/users").then((res) => res.data);
}
```

These functions can used by all 3; your Client, your Route Handlers, and your Server Components.

In a server-only context, your functions might include direct queries to your database, and you should add a `use server` directive to the top of your file to ensure your client stays away from it. You will have to use route handlers (API routes) to then access these services.

Read more about data fetching [below](#data-fetching)

#### Hooks

In my opinion, hooks are just functions, and they should be treated as such. They should do one task and be pure. Following are the 2 use-cases for hooks in my app:

1. Data fetching on the client.
2. Module-level react-content-aware utilities.

For example, your `user` module might need to access a user by its `id`, you can make a simple wrapper around the `useQueryService` hook inside a `use-user-by-id.ts` (or user-by-id.hook.ts) file that calls the API for you:

```ts
export function useUserById(id: string) {
  return useQueryService<never, User>({
    queryKey: ["user", id],
    url: apiRoutes.v1.user(id),
  });
}
```

Read more about data fetching [below](#data-fetching)

The second use-case is general, maybe you want to display a user's email if their name is absent, you can create a simple hook called `use-user-name.ts` and use it for this very module.

## Testing

I love unit and e2e testing, integration not so much. I have yet to discover the true benefits of integration testing, but I'm sure I'll get there soon.

Until then, I love how simple it is to test individual units with Jest and how fun it is to test whole workflows using Cypress.

### Unit Testing

I like keeping each unit (component, hook, service) in a folder of its own, with a .test.ts(x) file right text to it. This way, you can easily find the tests for a specific unit, and you can easily find the unit for a specific test (I don't know if that last bit even makes sense).

```bash
components/
  |_user-card/
    |_index.ts
    |_user-card.component.tsx
    |_user-card.component.test.tsx
```

Jest is configured to read these files, so you don't have to worry about anything, just write your tests and run `pnpm test` to see the magic happen.

### E2E Testing

Cypress is the best choice for E2E testing, and I've configured it to work with ✨ Glimmer. You can run the tests using `pnpm e2e` and `pnpm e2e:watch` to see the tests in action.

Cypress comes with an opinionated structure, and I like to keep it that way. You can find the tests in the `cypress/e2e` directory, and the fixtures in the `cypress/fixtures` directory.

For an example test of the example users pages, check out the [RSC suite](/cypress/e2e/rsc/users.cy.js) and the [React Query suite](/cypress/e2e/react-query/users.cy.js).

## Linting

The ESLint config uses the plugins from [Perfectionist](https://eslint-plugin-perfectionist.azat.io/). Coincidentally, I've also been called a perfectionist many times by my colleagues. I guess it's about time I embrace that and start producing near-perfect code.

You can always modify the eslint config to your liking since you literally own the whole template.

Run `pnpm lint` to run a formal linting check on your codebase, and `pnpm format` to format your codebase. Most (like 99%) of the formatting errors will be resolved by the format command.

If you don't like how strict and opinionated the linting is, you can always modify the `.eslintrc.json` file to your liking.

If you want to completely remove the `perfectionist` plugin, you can do so by uninstalling it and removing all relevant rules from the `.eslintrc.json` file.

## Conventions

I like using constants wherever I can, and use camelCase for pretty much everything other than types, interfaces, and classes.

As for types vs interfaces, I prefer interfaces for general definitions and types for unions and intersections.

I don't prefix or suffix any type definitions with any I or T, don't wanna get PTSD from the Java days.

As for variable names, I prefer longer but elaborate names over shorter but weird ones. I prefer `applicationsCount` over `numApps`, `getErrorMessageByCode` over `getErrMsg`, and the list goes on.

### Files and directories

I like to prefix the files with the module's name, makes it super easy to know which file belongs to whom, and looks super cool as well. The idea is that every file in the module with be prefixed with the module name, until the file grows into "files" and needs a directory for itself and its siblings, then it will be suffixed with the directory name.

So, a typical `utils.ts` will become `user.utils.ts`, until you need multiple utils, and then you can simply make a `utils` directory, nest one file as `user.utils.ts` and another as (maybe) `user-profile.utils`.

The same can be applied to any set of files. Typically, start with just a simple module and add files as you go, don't overwhelm yourself and keep remember that the goal is to have fun while developing at lightspeed.

### Components

Don't export components as default (other than Next.js' pages), always use named exports and the function keyword. This will allow you to easily find the component's definition and usage, and will also allow you to easily refactor the component into a hook or a provider if needed.

Always export a component's props as an interface, no matter how simple they may be.

```tsx
export interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserProps) {...}
```

Always use services in Server Components instead of fetching directly from the API, this will allow you to easily switch to a different data-fetching method in the future.

```tsx
export interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function UserDetailsPage({
  params: { id },
}: UserDetailsPageProps) {
  const user = await getUserById(id);

  if (!user) notFound(); // Next.js built-in function

  return <UserCard user={user} />;
}
```

### Typography

✨ Glimmer has a `Typography` component ready for you to use with a consistent font size, line height, and font family across your app. You can use it as follows:

```tsx
import { Typography } from "@/modules/shared/components";

<Typography variant="h1">Hello, world!</Typography>

// Render any tag
<Typography as="h2" variant="h1">Hello, world!</Typography>
```

This is just one of the many glimpses of sass you'll find in ✨ Glimmer, of course you can always just open the [file](/src/modules/shared/components/typography.component.tsx) and modify anything you want.

## Data fetching

You can fetch data in a ton of different ways in modern-day Next.js. How you do it will be highly dependent on the nature of your app, your architecture, your deployment strategy, and your preferences.

But the idea behind ✨ Glimmer is to provide you with more than what you need so that you can simply use whatever you want without having to worry about anything.

### Client-side data fetching

✨ Glimmer comes packed with 2 hooks, `useQueryService` and `useMutationService`, both serving as wrappers around react-query's `useQuery` and `useMutation` hooks in combination with independant data-fetching capabilities.

Let me show you what I mean.

#### Queries

Queries are as simple as this:

```ts
const { data, isError, isLoading } = useQueryService<Data, Response>({
  url: `/some-url/${id}`,
  queryKey: ["some-data"],
  headers: { Authorization: `Bearer ${token}` },
});
```

Underneath, it uses a shared axios instance from the `shared` module, but you can also provide a custom instance with the `service` prop:

```ts
useQueryService({
  service: userService,
  url: `/some-url/${id}`,
  queryKey: ["some-data"],
  headers: { Authorization: `Bearer ${token}` },
});
```

You can always access the hook itself and see how it works/modify by [visiting the file](/src/modules/shared/hooks/use-query-service.ts)

You can also find an example usage at the [users page](/src/app/[locale]/react-query/users/page.tsx)

#### Mutations

Mutations are similar, except they're even more sass-packed.

```ts
const { mutate, isError, isPending } = useMutationService<Data, Response>({
  url: `/some-url/${id}`,
  // You can also specify all axios params while mutating
});

mutate({
  data: someData,
  config: {
    url: `/some-url/${id}`,
  },
});
```

Mutations can also handle toasts by themselves, but allow you to disable this behavior if you want to handle them by yourself. The app uses [Sonner](https://sonner.emilkowal.ski/) with Shadcn's implementation of it and you can customize the default toast strings from your translations file.

```ts
mutate(...)

// Right after making this call, you will see a toast on screen.
// The toast then either turns into a success message or fails.
// You can disable the toast per-mutation as follows

useMutationService({
	disableToast: true
})

// Or permanently by visiting the hook and removing the functionality altogether.

```

### Route Handlers (API Routes)

Next.js' app directory turned API routes into [route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), you can find an example definition in the [api directory](/src/app/api/v1/users/route.ts), and a sample implementation in the [users page](/src/app/[locale]/react-query/users/page.tsx).

You can, essentially, write your own APIs within Next.js inside route handlers and then access them using your frontend by the hooks we discussed above.

### RSCs (React Server Components)

The talk of the day, RSCs. Server Components allow you to fetch data on the server and render your React components within the same component. The reason why we separated our services into a specific folder is to allow us to use Server Components whenever we want. You can find an example usage in the [users page](/src/app/[locale]/rsc/users/page.tsx).

The idea is to have the services be independant functions that can be called by either the route handlers or the server components from anywhere.

So, you can either:

```ts
// RSC
export async function Users() {
  const user = await getUsers();
}
```

or just

```ts
// Route handlers
export async function GET() {
  const user = await getUsers();
  return Response.json(users);
}
```

and voila, you are good to go!

---

That wraps up the philosophy for ✨ Glimmer (so far), there is a lot more coming, please stay tuned and stay sassy!
