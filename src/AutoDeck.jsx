// Change the behavior of the app, so that when you click on the button, rather than drawing a single card, the page will draw one card every second.

// These draws will continue until you press the button again, or until the deck has been exhausted (at which point the alert message from Part 1 should appear). Make sure to change the button text appropriately as well (for example, it could toggle between “Start drawing” and “Stop drawing.”

import {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";
import './App.css';


const Autodeck = () => {
    const url = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

  
    const [running, setRunning] = useState(true);
    const [deck, setDeck] = useState();
    // const [card, setCard] = useState(null);
    const [cards, setCards] = useState([]);
    const timerId = useRef();
    const drawUrl = `http://deckofcardsapi.com/api/deck/${deck}/draw/?deck_count=1`
    useEffect(() => {
        async function fetchDeck() {
            const response = await axios.get(url);
            setDeck(response.data.deck_id);
        }
        fetchDeck();
    }, [url]);

  const stopDraw = () => {
        clearInterval(timerId.current);
        setRunning(false)
    
    }

    function getCard() {
        async function fetchCard() {
            console.log(deck)
            const response = await axios.get(drawUrl);
            let newCard = [response.data.cards[0].image]
            
            setCards(cards => cards.concat(newCard))
            setRunning(true)
        }
        fetchCard();
        }

    useEffect(() => {
        // timerId.current = setInterval(getCard, 1000);
        timerId.current = setInterval(() => {
            getCard();}, 1000);
        return () => clearInterval(timerId.current);


    }, [getCard]);

  
   //I cheated for fresh deck and just refreshed page though I would prefer to do it without resfreshing
   function refreshPage() {
    window.location.reload(false);
  }

    return (
        <div>
            { running  ?  <button onClick={stopDraw}>Stop Draw Automate</button> : <div>
            <button onClick={getCard}> Start Draw</button>
            </div>
            }
            {cards.length == 52 ? <div><h1>Error: deck is full!</h1>
            <button onClick={refreshPage}>New Deck</button>
            </div>
            : null
            }
            
       
             <div class="stack-cards">{cards.map((card, i) => (
                
                    <Card key={i} src={card} />
                ))}</div> 
                
        </div>)
}

export default Autodeck;
