import { useCallback, useState } from "react";
import { randomTetromino } from "../../tetrominos";
import { STAGE_WIDTH, checkCollition } from "../../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    // make the rows become colls / convertir las filas en columnas
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );

    // reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    // collision detect
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    // esto revisa si el objeto choca con algo al rotar
    while (checkCollition(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      // retorna a la pos inicial si choca
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    // actualizamos la pos previa del objeto
    setPlayer((prev) => ({
      ...prev,
      // pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      pos: { x: (prev.pos.x += x), y: prev.pos.y + y },
      collided,
    }));
  };

  // useCallBack para prevenir un loop infinito
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
