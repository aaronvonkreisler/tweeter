"use strict";

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwt: process.env.JWT,
  jwtExp: '5d',
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  clientHost: process.env.CLIENT_HOST
};