import { useState } from 'react';

const NewQuotes = () => {
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = () => {
        console.log("Submitted:", { category, author, text });
        setCategory('');
        setAuthor('');
        setText('');
    };

    return (
        <div className="quote-card">
            <h3>Submit new quote</h3>
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
            <button onClick={handleSubmit}>Сохранить</button>
        </div>
    );
};

export default NewQuotes;
