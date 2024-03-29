import { config } from '@keystone-6/core';
import { extendGraphqlSchema } from './mutations/index';
/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';

import 'dotenv/config';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL || 'postgres://localhost/keystone';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'postgresql',
      url: databaseURL,
      async onConnect(context) {
        console.log('Connected to database');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context);
        }
      },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => {
        console.log(context.session);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return !!context.session?.data;
      },
    },
    lists,
    extendGraphqlSchema,
    session,
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
        credentials: true,
      },
    },
  })
);
