import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

/**
 * Return the result of performing the query in sql/get_songs.sql on the
 * database.
 * 
 * @returns the songs
 */
async function onMessage(): Promise<any> {
  const songs = await DB.runQuery('get_songs');

  console.log('songs message');

  return { songs };
}

// Our schema can be empty, as we are not expecting any data with the message
const schema = {};

/**
 * A handler for the get_songs message; internally, queries the database for
 * the songs in it.
 */
export const GetSongsHandler = new MessageHandler(
  'get_songs',
  schema,
  onMessage,
);
