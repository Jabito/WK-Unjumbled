# Initializing

Run `npm install` to install node dependencies

Run `bower install` to install bower dependencies

#### Note: Make sure to change the details of the game in manifest.json

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Deployment to Amazon S3

Note: Update the game/manifest.json.

Run `grunt deploy`, credentials are already provided.

```
https://s3-ap-southeast-2.amazonaws.com/demos.wingaru.com.au/GAME_NAME/index.html

```

## Update index.html with js assets

Running `grunt update` to update the index.html with js files
