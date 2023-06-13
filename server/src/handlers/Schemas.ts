import Joi from 'joi';

/**
 * Schemas are used by MessageHandlers to validate that the server has received
 * data in the appropriate form. See documentation for the joi module.
 */

const reasonableString = Joi.string().max(128, 'utf8').required();
const positiveInt = Joi.number().positive().required();

const username = reasonableString;
const id = positiveInt;

export type Schema = {
  [key: string]: Joi.AnySchema;
};

export default {
  username,
  id,
};

/**
 * Return an object that can perform validation against the given schema.
 * 
 * @param schema the schema
 * @returns the validator object
 */
export function intoValidator(schema: Schema): Joi.ObjectSchema {
  return Joi.object({ _id: id, ...schema }).required();
}
