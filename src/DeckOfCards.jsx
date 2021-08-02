import {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";
import './App.css';


const DeckOfCards = () => {
    const url = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

  

    const [deck, setDeck] = useState();
    // const [card, setCard] = useState(null);
    const [cards, setCards] = useState([]);
    const drawUrl = `http://deckofcardsapi.com/api/deck/${deck}/draw/?deck_count=1`
    useEffect(() => {
        async function fetchDeck() {
            const response = await axios.get(url);
            setDeck(response.data.deck_id);
        }
        fetchDeck();
    }, [url]);

    function getCard() {
        async function fetchCard() {
            console.log(deck)
            const response = await axios.get(drawUrl);
            let newCard = [response.data.cards[0].image]
            
            setCards(cards => cards.concat(newCard))
        }
        fetchCard();
        }

   function test() {
       console.log(cards)
   }
   //I cheated for fresh deck and just refreshed page though I would prefer to do it without resfreshing
   function refreshPage() {
    window.location.reload(false);
  }

    return (
        <div>
            {cards.length < 51 ?  <button onClick={getCard}>Draw Card</button> : <div><h1>Error: no cards remaining!</h1>
            <button onClick={refreshPage}>New Deck</button>
            </div>
            }
            
            <button onClick={test} title="array of card sources in console">Test</button>
             <div class="stack-cards">{cards.map((card, i) => (
                
                    <Card key={i} src={card} />
                ))}</div> 
                
        </div>)
}

export default DeckOfCards;
