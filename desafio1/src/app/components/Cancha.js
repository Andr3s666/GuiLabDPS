import React from 'react';

export default function Cancha({ numero, reservada, toggleReserva }) {
    return (
        <button 
            className={`btn ${reservada ? 'btn-warning' : 'btn-primary'}`} 
            onClick={() => toggleReserva(numero)}
        >
            Cancha {numero}
        </button>
    );
}
