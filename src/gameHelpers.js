// ancho del stage
export const STAGE_WIDTH = 12;
// altura del stage
export const STAGE_HEIGHT = 20;

// array de 2d para la cuadricula del juego
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );


export const checkCollition = (player, stage, {x: moveX, y: moveY}) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[0].length; x += 1) {
      
      // revisar si estamos en una celda de objeto / check if we´re on an actual tetromino cell

      if(player.tetromino[y][x] !== 0){
        // validar si el movimiendo es posible dentro del area de juego 
        // check if movement is available in the stage
        if(
        // colision del objeto en y // check object collision in y
        !stage[y + player.pos.y + moveY] ||
        // colision del objeto en x // check object collision in x
        !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
        // validar el estado de la celda // check cell state
        stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ){
          return true
        }

      }
      
    }
    
  }
}
