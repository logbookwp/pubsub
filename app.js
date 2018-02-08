'use strict';

// [START app]
const express = require( 'express' );
const publisher = require( './lib/publisher' );

const app = express();

app.get( '/publish/checkstats', ( req, res ) => {
  if ( 'true' === req.headers['x-appengine-cron'] || "8080" === process.env.PORT

 ) {
    const pub = new publisher( 'tarostats', 'checkstats' );
    pub.send( { url: 'https://miya.io/' }, function( results ) {
      console.log( results )
    } );
    res.status( 200 ).send( 'OK' ).end();
  } else {
    res.status( 403 ).send( 'Forbidden' ).end();
  }
} );

app.get( '/*', ( req, res ) => {
  res.status( 403 ).send( 'Forbidden' ).end();
} );

// Start the server
const PORT = process.env.PORT;
app.listen( PORT, () => {
  console.log( `App listening on port ${PORT}` );
  console.log( 'Press Ctrl+C to quit.' );
} );
// [END app]
