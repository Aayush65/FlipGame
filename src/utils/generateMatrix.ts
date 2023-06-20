const allEmojis: string[] = [
  '😄', '🌻', '🍕', '🏀', '🌈', '🎈', '🎉', '🎁', '🍔', '🍟',
  '🚀', '🌕', '🎸', '🎤', '🌺', '🌼', '🐠', '🐚', '🚲', '🌳',
  '⚽️', '🎾', '🍦', '🍓', '🌞', '🌴', '📚', '✏️', '🎮', '🕹️',
  '🍩', '☕️', '🌍', '🌙', '🍉', '🍎', '🚗', '🌸', '🌹', '🐳',
  '🌵', '🏓', '🍒', '🍍', '🎃', '🎅', '🎄', '🍂', '🌊', '🍇'
];

const generateMatrix = (n: number): string[][] => {
  // Creating a suffled set of emojis
  const shuffledEmojis: string[] = [...allEmojis];
  for (let i: number = shuffledEmojis.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [shuffledEmojis[i], shuffledEmojis[j]] = [shuffledEmojis[j], shuffledEmojis[i]];
  }
    
  // Calculate the number of elements needed per set
  const numElements: number = Math.floor(n * n / 2);
  
  // Create two identical sets of emojis
  const emojis: string[] = [];
  for (let i: number = 0; i < numElements; i++)
    emojis.push(shuffledEmojis[i], shuffledEmojis[i]);
  
  // Shuffling Emojis array (the array meant to be shown in the cards)
  for (let i: number = numElements * 2 - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }

  // Create the matrix and distribute the emojis
  const matrix: string[][] = Array(n).fill('').map(() => Array(n).fill(''));
  for (let i: number = 0; i < n; i++)
    for (let j: number = 0; j < n; j++)
      matrix[i][j] = emojis[i * n + j];

  // console.log(matrix);
  return matrix;
}

export default generateMatrix;