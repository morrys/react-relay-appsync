---
id: react-relay-auth-iam
title: React Relay Auth IAM
---

# [React Relay Authentication AWS IAM](https://github.com/morrys/react-relay-appsync)
Middleware for Relay Modern Network Layer for authentication to AWS IAM

## Installation

Install react-relay-auth-iam using yarn or npm:

```
yarn add react-relay-auth-iam
```

## Usage

How to create the RelayNetworkLayer

```typescript
import {authIAMMiddleware} from 'react-relay-auth-iam';
```

```typescript
const network = new RelayNetworkLayer(
  [
    urlMiddleware(...),
    authIAMMiddleware({credentials: iamCredentials, region: region}),
  ],
  {}
);
```