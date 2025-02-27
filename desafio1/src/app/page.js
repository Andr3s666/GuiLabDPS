'use client';

import { useState } from 'react';
import PlanoDeportivo from './components/PlanoDeportivo';
import SelectorDeporte from './components/selectorDeporte';
import ResumenReserva from './components/ResumenReserva';
import Cancha from './components/Cancha';

export default function Home() {
    const [deporte, setDeporte] = useState('Fútbol');
    const [reservas, setReservas] = useState([]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Reserva de Cancha</h1>
            <SelectorDeporte deporte={deporte} setDeporte={setDeporte} />
            <PlanoDeportivo deporte={deporte} reservas={reservas} setReservas={setReservas} />
            <ResumenReserva reservas={reservas} />
        </div>
    );
}
