import { useState, useEffect } from 'react';
import Card from './Card';
import ConfettiExplosion from 'react-confetti-explosion';
import styles from '../styles/Home.module.css';

function Home() {
  const [deck, setDeck] = useState([
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
  ]);
  const [selected, setSelected] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0)
  const [comparison, setComparison] = useState([]);
  const [validated, setValidated] = useState([]);
  const [isWon, setIsWon] = useState(false);

  const shuffleDeck = () => {
    const shuffledDeck = deck.sort(() => Math.random() - 0.5) // Shuffle array using sort
    for (let i=0; i < shuffledDeck.length; i++) {
      delete shuffledDeck[i].id
      shuffledDeck[i].id = i+1
    }
    setDeck(shuffledDeck)
  }
  
  const selectCard = (id, name) => {
    /** Display card and set it for comparison */
    setSelected([...selected, id]);
    setSelectedCount(selectedCount + 1);
    setComparison([...comparison, name]);
  };

  const resetCards = () => {
    setSelected([])
    setComparison([])
    setSelectedCount(0)
    // setcomparisonCount(0)
  }

  const resetGame = () => {
    setIsWon(false)
    setValidated([])
    resetCards()
    setTimeout(shuffleDeck, 500) // delay to hide shuffling
  }
  
  /** Shuffle array when loading the page */{isWon &&<ConfettiExplosion />}
  useEffect(() => {
    shuffleDeck()
  }, [])

  /** Main Game logic */
  useEffect(() => {
    // Handle victory
    if (validated.length == 16) {
      setIsWon(true)
      setTimeout(resetGame, 2000)
    }

    // Handle matching pair
    if ((comparison.length === 2) && (comparison[0] === comparison[1])) {
      setValidated([...validated, selected[0], selected[1]])
    }

    // reset duo (except if selected)
    if (selectedCount === 2) {
      setTimeout(resetCards, 1000)
    }
  }, [selected])
  
  const cardsToDisplay = deck.map((card, index) => {
    return (
      <Card
        key={index}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={validated.includes(card.id) || selected.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Memory Game 🧠
        </h1>
        <div className={styles.headerDivider} />
          {isWon &&<ConfettiExplosion />}
      </div>


      <div className={styles.main}>
        {isWon &&<ConfettiExplosion />}        
      <div className={styles.grid}>
          {cardsToDisplay}
        </div>
        {isWon &&<ConfettiExplosion />}
      </div>
    </div>
  );
}

export default Home;
