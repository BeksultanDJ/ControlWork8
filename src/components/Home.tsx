import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
                <ul>
                    {quotes.map((quote) => (
                        <li key={quote.id}>
                            <p><strong>Author:</strong> {quote.author}</p>
                            <p><strong>Category:</strong> {quote.category}</p>
                            <p><strong>Text:</strong> {quote.text}</p>
                            <button onClick={() => handleDelete(quote.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Quotes;
