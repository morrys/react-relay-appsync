# [React Relay Upload S3](https://github.com/morrys/react-relay-upload-s3)
Middleware for Relay Modern Network Layer for upload file to AWS S3

## Installation

Install react-relay-upload-s3 using yarn or npm:

```
yarn add react-relay-upload-s3
```

## Usage

```typescript
import {uploadS3Middleware} from 'react-relay-upload-s3';
```

```typescript
const network = new RelayNetworkLayer(
  [
    urlMiddleware(...),
    uploadS3Middleware({credentials: complexObjectsCredentials}),
    authMiddleware(...),
  ],
  {}
);
```

## TODO

Document how to use urlMiddleware and authMiddleware in the context of AWS

Implementation of Middleware for IAM Authentication


## License

React Relay Upload S3 is [MIT licensed](./LICENSE).

