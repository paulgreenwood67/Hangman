//again I struggled with this task, I need to do futher reading of React and Redux. I have used this as a basis and adapted it https://codesandbox.io/s/70j5v5pq1

// imports
import React, { Component } from "react";
import { randomWord } from './Words';
import "../Custom.css";

//impost of images
import img1 from "../images/state1.GIF";
import img2 from "../images/state2.GIF";
import img3 from "../images/state3.GIF";
import img4 from "../images/state4.GIF";
import img5 from "../images/state5.GIF";
import img6 from "../images/state6.GIF";
import img7 from "../images/state7.GIF";
import img8 from "../images/state8.GIF";
import img9 from "../images/state9.GIF";
import img10 from "../images/state10.GIF";
import img11 from "../images/state11.GIF";

// Hangmen class
class Hangman extends Component {
 static defaultProps = {
    maxWrong: 10,
      images: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]
};
// setting the initial state
constructor(props) {
  super(props);
    this.state = { 
      nWrong: 0, 
        guessed: new Set(), 
       answer: randomWord() 
    };
        this.handleGuess = this.handleGuess.bind(this);
          this.resetGame = this.resetGame.bind(this);
}

// function reset the game
resetGame() {
  this.setState({
    nWrong: 0,
      guessed: new Set(),
        answer: randomWord()
    });
}

// function the get help
helpInfo(){
    alert("Please select letters to try and find the hidden word. If you select 10 incorrect letters you lose and it's, HANGMAN!")
}

// function to display the letters of the hidden word
guessedWord() {
  const {  answer, guessed } = this.state;
    return answer
      .split("")
      .map (ltr => (guessed.has(ltr) ? ltr : "_"));
     
  }

// function to sync the incorrect letter with the counter display
handleGuess(evt) {
  let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
        nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
}

// fumnction to creat the buttons
generateButtons() {
  const  { handleGuess } = this;
    const { guessed } = this.state;
      return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
        <button
          key={index}
          value={ltr}
          onClick={handleGuess}
          disabled={guessed.has(ltr)}
        >
        {ltr}
        </button>
    ));
  }

  
  //rendering the HTML
  render() {
    const { nWrong, answer} = this.state;
      const { images, maxWrong,} = this.props;
        let alternateText = `${this.state.nWrong} wrong guesses`;
          return (

            <div className='Hangman'>
              <h1>Hangman</h1>
                  <img src={images[nWrong]} alt={alternateText}/>
                    <p>You selected {nWrong} incorrect letters</p>
                      { answer === this.guessedWord().join("") ? <p><p>You WIN!</p>You found the hidden word - '{answer}'</p>  :
                        (nWrong === maxWrong ?
            <div>
              <p>HANGMAN! - you lose! </p>
                <p>The hidden word was - '{answer}'</p>
            </div>:
            <div>
              <p className='Hangman-word'>{this.guessedWord()}</p>
                <p className='Hangman-btns'id ="button">{this.generateButtons()}</p>
            </div>)
                    }
            <div className="resetDiv">
      <button id='reset' onClick={this.resetGame}>Reset</button>
      <p>|</p>
      <button className="helpButton" onClick={this.helpInfo}>Help</button>
            </div> 
          </div>
    );
  }
}
export default Hangman;