import { Middleware, RelayNetworkLayerRequest } from 'react-relay-network-modern/lib/definition';
import { Credentials, CredentialsOptions } from 'aws-sdk/lib/credentials';
import { Signer } from './signer';
import * as Url from 'url';
const SERVICE = 'appsync';

type CredentialsGetter = () => (Credentials | CredentialsOptions | Promise<Credentials> | Promise<CredentialsOptions> | null) | Credentials | CredentialsOptions | Promise<Credentials> | Promise<CredentialsOptions> | null;

export type AuthIAMMiddlewareOpts = {
  credentials: CredentialsGetter
  region: string
};

export default function authIAMMiddleware(opts: AuthIAMMiddlewareOpts): Middleware {
  const {
    credentials,
    region
  } = opts;
  return (next) => async (req: RelayNetworkLayerRequest) => {
    const service = SERVICE;
    const url = req.fetchOpts.url;

    let creds = typeof credentials === 'function' ? (credentials as any).call() : (credentials || {});

    if (creds && typeof creds.getPromise === 'function') {
      await creds.getPromise();
    }

    const { accessKeyId, secretAccessKey, sessionToken } = await creds;

    const { host, path } = Url.parse(url);

    const formatted = {
      ...formatAsRequest(req),
      service, region, url, host, path
    };

    const { headers } = Signer.sign(formatted, { access_key: accessKeyId, secret_key: secretAccessKey, session_token: sessionToken });
    req.fetchOpts.headers = {
      ...req.fetchOpts.headers,
      ...headers
    }
    return next(req);
  };


}

const formatAsRequest = ({ fetchOpts }) => {
  return {
    body: fetchOpts.body,
    method: fetchOpts.method,
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=UTF-8',
      ...fetchOpts.headers,
    },
  };
}
