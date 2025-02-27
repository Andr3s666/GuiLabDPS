import React from 'react';

export default function ResumenReserva({ reservas }) {
    return (
        <div className="mt-4">
            <h3>Resumen de Reservas</h3>
            {reservas.length === 0 ? (
                <p>No hay reservas realizadas.</p>
            ) : (
                <ul className="list-group">
                    {reservas.map((reserva, index) => (
                        <li key={index} className="list-group-item">
                            Cancha {reserva.numero} - {reserva.deporte}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
