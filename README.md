# GOV.UK Notify public research prototype

This project is for doing user research around emails and text messages.
It implements prototypes which are copies of real pages and services on
[GOV.UK](https://www.gov.uk), with added email/text message flows and
call to actions, powered by the GOV.UK Notify API.

Based on: [webchat-prototype](https://github.com/alphagov/webchat-alpha)

## Building and running

This is based on the [GOV.UK prototype kit](https://github.com/alphagov/govuk_prototype_kit),
so most instructions that apply to that work here too. In short:

```bash
npm i
npm start
open http://localhost:3000
```

## Local environment

You’ll need the following environment variables set locally in order to
talk to external services.

If you need these locally, take them from the _settings_ page in Heroku.

Key name | What it’s for
---|---
`MONGODB_URI` | Connecting the prototype’s Mongo DB instance
`NOTIFYAPIKEY` | API key for the _Change your driving licence address_ service on GOV.UK Notify
`NOTIFYAPIKEYDART` | API key for the _Pay the Dart Charge_ service on GOV.UK Notify


## Deploying

Once you have this repo cloned and are in its directory:

```
heroku git:remote -a yfiton
```

Then every time you want to deploy:
```
git push heroku master
```
