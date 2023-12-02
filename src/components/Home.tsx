import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Quote {
    author: string;
    category: string;
    text: string;
}

const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://controll-17843-default-rtdb.europe-west1.firebasedatabase.app/quotes.json');
                if (response.data) {
                    const quotesArray: Quote[] = Object.values(response.data);
                    setQuotes(quotesArray);
                }
            } catch (error) {
                console.error('Ошибка при получении цитат:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Цитаты</h2>
            <ul>
                {quotes.map((quote, index) => (
                    <li key={index}>
                        <p><strong>Author:</strong> {quote.author}</p>
                        <p><strong>Category:</strong> {quote.category}</p>
                        <p><strong>Text:</strong> {quote.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quotes;
