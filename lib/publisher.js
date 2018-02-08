'use strict';

const PubSub = require('@google-cloud/pubsub');

const Publisher = function( projectId, topicName ) {
  this.projectId = projectId;
  this.topicName = topicName;
}

Publisher.prototype.send = function( data, callback ) {
  const projectId = this.projectId;
  const topicName = this.topicName;
  const dataBuffer = Buffer.from( data );

  const pubsub = new PubSub( {
    projectId: projectId,
  } );

  pubsub
    .topic( topicName )
    .publisher()
    .publish( dataBuffer )
    .then( results => {
      callback( results )
    } )
    .catch( err => {
      console.error( 'ERROR:', err );
    } );
}

module.exports = Publisher;
