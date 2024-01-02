export function getRandomValue(currentValue: string | number) {
  const values = [1, 2, "A"];
  const randomIndex = Math.floor(Math.random() * values.length);
  const val = values[randomIndex];
  if (val !== currentValue) {
    return val;
  } else {
    return getRandomValue(val);
  }
}
