import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from 'uuid';
import ItemNota from "./ItemNota";

function ListaNotas() {
    const [notas, setNotas] = useState([]);
    const notaRef = useRef();
    const tituloRef = useRef();
    const importanteRef = useRef();
    const [error, setError] = useState('');

    const KEY = 'notas-evaluacion-cuatro';

    useEffect(() => {
        const misNotas = JSON.parse(localStorage.getItem(KEY));
        if (misNotas) {
            setNotas(misNotas);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(notas);
        localStorage.setItem(KEY, json);
    }, [notas]);

    const agregarNota = () => {
        const nota = notaRef.current.value.trim();
        const titulo = tituloRef.current.value.trim();
        const importante = importanteRef.current.checked;

        // Validaciones
        if (nota === '') {
            setError('La descripción es obligatoria.');
            return;
        }

        if (titulo.length < 3) {
            setError('El título debe tener al menos 3 caracteres.');
            return;
        }

        // Limpiar el mensaje de error si las validaciones son exitosas
        setError('');

        // Generar un ángulo de rotación aleatorio entre -15 y 15 grados
        const rotation = Math.floor(Math.random() * 31) - 15;

        setNotas((prev) => {
            const nuevaNota = {
                id: uuid(),
                nota: nota,
                titulo: titulo,
                color: importante ? 'red' : 'yellow',
                importante: importante,
                rotation: rotation // Añadir la rotación a la nueva nota
            }
            return [...prev, nuevaNota];
        });

        // Limpiar los campos después de agregar la nota
        notaRef.current.value = '';
        tituloRef.current.value = '';
        importanteRef.current.checked = false;
    }

    const eliminarUltimaNota = () => {
        setNotas((prev) => {
            const nuevasNotas = [...prev];
            nuevasNotas.pop();
            return nuevasNotas;
        });
    }

    return (
        <>
        <h1><b>Simulador de notas</b></h1>
        <div className="my-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-3">
                    <input ref={tituloRef} className="form-control" placeholder="Título"></input>
                </div>
                <div className="col-md-4 col-12 mb-3">
                    <input ref={notaRef} className="form-control" placeholder="Descripción - este campo es obligatorio" required></input>
                </div>
                <div className="col-md-2 col-6 mb-3">
                    <div className="form-check">
                        <input ref={importanteRef} id="importante_caja" className="form-check-input" type="checkbox"></input>
                        <label htmlFor="importante_caja" className="form-check-label">Importante!</label>
                    </div>
                </div>
                <div className="col-md-1 col-6 mb-3 d-flex justify-content-center">
                    <button onClick={agregarNota} className="btn btn-dark">AGREGAR</button>
                </div>
                <div className="col-md-2 col-6 mb-3 d-flex justify-content-center">
                    <button onClick={eliminarUltimaNota} className="btn btn-danger">ELIMINAR ÚLTIMA NOTA</button>
                </div>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
        <div className="mx-5">
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {notas.map((t) => (
                    <div className="col" key={t.id}>
                        <ItemNota 
                            nota={t.nota} 
                            titulo={t.titulo} 
                            importante={t.importante} 
                            rotation={t.rotation} // Pasar la rotación a ItemNota
                        />
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default ListaNotas;
