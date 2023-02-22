# NFT App

App displaying NFTs on `Solana` built in `React` and based on [Create React App](https://github.com/facebook/create-react-app).

## Scripts to go

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

## API endpoint notes :construction:

- It doesn't return NFT names, so they are generated on the client side
- It gives paths to the very big images (`2000px` x `2000px`) affecting client's performance. Preferably, something around `400px` x `400px` would be nice

## Additional points :white_check_mark:

- Introduced the shared `packages/ui` as a foundation for the design system that other packages can use
  - UI components/hooks/utils should be added there. Other packages shouldn't add custom elements and reinvent the wheel
  - `Tailwind CSS` allows to compose style for the components in a fast and descriptive way
- API calls are cached so there are no redundant requests
- Next pages are requested from API on demand and partial results are shown to the user ASAP
  - E.g., fetching next pages if there is less than 20 results for the current search query
- Light and dark themes (affecting scrollbar). User selection is preserved in the local storage
  - Possible improvement: detect preferred theme using `Window.matchMedia()`
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

Light and dark themes (affecting scrollbar). User selection is preserved in the local storage

![Theme](https://github.com/SebastianCrow/nft/blob/master/readme/theme.gif?raw=true)

## Notable libraries used :handshake:

- The foundation
  - `react`
  - `typescript`


- Virtualized grid (a lighter and improved alternative to the more complex `react-virtualized`)
  - `react-window`


- Query library to call API endpoint with very handful features out of the box (retry for failed requests, avoid a double call on component mount in React dev mode, etc.)
  - `@tanstack/react-query`


- Utility CSS framework with a plugin for scrollbar's styling
  - `tailwindcss`
  - `tailwind-scrollbar`


- `React` hook to notify on any element's resize. It uses `ResizeObserver API` and a fallback on older browsers
  - `@react-hook/resize-observer`


- Least Recently Used cache to store requests with a max items limit to avoid a potential performance degradation 
  - `lru-cache`


- `Heroicons` for `React`
  - `@heroicons/react`


- Testing `React` components and hooks
  - `@testing-library/jest-dom`
  - `@testing-library/react`
  - `@testing-library/react-hooks`
  - `@testing-library/user-event`


- Linting
  - `eslint`
  - `TypeScript` linting
    - `@typescript-eslint/eslint-plugin`
    - `@typescript-eslint/parser`
    - `eslint-import-resolver-typescript`
  - `React` and `React Hooks` linting
    - `eslint-plugin-react`
    - `eslint-plugin-react-hooks`
  - Cooperation with Prettier
    - `prettier`
    - `eslint-config-prettier`
    - `eslint-plugin-prettier`
