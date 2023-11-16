const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray){
        this._field = fieldArray;
    }

    print() {  
        for (let row of this._field){
        console.log(row.join(' '));
      }
    }
    
    playGame() {
      let y = 0;
      let x = 0;

      //Prints Current Field
      myField.print();

      while(this._field[y][x] === pathCharacter || this._field[y][x] === fieldCharacter){
         let userInput = prompt('Which Direction? : ');
         if(userInput === 'l' && x === 0){
                console.log("You cannot move left from this point.");
         } else if( userInput === 'l') {
                this._field[y][x] = fieldCharacter;
                x -= 1; 
         } else if(userInput === 'r' && x > this._field.length - 2){
                console.log('You cannot move right from this point.');
         } else if(userInput === 'r'){
                 this._field[y][x] = fieldCharacter;
                 x += 1;
         } else if(userInput === 'u' &&  y === 0){
                console.log("You cannot move up from this point.");
         } else if( userInput === 'u'){
                this._field[y][x] = fieldCharacter;
                y -= 1;
         } else if(userInput === 'd' && y > this._field.length - 2){
                console.log("You cannot move down from this point.");
         } else if (userInput === 'd'){
                this._field[y][x] = fieldCharacter;
                y += 1;
         } else {
                console.log("Unaible to move");
         }

        
        if(this._field[y][x] === hat){
            console.log("You found the hat! You win!");
        } else if (this._field[y][x] === hole){
            console.log("You fell in a hole. Game Over");
        } else {
            this._field[y][x] = pathCharacter;
            this.print(this._field);
        }
     }
    }


    static generateField(height, width, holes){
      let newField = [];

      for (let i = 0; i < height; i++) {
            newField.push([]);
         for (let j = 0; j < height; j++) {
            newField[i].push(fieldCharacter);
         }
      }
      
      newField[0][0] = pathCharacter;

      let hatX = Math.floor(Math.random() * width);
      let hatY = Math.floor(Math.random() * height);
      newField[hatX][hatY] = hat;
      
      for(let k = holes; k > 0; k--){
         let holeX = hatX;
         let holeY = hatY;
         while (holeX === hatX) {
            holeX = Math.floor(Math.random() * width);     
         };
         while (holeY === hatY) {
            holeY = Math.floor(Math.random() * height);    
         };
         newField[holeX][holeY] = hole;    
      }
      return newField;
    }
}

const newFieldMain = Field.generateField(10, 10, 50);
const myField = new Field (newFieldMain);
myField.playGame();