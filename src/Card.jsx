import './App.css';

const Card = ({key,src}) => {
    console.log()
    return (
    
        <img class="stack-cards__item" src={src} key={key}  alt="" />
     
        
     )}

export default Card;