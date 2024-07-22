const letterColors = {
  a: 'bg-red-500',
  b: 'bg-green-500',
  c: 'bg-blue-500',
  d: 'bg-yellow-500',
  e: 'bg-purple-500',
  f: 'bg-pink-500',
  g: 'bg-indigo-500',
  h: 'bg-teal-500',
  i: 'bg-orange-500',
  j: 'bg-lime-500',
  k: 'bg-cyan-500',
  l: 'bg-fuchsia-500',
  m: 'bg-rose-500',
  n: 'bg-red-400',
  o: 'bg-green-400',
  p: 'bg-blue-400',
  q: 'bg-yellow-400',
  r: 'bg-purple-400',
  s: 'bg-pink-400',
  t: 'bg-indigo-400',
  u: 'bg-teal-400',
  v: 'bg-orange-400',
  w: 'bg-lime-400',
  x: 'bg-cyan-400',
  y: 'bg-fuchsia-400',
  z: 'bg-rose-400'
};

export const getRandomColor = (letter) => {
  const lowerCaseLetter = letter.toLowerCase();
  return letterColors[lowerCaseLetter] || 'bg-gray-500'; // Default color if letter is not in the mapping
};