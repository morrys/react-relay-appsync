# [React Relay Upload S3](https://github.com/morrys/react-relay-upload-s3)
Middleware for Relay Modern Network Layer for upload file to AWS S3

## Installation

Install react-relay-upload-s3 using yarn or npm:

```
yarn add react-relay-upload-s3
```

## Usage

How to create the RelayNetworkLayer

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

How to use in commitMutation

```typescript

    //single file
    const file:any = {
      bucket: bucket,
      key: key,
      region: region,
      file: selectedFile
    };

    commitMutation(
        ...
        uploadables: {
          file
        },
    );

    //multiple files
    const file1:any = {
      bucket: bucket,
      key: key1,
      region: region,
      file: selectedFile1
    };

    const file2:any = {
      bucket: bucket,
      key: key2,
      region: region,
      file: selectedFile2
    };

    commitMutation(
        ...
        uploadables: {
          file1,
          file2
        },
    );
```

## TODO

Document how to use urlMiddleware and authMiddleware in the context of AWS

Implementation of Middleware for IAM Authentication


## License

React Relay Upload S3 is [MIT licensed](./LICENSE).

