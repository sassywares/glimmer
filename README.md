This is a [Next.js](https://nextjs.org/) Starter Kit bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- TypeScript
- ESLint
- Prettier
- Tailwind CSS
- Shadcn UI
- Lucide Icons
- [DDD (Domain-Driven Design) Structure](#folder-structure)
- A `shared` module with:
  - Useful everyday hooks
    - useMediaQuery
    - useQueryService
    - [and many more](/src/modules/shared/hooks/index.ts)
  - Useful everyday Components (Shadcn + more)
    - Combobox
    - Typography
    - [and many more](/src/modules/shared/components/index.ts)
  - Useful everyday Providers
    - ThemeProvider
    - QueryClientProvider
    - [and many more](/src/modules/shared/providers/index.ts)

## Philosophy

### Naming Conventions

I like to use the dot-notation with kebab-case, so a component called `UserProfile` would be named `user-profile.component.tsx`, a hook called `useUser` would be named `use-user.ts`, service named `UserService` would be named `user.service.ts`, you get the idea. This makes it super easy to find files and understand what they do.

The only exception to this are the shared components in `shared/components` as they're one-offs and don't belong to any module.

### Code Style

I like to keep my code clean and consistent, which is why there is an ESLint and Prettier config already set up. I use the `function` keyword for function declarations and the `const` keyword for variable declarations, doesn't matter if a function is one-line or a 100.

As for types and interfaces, I prefer types suffixed with `Interface`, like `UserInterface`, why the contradiction? Well, `User` alone can be anything, even a component, who knows? `UserType` can be confused with a union type, such as `UserType = User | Admin`, so I prefer `UserInterface`. Why not just define it as an interface then? Cuz types are way easier to extend and merge.

### Folder Structure

I love DDD (Domain-Driven Design) and I try to apply it to my projects. This project is structured in a way that it's easy to understand and navigate. You have only 2 main folders: `src/app` and `src/modules`.

In my opinion, `app` should contain no more than the main files of that page as per Next.js' standards. I consider each page a module and make a folder for it in `src/modules`. Each page only imports what it needs from its module. This makes the app scalable, reusable, and easy to maintain.

As for modules, I do not recommend nesting at all, but if you have to, make sure you don't go more than 2 levels deep. Beyond that, it becomes hard to navigate and understand the structure, not to mention how lengthy the import statements become. As per conventions, you should keep nested modules in a folder called `modules` inside the parent module.

### Exports

I think defaulting an export from a file and then barelling the default export as a named export is kind of redundant. I prefer to export everything as named exports, even if there's only one thing to export, before barelling them all through an index file. This makes it easier to understand what's being exported and imported.

However, I don't think directories should barell sub-directories, only the files in the directory. This makes it easier to understand what's being imported and avoids unnecessary webpack errors.

### Modules

Modules are the building blocks of the app. Each module should be self-contained and independent. A common example of a module would be `user`, a module that should contain everything from authentication to user profiles and preferences.

How you define your modules depends on the needs of your app, but it should be consistent. In my opinion, each directory of a module should barrel-export its contents in an `index.ts` file. This makes it easy to import the module's contents in other files. I don't recommended barelling the entire module as that would make it hard to understand what's being imported, not to mention how many webpack errors you would run into.

An opinionated module structure looks like this:

```bash
src/modules
├── user
│   ├── components
│       ├── user-profile.component.tsx
│       ├── index.ts
│   ├── hooks
│       ├── use-user.ts
│       ├── index.ts
│   ├── services
│       ├── user.service.ts
│       ├── index.ts
│   ├── providers
│       ├── user.provider.tsx
│       ├── index.ts
│   ├── user.types.ts
│   ├── user.config.ts
│   ├── user.utils.ts
```

Here's a brief explanation of each directory:

- `components`: Contains all the components related to the module, from dumb components to complex, page-level ones.
- `hooks`: Contains all the hooks related to the module. These hooks should be reusable and should not contain any business logic.
- `services`: Contains all the services related to the module. These services should contain all the business logic and should be used by the components.
- `providers`: Contains all the providers related to the module. These providers should contain the context and should be used by the components.
- `types`: Contains all the types related to the module. These types should be used by the components, hooks, and services.
- `config`: Contains all the configuration related to the module. This could be anything from flags to constants.
- `utils`: Contains all the utility functions related to the module. These functions should be used by the components, hooks, and services.

### Components

I disagree that components should be split between dumb and smart. It only adds unnecessary complexity and gives you an extra headache once when you create the component and another when you promote it to a smart component. Instead, I think components are, well, components. Who cares if they're dumb or if they're smart? They can very well live together under the same roof.

### Data Fetching

The `shared/hooks` directory exports a `useQueryService` and a `useMutationService` hook, both of which are wrappers around the `useQuery` and `useMutation` hooks from `react-query`, combined with a custom axios client.

This essentially allows you to fetch/mutate data and manage its state with a single hook, without having to worry about the underlying implementation.

However, for reusable queries and mutations, I recommend creating a hook in your module's `hooks` directory that uses the `useQueryService` and `useMutationService` hooks from `shared/hooks`.

I'm still learning about Server Actions so more on that later.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
