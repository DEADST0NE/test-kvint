import express from 'express';

import mongooseConnect from './_utils/mongodb';

import './server.ts';

const app = express();

// View engine setup
  app.use(require("morgan")("dev"))
// ======================

mongooseConnect.then(() => 
  console.log('Success mongoose connest')
  ).catch(() => {
    console.error('Error mongoose connest !!!!!')
  }
)

export default app