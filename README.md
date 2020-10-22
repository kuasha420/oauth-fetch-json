# Oauth Fetch JSON

[![Star IT Ltd](https://staritltd.com/wp-content/uploads/2019/10/Web_Logo_of_Star_IT_158x80.png)](https://staritltd.com)

🔥 An oauth client that fetches json. Works on node, react-native & browsers. 🔥

## Installation & Usage

### For node/react-native

Install with your favorite package manager.

Using Yarn:

```
yarn add @kuasha420/oauth-fetch-json
```

Using NPM:

```
npm i @kuasha420/oauth-fetch-json

```

Now import with ESM or CommonJS Syntax:

#### Using Named Exports

```typescript
import { oauthFetchJson } from '@kuasha420/oauth-fetch-json';
const res = await oauthFetchJson(/*...*/);
```

#### Using Default Exports

```typescript
import OFJson from '@kuasha420/oauth-fetch-json';
const res = await OFJson.oauthFetchJson(/*...*/);
// or, use alias fetch
const res = await OFJson.fetch(/*...*/);
```

### For Browser

Add a script tag with the umd bundle from unpkg or release page.

```html
<script src="https://unpkg.com/@kuasha420/oauth-fetch-json"></script>
```

Now you will have `OFJson` global in the window object.

## Example

```typescript
import { oauthFetchJson } from '@kuasha420/oauth-fetch-json';

const main = async () => {
  try {
    const res = await oauthFetchJson({
      url: 'https://www.exampla.org/api/v3',
      method: 'GET',
      consumer_key: '756uyh56uh5ru5yutr765uyhjgh67uryh675uhgr657uyr',
      consumer_secret: '657uyhgfh567hg765uhg75uyh567uhfgh756uhrytfu',
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

main();
```

## API

```typescript
const oauthFetchJson: <Output = any>(
  request: Request,
  options?: Partial<Options>,
  extraHeaders?: Record<string, string>
) => Promise<Output>;

interface Request {
  url: string;
  method: string;
  body?: object;
  consumer_key: string;
  consumer_secret: string;
  access_token?: string;
  token_secret?: string;
}
interface Options {
  cors: boolean;
  followRedirect: boolean;
  includeBodyHash: boolean;
  authAttachment: 'header' | 'body';
}
```

## License

This package is licensed under the MIT License.

## Contribution

Any kind of contribution is welcome. Thanks!
