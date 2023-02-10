import { useState, useEffect} from "react";
import "./App.css";

const App = () => {

  const [quoteData = getRandomQuote(), setQuoteData] = useState({content: "", author: ""});
  const [currentColor, setCurrentColor] = useState("#000000");

  // load an initial quote
  useEffect(() => {
    getRandomQuote();
  }, []);

  useEffect(() => {
    getRandomColor();
  }, [quoteData])


  async function getRandomQuote() {
    const response = await fetch(`/api/random`);
    const quoteObj = await response.json();
    setQuoteData(quoteObj);
  };

  function getRandomColor() {
    const hexLetters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexLetters[Math.floor(Math.random() * 16)];
    }
    setCurrentColor(color);
  }
  
  const currentTextColorStyle = {
      color: currentColor,
      transition: "all 1.5s ease"
  };

  const currentBackgroundColorStyle = {
    backgroundColor: currentColor,
    transition: "all 1.5s ease"
  };

  return(
    <div id = "wrapper" style = {currentBackgroundColorStyle}>
      <div id="quote-box">
        <p id="text" style={currentTextColorStyle}>{'"' +quoteData.content + '"'}</p>
        <p id="author" style={currentTextColorStyle}>{quoteData.author}</p>
        <button 
          id="new-quote"
          onClick = {() => getRandomQuote()}
          style={currentBackgroundColorStyle}
        >
          New quote
        </button>
      </div>
    </div>
  );

};

export default App;