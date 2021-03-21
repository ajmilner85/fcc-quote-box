import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";


const QuoteBox = () => {
    
    const [ data, setData ] = useState(null);
    const [ isPending, setIsPending ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ random, setRandom ] = useState(null);

    useEffect(() => {
        setIsPending(true);
        fetch('http://localhost:8000/quotes')
        .then(response => {
            if(!response.ok){
                throw Error("Could not fetch data") ;
            } 
            return response.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            setRandom(Math.round(Math.random() * data.length));
            console.log(random);
        })
        .catch(err => {
            setIsPending(false);
            setError(err);
        })
    }, []);
    

    return ( 
        <div className="quote-box" id="quote-box">
            <div className="card-text">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon"/>
                {isPending && <span>Loading...</span>}
                {error && <span>{ error }</span>}
                {console.log(data)}
                {data && random && <span id="text">{ data[random].quote }</span>}
            </div>
            <div className="card-author">
                {data && <span id="author">- { data[random].author }</span>}
            </div>
            <div className="card-bottom">
                <a href="twitter.com/intent/tweet" id="tweet-quote"><FontAwesomeIcon icon={faTwitterSquare} /></a>
            <button id="new-quote" onClick={() => setRandom(Math.round(Math.random() * data.length))}>New Quote</button>
            </div>
        </div>
     );
}
 
export default QuoteBox;