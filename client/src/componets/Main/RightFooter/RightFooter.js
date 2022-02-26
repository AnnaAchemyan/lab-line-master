import "./rightFooterStyle.css"
import footerLogo from '../../../Img/lab-line-04.png'

export default function RightFooter(props) {
    return (
        <div
            className={`${props.className ? "modal-backdrop" : ""}`}
            onClick={props.onCLose}
        >
        <div
            className={`rightfooter ${props.className ? "ok" : ""}`}
            onClick={e => {
                e.stopPropagation();
            }}
        >
            <div className=" foothide">
                <div className="cross"
                    onClick={props.onCLose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.1 18.1" className="eltdf-menu-closer">
                        <line x1="0.4" y1="0.4" x2="17.7" y2="17.7" stroke="red" className="a"></line>
                        <line x1="0.4" y1="17.7" x2="17.7" y2="0.4" stroke="red"></line>
                    </svg>
                </div>
                <div className="logo">
                    <a href="#">
                        <img className="logoImg right_footer_logo" src={footerLogo} alt='img' />
                    </a>
                </div>
                <div className="adress right_footer_adress">
                    <p>Москва,Дмитровское шоссе 157 ст 9 </p>
                    <p> Открыть: Пн-Сб 10.00-19.00</p>
                    <p>+79999697979</p>
                    <p>Labline178@gmail.com</p>
                </div>
                <div className="smm">
                    <nav className="footerHide_links">
                        <div className="navItem footerNavItem">
                            <a href="">Facebook</a>
                            <div className="footerBorder"></div>
                            <div className="footerBorder"></div>
                        </div>
                        <div className="navItem footerNavItem">
                            <a href="">Instagram</a>
                            <div className="footerBorder"></div>
                            <div className="footerBorder"></div>
                        </div>
                        <div className="navItem footerNavItem">
                            <a href="">VKontakte</a>
                            <div className="footerBorder"></div>
                            <div className="footerBorder"></div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        </div>
    )
}