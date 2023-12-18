/*
*2C = Two of clubs
*2H = Two of hearts
*2D = Two of diamonds
*2S = Two of spades
*/

let deck            = [];
const tipos         = ['C', 'D', 'H', 'S'];
const especiales    = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');
// Esta función crea un nuevo deck

const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        
        for( let tipo of tipos ) {
            deck.push( i + tipo );
        }
        
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo );
        }
    }
     
    deck = _.shuffle( deck );    
    return deck;
}

crearDeck();

// Esta función permite tomar una carta

const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);

    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

}

const valor = valorCarta( pedirCarta() );

// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valor( carta );
    puntosHTML[0].innerText = puntosJugador;

    

})