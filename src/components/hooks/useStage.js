import { useState, useEffect } from "react";
import { createStage } from "../../gameHelpers";
import breakSound from "../../assets/breakSound.mp3";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const breakEffect = () => new Audio(breakSound).play()

  useEffect(() => {
    setRowsCleared(0);

    // eliminar filas / remove stage full rows
    const sweepRows = (newStage) => {
      /* 
        newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          // agregamos una nueva fila a la parte superior del stage
          ack.unshift(new Array(newStage[0].length).fill(0, "clear"));
          return ack;
        }

        ack.push(row);
        return ack;
      }, []);

      */

      let rowsDeleted = 0;

      const stg = newStage.reduce((acc, row) => {
        // console.log(newStage);
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          // Row is full
          rowsDeleted++;
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          breakEffect()
          return acc;
        }
        acc.push(row);

        return acc;
      }, []);


      setRowsCleared(rowsDeleted);
      
      return stg;

      
    };

    const updateStage = (prevStage) => {
      // primera carga / first flush of the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // luego dibujar la figura / then draw the tetromino
      player.tetromino.forEach((row, y) => {
        // revisamos que celdas estan ocupandas
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      // validar si chocamos / check if we collided
      if (player.collided) {
        resetPlayer();
        // retorna un newStage a partir del anterior
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
