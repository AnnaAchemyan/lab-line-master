import "./portfolioStyle.css"
import rev_img from '../../../Img/rev-img.png'
import portfolioLogo from '../../../Img/main-img-5.jpg'
import { Link } from "react-router-dom";
import { Element } from 'react-scroll'

export default function Portfolio() {
    return (
        <Element className="portfolioBlock" name="portfolio" >
            <div className="portfolioBlock_titleText">
                <div className="portfolioBlock_titleText_container">
                    <div className="portfolioTitles">
                        <div className="aboutUs_title">
                            <img className="leftRight_img" src={rev_img} alt='img' />
                            <p className="aboutUs_title_text portfolioHeadText">НАШИ РАБОТЫ</p>
                            <img className="leftRight_img" src={rev_img} alt='img' />
                        </div>
                        <div className="aboutUs_subTitle2">
                            <p className="aboutUs_title2_text">
                            Качество выполненных нашими зубными техниками работ лучше всего демонстрируют их фотографии</p>
                        </div>
                    </div>
                    <Link to="/portfolio">
                    <button className="menu_button portfolioUs_button">
                        Примеры Работ
                        <span className="lineButton"></span>
                        <span className="lineButton2"></span>
                    </button>
                    </Link>
                </div>
            </div>
            <div className="portfolioBlock_imig">
                <img src={portfolioLogo} alt='img' />
            </div>
        </Element>
    )
}