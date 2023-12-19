/*
*2C = Two of clubs
*2H = Two of hearts
*2D = Two of diamonds
*2S = Two of spades
*/

(() =>{
    let deck            = [];
    const tipos         = ['C', 'D', 'H', 'S'];
    const especiales    = ['A', 'J', 'Q', 'K'];
    
    let puntosJugador = 0,
        puntosComputadora = 0;
    
    // Referencias del HTML
    // Buttons
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevo');
    
    // Render cards
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    
    // Assign points
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
    
    // Turno de la computadora
    
    const turnoComputadora = ( puntosMinimos ) => {
    
        do {
    
        const carta = pedirCarta();
        
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
    
        // <!-- <img class="carta" src="assets/cartas/2C.png"> -->
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasComputadora.append( imgCarta );
    
        if( puntosMinimos > 21 ) {
            break;
        }
    
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    
    
        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if ( puntosComputadora > 21 ) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 10)
    
    }
    
    const valor = valorCarta( pedirCarta() );
    
    // Eventos
    
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta( carta );
        puntosHTML[0].innerText = puntosJugador;
    
        // <!-- <img class="carta" src="assets/cartas/2C.png"> -->
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasJugador.append( imgCarta );
    
        if( puntosJugador > 21 ) {
            console.warn( 'Lo siento, perdiste' );
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if( puntosJugador === 21 ) {
            console.warn( '21, genial!!!' );
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }
    
    })
    
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    })
    
    btnNuevoJuego.addEventListener('click', () => {
    
        console.clear();
    
        deck = [];
        deck = crearDeck();
    
        puntosJugador = 0;
        puntosComputadora = 0;
    
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
    
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
    
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    
    });
})();