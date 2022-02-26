import React from 'react';
import "./notFoundStyle.css"
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
            <div className="errorpage">
                <h1>Error 404</h1>
                <p>Страница не найдена!</p>
                <div className="links">
                    <Link to="/" ><button className="openmodal">Вернуться на главную</button></Link>
                    <Link to="/portfolio" ><button className="openmodal">Вернуться на галерея</button></Link>
                </div>
            </div>
    )
}