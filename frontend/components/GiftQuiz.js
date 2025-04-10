// components/GiftQuiz.js
import { useState, useEffect } from 'react';

export default function GiftQuiz() {
    // Define quiz questions
    const questions = [
        {
            question: "What is the occasion?",
            options: ["Birthday", "Anniversary", "Graduation", "Just Because"],
        },
        {
            question: "What is your budget range?",
            options: ["Below £500", "£500 - £1000", "£1000 - £5000", "Above £5000"],
        },
        {
            question: "What style do you prefer?",
            options: ["Classic", "Modern", "Vintage", "Minimalist"],
        },
        {
            question: "How bold do you want the jewelry to be?",
            options: ["Subtle", "Moderate", "Bold"],
        },
        {
            question: "Would you like the gift to be personalized?",
            options: ["Yes", "No"],
        },
    ];

    // Quiz states
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(""));
    const [quizFinished, setQuizFinished] = useState(false);

    // Diamond data
    const [allDiamonds, setAllDiamonds] = useState([]);
    const [randomSuggestions, setRandomSuggestions] = useState([]);

    // Fetch diamonds on mount
    useEffect(() => {
        fetchAllDiamonds();
    }, []);

    const fetchAllDiamonds = async () => {
        try {
            const res = await fetch('http://localhost:5000/diamonds/public');
            if (res.ok) {
                const data = await res.json();
                setAllDiamonds(data);
            } else {
                console.error('Failed to fetch diamonds for random suggestions');
            }
        } catch (error) {
            console.error('Error fetching diamonds:', error);
        }
    };

    // Handle option change
    const handleOptionChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = e.target.value;
        setAnswers(updatedAnswers);
    };

    // Navigate next
    const handleNext = () => {
        if (!answers[currentQuestion]) {
            alert("Please select an option!");
            return;
        }
        setCurrentQuestion((prev) => prev + 1);
    };

    // Navigate previous
    const handlePrev = () => {
        setCurrentQuestion((prev) => prev - 1);
    };

    // Submit quiz => pick random diamonds
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all answered
        if (answers.some((answer) => answer === "")) {
            alert("Please answer all questions before submitting.");
            return;
        }

        // Mark quiz as finished
        setQuizFinished(true);

        // Pick 3 random diamonds from allDiamonds
        if (allDiamonds.length > 0) {
            const randoms = getRandomSubset(allDiamonds, 3);
            setRandomSuggestions(randoms);
        } else {
            setRandomSuggestions([]);
        }
    };

    // Helper to pick random subset from an array
    function getRandomSubset(array, n) {
        if (array.length <= n) return array;
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    return (
        <div className="gift-quiz">
            <h2>Take Our Gift Quiz</h2>
            {!quizFinished ? (
                <form onSubmit={handleSubmit}>
                    <div className="question">
                        <p className="question-text">
                            {questions[currentQuestion].question}
                        </p>
                        <div className="options">
                            {questions[currentQuestion].options.map((option, idx) => (
                                <label key={idx} className="option-label">
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion}`}
                                        value={option}
                                        checked={answers[currentQuestion] === option}
                                        onChange={handleOptionChange}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="quiz-controls">
                        {currentQuestion > 0 && (
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="quiz-btn prev-btn"
                            >
                                Previous
                            </button>
                        )}
                        {currentQuestion < questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="quiz-btn next-btn"
                            >
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="quiz-btn submit-btn">
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <div className="results">
                    <p>Thank you for completing the quiz! Here are some random picks you might like:</p>
                    {randomSuggestions.length > 0 ? (
                        <div className="suggestions-grid">
                            {randomSuggestions.map((diamond) => (
                                <div key={diamond.id} className="suggestion-item">
                                    <img
                                        src={diamond.imageUrl || '/images/diamond-placeholder.jpg'}
                                        alt={diamond.title}
                                    />
                                    <h4>{diamond.title}</h4>
                                    <p>{diamond.carat} ct - £{diamond.price}</p>
                                    <p>Cut: {diamond.cut || 'N/A'} | Clarity: {diamond.clarity || 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No diamonds found. Please try again later.</p>
                    )}
                </div>
            )}

            <style jsx>{`
        .gift-quiz {
          max-width: 500px; /* smaller, centered */
          margin: 0 auto;   /* center horizontally */
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 20px;
          margin-top: 30px;
          font-family: 'Open Sans', sans-serif;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        h2 {
          text-align: center;
          font-family: 'EB Garamond', serif;
          font-size: 28px;
          margin-bottom: 20px;
          color: #a67c52;
        }
        .question-text {
          font-size: 18px;
          margin-bottom: 15px;
        }
        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 15px;
        }
        .option-label {
          font-size: 16px;
          color: #333;
          cursor: pointer;
        }
        .quiz-controls {
          display: flex;
          justify-content: space-between;
        }
        .quiz-btn {
          padding: 8px 16px;
          background: #a67c52;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .quiz-btn:hover {
          background: #8c6234;
        }
        .results p {
          font-size: 16px;
          margin-bottom: 15px;
        }
        .suggestions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .suggestion-item {
          text-align: center;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 10px;
          background: #fff;
        }
        .suggestion-item img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .suggestion-item h4 {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .suggestion-item p {
          font-size: 14px;
          margin: 2px 0;
        }
      `}</style>
        </div>
    );
}
