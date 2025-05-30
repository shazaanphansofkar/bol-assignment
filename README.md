
## Backstage Developer Portal

A customizable developer portal powered by [Backstage](https://backstage.io), built to demonstarte notification plugin

---

## Setup Instructions

1. **Install dependencies**

```bash
yarn install
```

2. **Build the backend and frontend**

```bash
yarn tsc
```

---

## Running the App

### Start Frontend

From the root directory:

```sh
yarn start
```

This starts the frontend on: `http://localhost:3000`

---

### Start Backend

From the root directory:

```bash
yarn start-backend
```

Backend runs at: `http://localhost:7007`

Websocket runs at: `ws://localhost:7071/`

To Generate notifications towards frontend you can run the folloeing command

```bash
yarn push-notification
```

---

### Run Tests

Run all tests:

```bash
yarn test
```
---

Run tests for a specific package:

```bash
cd packages/<your-package>
yarn test
```
---

## Documentation

- [Backstage Docs](https://backstage.io/docs)
- [Plugin Development](https://backstage.io/docs/plugins/create-a-plugin)
- [Backend System](https://backstage.io/docs/backend-system/overview)

