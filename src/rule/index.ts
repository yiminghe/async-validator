import required from './required';
import whitespace from './whitespace';
import type from './type';
import range from './range';
import enumRule from './enum';
import pattern from './pattern';

export default {
  required,
  whitespace,
  type,
  range,
  enum: enumRule,
  pattern,
};
