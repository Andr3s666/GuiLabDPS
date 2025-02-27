import React from 'react';
import Cancha from './Cancha';

export default function PlanoDeportivo({ deporte, reservas, setReservas }) {
    const canchas = Array.from({ length: 6 }, (_, i) => i + 1);
    
    const toggleReserva = (numero) => {
        // Verifica si la cancha ya está reservada en cualquier deporte
        const isReservada = reservas.some(r => r.numero === numero);
        
        if (isReservada) {
            alert('¡Esta cancha ya está reservada!');
            return; // No permite reservar si ya está ocupada
        }

        // Si no está reservada, se puede proceder con la reserva
        setReservas((prev) => {
            const index = prev.findIndex(r => r.numero === numero && r.deporte === deporte);
            if (index !== -1) {
                return prev.filter(r => !(r.numero === numero && r.deporte === deporte));
            } else {
                return [...prev, { numero, deporte }];
            }
        });
    };
    
    return (
        <div className="d-flex flex-wrap gap-2 justify-content-center">
            {canchas.map(numero => (
                <Cancha 
                    key={numero} 
                    numero={numero} 
                    deporte={deporte} 
                    reservada={reservas.some(r => r.numero === numero)} // Verifica si la cancha está reservada en cualquier deporte
                    toggleReserva={toggleReserva} 
                />
            ))}
        </div>
    );
}
