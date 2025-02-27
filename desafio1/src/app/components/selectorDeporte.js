import React from 'react';

export default function SelectorDeporte({ deporte, setDeporte }) {
    const deportes = ['Fútbol', 'Baloncesto', 'Tenis'];

    return (
        <div className="mb-3">
            <label className="form-label">Selecciona un deporte:</label>
            <select 
                className="form-select"
                value={deporte}
                onChange={(e) => setDeporte(e.target.value)}
            >
                {deportes.map((d) => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>
        </div>
    );
}
