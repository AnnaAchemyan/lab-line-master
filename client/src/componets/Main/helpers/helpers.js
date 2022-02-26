import React from 'react';
import "./helpersStyle.css"

export function Helpers() {

    function toggleConfirmm(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }
    return (
        <div className="topScrol" onClick={toggleConfirmm}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43.047px" height="43.031px" viewBox="0 0 43.047 43.031" enableBackground="new 0 0 43.047 43.031" xmlSpace="preserve">
                <circle fill="none" stroke="#BC9A6B" strokeMiterlimit="10" cx="21.523" cy="21.531" r="20.986"></circle>
                <circle fill="none" stroke="#BC9A6B" className="eltdf-popout" strokeMiterlimit="10" cx="21.523" cy="21.531" r="16.049"></circle>
                <polyline fill="none" stroke="#BC9A6B" strokeMiterlimit="10" points="15.205,23.875 21.523,18.573 27.842,23.875 "></polyline>
            </svg>
        </div>

    )
}

export function LineLeft(){
    return (
        <div className="left_line"></div>
    )
}
export function LineRight(){
    return (
        <div className="right_line"></div>
    )
}