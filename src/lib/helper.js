export function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomInArray (array) {
  return array.length > 0 
    ? array[getRandomIntInclusive(0, array.length - 1)]
    : null
}