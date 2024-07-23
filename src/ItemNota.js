import React from "react";

function ItemNota(props) {
    return (
        <div className="col-3">
            <div 
                className={props.importante ? "nota_importante" : "nota"}
                style={{ transform: `rotate(${props.rotation}deg)`, transition: 'transform 0.5s' }} // Aplicar rotación
            >
                <h4>{props.titulo}</h4>
                <p>{props.nota}</p>
            </div>
        </div>
    );
}

export default ItemNota;
