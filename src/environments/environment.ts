// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import * as url from 'url';

export const environment = {
  production: false,
  server_url: process.env.SERVER_URL ?
    url.resolve(process.env.SERVER_URL, 'api')  :
    'http://localhost:3000/api/'
};
