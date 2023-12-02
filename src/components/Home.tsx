import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";

interface Quote {
    id: string;
    author: string;
    category: string;
    text: string;
}

const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes.json');
            if (response.data) {
                const quotesArray: Quote[] = Object.entries(response.data).map(([id, quote]: [string, any]) => ({
                    id,
                    ...quote,
                }));
                setQuotes(quotesArray);
            }
        } catch (error) {
            console.error('Ошибка при получении цитат:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`);
            const updatedQuotes = quotes.filter(quote => quote.id !== id);
            setQuotes(updatedQuotes);
        } catch (error) {
            console.error('Ошибка при удалении цитаты:', error);
        }
    };

    return (
        <div>
            <div className="container">
                <h2>Цитаты</h2>
                    {quotes.map((quote) => (
                        <div className="quoteCard" key={quote.id}>
                            <div>
                                <p>"{quote.text}"</p>
                                <p>— {quote.author}</p>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(quote.id)}>Удалить</button>
                                <button className="cardBtn"><NavLink className="cardLinks" to="/:id/EditQuote">Edit Quote</NavLink></button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Quotes;
