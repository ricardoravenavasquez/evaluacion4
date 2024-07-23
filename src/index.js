import React from 'react';
import ReactDOM from 'react-dom/client';
import ListaNotas from './ListaNotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='container pt-4'>
        <ListaNotas></ListaNotas>
    </div>
);