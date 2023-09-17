import React, { useEffect, useState } from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { createStage, checkCollition } from "../gameHelpers";
// custom hooks
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import useInterval from "./hooks/useInterval";
import { useGameStatus } from "./hooks/useGameStatus";

// sound effects
import moveSound from "../assets/moveSound.mp3";


const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

    const moveEffect = () => new Audio(moveSound).play()

  const movePLayer = (dir) => {
    // moveEffect()
    // si el objeto no choca permite el movimiento
    if (!checkCollition(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    // reset everithing
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  };

  const drop = () => {
    // incrementar el nivel cuando el jugador limpia 5 filas
    if (rows > (level + 1) * 5) {
      setLevel((prev) => prev + 1);
      // incrementa la velocidad
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollition(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // TODO - GAME OVER ANIM or something...
      if (player.pos.y < 1) {
        console.log("GAME OVER!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // presiona mov abajo
      if (keyCode === 40 || keyCode === 83) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      // si va a la izq
      if (keyCode === 37 || keyCode === 65) {
        movePLayer(-1);
      }
      // si va a la der
      else if (keyCode === 39 || keyCode === 68) {
        movePLayer(1);
      }
      // si va abajo
      else if (keyCode === 40 || keyCode === 83) {
        dropPlayer();
      }
      // si rota la figura
      else if (keyCode === 38 || keyCode === 87) {
        rotatePlayer(stage, 1);
      }
    }
  };

  useInterval(() => drop(), dropTime);

  return (
    <div
      className="w-full h-screen flex justify-center bg-black text-white"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <div className="shadow-lg shadow-indigo-500/50 mt-4 mb-4 p-4">
        <div className="flex">
          <Stage stage={stage} />

          <aside className="w-1/3m ml-10 flex flex-col items-center">
            <div className="w-full">
              {gameOver ? (
                <Display text={"GAME OVER"} />
              ) : (
                <>
                  <Display text={`Score: ${score}`} />
                  <Display text={`Rows: ${rows}`} />
                  <Display text={`Level: ${level}`} />
                </>
              )}
            </div>
            <StartButton callback={startGame} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Tetris;
