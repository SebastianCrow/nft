# NFT App

App displaying NFTs on `Solana` built in `React` and based on [Create React App](https://github.com/facebook/create-react-app).

## Scripts to go :rocket:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

App can be served locally using `serve -s build`.

### `yarn serve:prod`

A shortcut to build the production app (with a lint check) and serve it locally.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn lint`

Perform `ESLint` check on the app's codebase.

## Main points :tada: 

- App loads first 20 NFT listings from the API and displays it as cards in the responsive grid
- Next items are fetched from the API endpoint on demand when user scrolls down the page (infinite scrolling)
- The grid is virtualized so it the total items count doesn't matter because it doesn't hurt performance
- User can search NFT names. The search is performed on the client side (a direct lowercase string match)
- Failed requests to the API endpoint are retried infinitely every `500ms`

## Additional points :white_check_mark:

- Introduced the shared `packages/ui` as a foundation for the design system that other packages can use
  - UI components/hooks/utils should be added there. Other packages shouldn't add custom elements and reinvent the wheel
  - `Tailwind CSS` allows to compose style for the components in a fast and descriptive way
- API calls are cached so there are no redundant requests
  - LRU cache with a size limit to avoid a potential performance degradation
  - Possible improvement: add a way to force re-fetch (button, automatically on window focus, etc.)
- Next pages are requested from API on demand and partial results are shown to the user ASAP
  - E.g., fetching next pages if there is less than 20 results for the current search query
- Light and dark themes (including scrollbar). User selection is preserved in the local storage
  - Possible improvement: detect preferred theme using `Window.matchMedia()`
- Included [`Roboto Flex`](https://fonts.google.com/specimen/Roboto+Flex) font
- **Testing? Of course!**
  - `Jest` unit tests for utils, services, etc.
  - Testing components rendering with `@testing-library/react`
  - Testing React hooks logic with `@testing-library/react-hooks`
  - TODO: Network layer testing with ITs/E2Es (`Cypress`)
  - TODO: Migrate `React` hooks testing library to `React 18` ([note](https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support))
- Guarding the code quality and style with `ESLint`/`Prettier`
  - Using recommended `ESLint` rules
  - Included `TypeScript` rules
  - Recommended `React` and `React Hooks` rules
  - Cooperation with `Prettier`
  - Strict rules for imports (order, enforcing type imports, etc.)

## API endpoint notes :construction:

- It returns just a single `img` path to the very big original image (`2000px` x `2000px`) affecting client's performance (as seen in `Google Lighthouse`)
  - Thumbnails around `400px` x `400px` would be a sweet spot
  - Preferably, it should be possible to fetch different sizes/variants from CDN to match the client's layout size

## Responsive layout

Responsive desktop/mobile layout spanning from 2 to 6 columns

![Desktop](https://github.com/SebastianCrow/nft/blob/master/readme/desktop.png?raw=true)

![Mobile](https://github.com/SebastianCrow/nft/blob/master/readme/mobile.png?raw=true)

## Search

User can search NFTs in a fast and performant way.
API requests are sent when necessary and partial results are shown to the user ASAP.
They are cached, so we can say goodbye to the redundant calls.
An icon in the input allows to clear the search query quickly.

![Search](https://github.com/SebastianCrow/nft/blob/master/readme/search.png?raw=true)

## No results page

No results page with a clearly visible recovery action to clear the current search query.

![No results](https://github.com/SebastianCrow/nft/blob/master/readme/no-results.png?raw=true)

## Handling API errors

Failed requests to the API endpoint are retried infinitely every `500ms`

![API error handling](https://github.com/SebastianCrow/nft/blob/master/readme/api-error-handling.gif?raw=true)

## Light and dark themes

Light and dark themes (including scrollbar). User selection is preserved in the local storage

![Theme](https://github.com/SebastianCrow/nft/blob/master/readme/theme.gif?raw=true)

## Notable libraries used :handshake:

- The foundation
  - [`react`](https://github.com/facebook/react)
  - [`typescript`](https://github.com/microsoft/TypeScript)

- Virtualized grid (a lighter and improved alternative to the more complex [`react-virtualized`](https://github.com/bvaughn/react-virtualized))
  - [`react-window`](https://github.com/bvaughn/react-window)

- Query library to call API endpoint with very handful features out of the box (retry for failed requests, avoid a double call on component mount in React dev mode, etc.)
  - [`@tanstack/react-query`](https://github.com/TanStack/query)

- Utility CSS framework with a plugin for scrollbar's styling
  - [`tailwindcss`](https://github.com/tailwindlabs/tailwindcss)
  - [`tailwind-scrollbar`](https://github.com/adoxography/tailwind-scrollbar)

- `React` hook to notify on any element's resize. It uses `ResizeObserver API` and a fallback on older browsers
  - [`@react-hook/resize-observer`](https://github.com/ZeeCoder/use-resize-observer)

- Least Recently Used cache to store requests with a max items limit to avoid a potential performance degradation 
  - [`lru-cache`](https://github.com/isaacs/node-lru-cache)

- `Heroicons` for `React`
  - [`@heroicons/react`](https://github.com/tailwindlabs/heroicons)

- Testing `React` components and hooks
  - [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom)
  - [`@testing-library/react`](https://github.com/testing-library/react-testing-library)
  - [`@testing-library/react-hooks`](https://github.com/testing-library/react-hooks-testing-library)
  - [`@testing-library/user-event`](https://github.com/testing-library/user-event)

- Linting and code formatting
  - [`eslint`](https://github.com/eslint/eslint)
  - `TypeScript` linting
    - [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint)
    - [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint)
    - [`eslint-import-resolver-typescript`](https://github.com/import-js/eslint-import-resolver-typescript)
  - `React` and [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) linting
    - [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react)
    - [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
  - Cooperation with `Prettier` code formatter
    - [`prettier`](https://github.com/prettier/prettier)
    - [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)
    - [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)

## Thank you! :wave: