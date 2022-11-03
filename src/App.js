import React from "react";
import { useState, useEffect} from "react";
import "./App.css";


const App = () => {


  const [quoteData, setQuoteData] = useState({content: "", author: ""});
  const [currentColor, setCurrentColor] = useState("#000000");

  useEffect(() => {
    getRandomQuote();
  }, []);

  useEffect(() => {
    getRandomColor();
  }, [quoteData])


  async function getRandomQuote() {
    const response = await fetch("http://api.quotable.io/random");
    const quoteObj = await response.json();
    setQuoteData(quoteObj);
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setCurrentColor(color);
  }
  
  const textColorStyle = {
      color: currentColor,
      transition: "all 1.5s ease"
  };

  const backgroundColorStyle = {
    backgroundColor: currentColor,
    transition: "all 1.5s ease"
  };

  return(
    <div id = "wrapper" style = {backgroundColorStyle}>
      <div id="quote-box">
        <p id="text" style={textColorStyle}>{'"' +quoteData.content + '"'}</p>
        <p id="author" style={textColorStyle}>{quoteData.author}</p>
        <button 
          id="new-quote"
          onClick = {() => getRandomQuote()}
          style={backgroundColorStyle}
          >
            New quote
        </button>
      </div>
      <p id="developer-sign">by <a href="http://adamhrvth.dev">Adam Horvath</a></p>
    </div>
  );

};

export default App;