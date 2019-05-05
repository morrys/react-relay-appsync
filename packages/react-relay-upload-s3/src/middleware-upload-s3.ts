import { Middleware, RelayNetworkLayerRequest } from 'react-relay-network-modern/lib/definition';
import { Credentials, CredentialsOptions } from 'aws-sdk/lib/credentials';
import * as S3 from 'aws-sdk/clients/s3';

type CredentialsGetter = () => (Credentials | CredentialsOptions | Promise<Credentials> | Promise<CredentialsOptions> | null) | Credentials | CredentialsOptions | Promise<Credentials> | Promise<CredentialsOptions> | null;

export type UploadS3MiddlewareOpts = {
    credentials: CredentialsGetter
};

export interface FileS3Type {
    bucket: string
    key: string
    region: string
    file: File | Blob
}

export interface UploadableS3 {
    [key: string]: FileS3Type;
}

function upload(fileField: FileS3Type, { credentials }) {
    const Body = fileField.file;
    const { type: ContentType } = Body;
    
    const {
        bucket: Bucket,
        key: Key,
        region,
    } = fileField;
    const s3 = new S3({
        credentials,
        region,
    });

    return s3.upload({
        Bucket,
        Key,
        Body,
        ContentType,
    }).promise();
};

export default function uploadS3Middleware(opts: UploadS3MiddlewareOpts): Middleware {
  const {
    credentials,
  } = opts;
  return (next) => async (req: RelayNetworkLayerRequest) => {
    const uploadables: UploadableS3 = req.uploadables;
      if (uploadables) {
        const uploadCredentials = typeof credentials === 'function' ? (credentials as any).call() : credentials;
        const uploadPromise = Promise.resolve(uploadCredentials)
          .then(credentials => {
            const uploadPromises = Object.entries(uploadables).map(([_, fileUpload]) => upload(fileUpload, { credentials }));
            return Promise.all([...uploadPromises] as Promise<any>[]);
          }).then(() => {
            delete req.uploadables;
            req.fetchOpts.body = req.prepareBody();
            return next(req)
          })
        return uploadPromise;
      } else {
        return next(req)
      }
  };
}