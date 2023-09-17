
// figuras del jusgo / cada coleccion de arrays representa un elemento del juego
export const TETROMINOS = {
  0: {
    shape: [[0]],
    color: "0000",
  },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "024183",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "E55406",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "5E05A0",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "B20810",
  },

  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "F539B4",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "02B6A5",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "26970A",
  },
};

// para obtener un objeto aleatorio de la collection
export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  // selecciona un char aleatorio de la cadena tetrominos
  const randTetrominos =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];

  // retorna un elemento de la lista
  return TETROMINOS[randTetrominos];
};
