import { useState } from 'react';

const NewQuotes = () => {
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    return (
        <div className="quote-card">
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
                placeholder="Quote text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <h3>Category: {category}</h3>
            <p>"{text}"</p>
            <p>- {author}</p>
        </div>
    );
};

export default NewQuotes;
