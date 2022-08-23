import required from './required';
import whitespace from './whitespace';
import zero from './zero';
import type from './type';
import range from './range';
import enumRule from './enum';
import pattern from './pattern';

export default {
  required,
  whitespace,
  zero,
  type,
  range,
  enum: enumRule,
  pattern,
};
