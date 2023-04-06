import { useState, useRef } from 'react'
import './App.scss'

const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

const fisherYates = (list: any[]) => {
       let limit = list.length - 1;
       while(limit > 0) {
              let position = random(0, limit);

              let tmp = list[position];
              list[position] = list[limit];
              list[limit] = tmp;

              limit--;
       }

       return list;
}

let resolved = true, dividingValue = 4

type CardType = {
	id: number
	matchValue: number
	flipped: boolean
	done: boolean
	back: string
}

function App() {
	const [cards, setCards] = useState<CardType[]>([])

	const [cardsDefined, setCardsDefined] = useState(false)

	const totalFlippedCards = useRef(0)
	const bothFlippedCards = useRef<CardType[]>([])
	const defineCardsRef = useRef<HTMLTextAreaElement>(null)

	const areTheFlippedCardsEqual = () => {
		let result = false
		if (bothFlippedCards.current[0].matchValue === bothFlippedCards.current[1].matchValue)
			result = true
		return result
	}

	const handleFlippedCards = () => {
		if (totalFlippedCards.current < 2) return
		resolved = false
		const newCards: CardType[] = JSON.parse(JSON.stringify(cards))
		if (!areTheFlippedCardsEqual()) {
			newCards.forEach(card => {
				bothFlippedCards.current.forEach(flippedCard => {
					if (card.id === flippedCard.id)
						card.flipped = false
				})
			})
			setTimeout(() => {
				setCards(newCards)
				resolved = true;
			}, 800)
		} else {
			newCards.forEach(card => {
				bothFlippedCards.current.forEach(flippedCard => {
					if (card.id === flippedCard.id) {
						card.flipped = true
						card.done = true
					}
				})
			})
			setCards(newCards)
			resolved = true
		}

		bothFlippedCards.current = []
		totalFlippedCards.current = 0
	}

	const flipCard = (id: number) => {
		if (totalFlippedCards.current >= 2 || bothFlippedCards.current.length >= 2 || !resolved) return

		const cardIndex = cards.findIndex(card => card.id === id)
		if (cardIndex === -1) return

		const card = cards[cardIndex]
		if (card.flipped) return

		const newCard = {...card, flipped: true}
		const newCards = [...cards.slice(0, cardIndex), newCard, ...cards.slice(cardIndex + 1)]
		setCards(newCards)

		totalFlippedCards.current++
		bothFlippedCards.current.push(card)

		handleFlippedCards()
	}

	const createCard = (id: number, matchValue: number, back: string) => {
		return {id, matchValue, flipped: false, done: false, back}
	}

	const createSetOfCards = () => {
		if (!defineCardsRef.current) return

		if (defineCardsRef.current.value === '') return false

		let definedCards = defineCardsRef.current.value.split(';')
		let newCards: CardType[] = []

		let currentMatchValue = 0, currentId = 0
		definedCards.forEach(card => {
			let currentCard = card.split(',')
			currentCard.forEach(value => {
				value = value.trim()
				newCards.push(createCard(currentId, currentMatchValue, value))
				currentId++
			})
			currentMatchValue++
		})

		return fisherYates(newCards)
	}

	const handlePlay = () => {
		const defaulltSetOfCards = fisherYates([
			{id: 0, matchValue: 0, flipped: false, done: false, back: 'Árvore'},
			{id: 1, matchValue: 0, flipped: false, done: false, back: 'Árvore'},
			{id: 2, matchValue: 1, flipped: false, done: false, back: 'Macaco'},
			{id: 3, matchValue: 1, flipped: false, done: false, back: 'Macaco'},
			{id: 4, matchValue: 2, flipped: false, done: false, back: 'Galho'},
			{id: 5, matchValue: 2, flipped: false, done: false, back: 'Galho'},
			{id: 6, matchValue: 3, flipped: false, done: false, back: 'Cachorro'},
			{id: 7, matchValue: 3, flipped: false, done: false, back: 'Cachorro'},
			{id: 8, matchValue: 4, flipped: false, done: false, back: 'Gato'},
			{id: 9, matchValue: 4, flipped: false, done: false, back: 'Gato'},
			{id: 10, matchValue: 5, flipped: false, done: false, back: 'Avião'},
			{id: 11, matchValue: 5, flipped: false, done: false, back: 'Avião'},
			{id: 12, matchValue: 6, flipped: false, done: false, back: 'Pássaro'},
			{id: 13, matchValue: 6, flipped: false, done: false, back: 'Pássaro'},
			{id: 14, matchValue: 7, flipped: false, done: false, back: 'Xícara'},
			{id: 15, matchValue: 7, flipped: false, done: false, back: 'Xícara'},
			{id: 16, matchValue: 8, flipped: false, done: false, back: 'Pato'},
			{id: 17, matchValue: 8, flipped: false, done: false, back: 'Pato'},
			{id: 18, matchValue: 9, flipped: false, done: false, back: 'Lagoa'},
			{id: 19, matchValue: 9, flipped: false, done: false, back: 'Lagoa'},
			{id: 20, matchValue: 10, flipped: false, done: false, back: 'Cisne'},
			{id: 21, matchValue: 10, flipped: false, done: false, back: 'Cisne'},
			{id: 22, matchValue: 11, flipped: false, done: false, back: 'Menino'},
			{id: 23, matchValue: 11, flipped: false, done: false, back: 'Menino'},
			{id: 24, matchValue: 12, flipped: false, done: false, back: 'Garota'},
			{id: 25, matchValue: 12, flipped: false, done: false, back: 'Garota'},
			{id: 26, matchValue: 13, flipped: false, done: false, back: 'Violão'},
			{id: 27, matchValue: 13, flipped: false, done: false, back: 'Violão'}
		])

		let result = createSetOfCards()

		if (!result) {
			dividingValue = 4
			setCards(defaulltSetOfCards)
		} else {
			if (result.length % 4 !== 0)
				dividingValue = 6
			setCards(result)
		}

		setCardsDefined(true)
	}

	return (
		<>
			{!cardsDefined &&
			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', minHeight: '40vh', minWidth: '700px'}}>
				<h1>Memory Game</h1>
				<p style={{maxWidth: '45ch', textAlign: 'justify'}}>The cards must be set in pairs: question, answer. Then, separate them using a semicolon. For example: question, answer; question, answer.</p>
				<textarea ref={defineCardsRef} style={{height: '200px', width: '100%', padding: '1rem', fontSize: '.75rem', textAlign: 'left'}} spellCheck="false" placeholder="Padrão: A,B;C,D;E,F" defaultValue="Acre,Rio Branco;Alagoas,Maceió;Amapá,Macapá;Amazonas,Manaus;Bahia,Salvador;Ceará,Fortaleza;Distrito Federal,Brasília;Espírito Santo,Vitória;Goiás,Goiânia;Maranhão,São Luiz;Mato Grosso,Cuiabá;Mato Grosso do Sul,Campo Grande;Minas Gerais,Belo Horizonte;Pará,Belém;Paraíba,João Pessoa;Paraná,Curitiba;Pernambuco,Recife;Piauí,Teresina;Rio de Janeiro,Rio de Janeiro;Rio Grande do Norte,Natal;Rio Grande do Sul,Porto Alegre;Rondônia,Porto Velho;Roraima,Boa Vista;Santa Catarina,Florianópolis;São Paulo,São Paulo;Sergipe,Aracajú;Tocantins,Palmas"></textarea>
				<button onClick={() => {handlePlay()}}>Play</button>
			</div>}
			{cardsDefined &&
			<div style={{display: 'grid', gridTemplateColumns: `repeat(${Math.round(cards.length / dividingValue)}, 1fr)`, gridGap: '10px'}}>
				<CardsGrid cards={cards} flipCard={flipCard}/>
			</div>}
		</>
	)
}

type CardsGridProps = {
	cards: CardType[]
	flipCard: (id: number) => void
}

function CardsGrid({cards, flipCard}: CardsGridProps) {
	return (
		<>
		{
			cards.map(card => {
				return <Card key={card.id} card={card} flipCard={flipCard}/>
			})
		}
		</>
	)
}

type CardProps = {
	card: CardType
	flipCard: (id: number) => void
}

function Card({card, flipCard}: CardProps) {
	return (
		<div className="flip">
			<div className="card" style={{transform: card.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}} onClick={ () => { flipCard(card.id) } }>
				<div className="front"></div>
				<div className="back" style={{outline: card.done ? '3px solid #E9F0C5' : 'none', backgroundColor: card.done ? '#E9F0C5' : 'none'}}>{card.back}</div>
			</div>
		</div>		
	)
}

export default App
