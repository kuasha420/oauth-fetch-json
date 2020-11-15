import 'cross-fetch/polyfill';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import OAuth, { RequestOptions } from 'oauth-1.0a';

export interface Request {
  /** Request URL */
  url: string;
  /** Request Method */
  method: string;
  /** Request Body */
  body?: object;
  /** Consumer Key */
  consumer_key: string;
  /** Consumer Key */
  consumer_secret: string;
  /** Access Token */
  access_token?: string;
  /** Access Token Secret */
  token_secret?: string;
}

export interface Options {
  cors: boolean;
  followRedirect: boolean;
}

export const oauthFetchJson = async <Output = any>(
  request: Request,
  options?: Partial<Options>,
  extraHeaders?: Record<string, string>
) => {
  try {
    const defaultOptions: Options = {
      cors: true,
      followRedirect: true,
    };

    const finalOptions: Options = {
      ...defaultOptions,
      ...options,
    };

    const oauth = new OAuth({
      consumer: {
        key: request.consumer_key,
        secret: request.consumer_secret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return HmacSHA1(base_string, key).toString(Base64);
      },
      body_hash_function(base_string, key) {
        return HmacSHA1(base_string, key).toString(Base64);
      },
    });

    const data: RequestOptions = {
      url: request.url,
      method: request.method,
      data: request.body,
      includeBodyHash: request.body ? true : false,
    };

    let auth: OAuth.Authorization;

    if (request.access_token && request.token_secret) {
      auth = oauth.authorize(data, {
        key: request.access_token,
        secret: request.token_secret,
      });
    } else {
      auth = oauth.authorize(data);
    }

    const header = oauth.toHeader(auth);

    const defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const requestOptions: RequestInit = {
      method: request.method,
      headers: { ...defaultHeaders, ...header, ...extraHeaders },
      redirect: finalOptions.followRedirect ? 'follow' : undefined,
      mode: finalOptions.cors ? 'cors' : undefined,
      body: JSON.stringify(request.body),
    };

    const res = await fetch(request.url, requestOptions);
    const json = await res.json();
    return json as Output;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  oauthFetchJson,
  fetch: oauthFetchJson,
};
