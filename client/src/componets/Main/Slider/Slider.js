import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderStyle.css"
import { Link } from "react-router-dom";
import rev_img from '../../../Img/rev-img.png'
import bg1 from '../../../Img/bg1.jpg'
import bg2 from '../../../Img/bg2.jpg'
import bg3 from '../../../Img/bg3.jpg'
import { Parallax } from 'react-parallax';
import { Element } from 'react-scroll'

export default class SliderCarousel extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    go() {
        this.props.history.push('/portfolio');
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 5000,
            appendDots: dots => (
                <div className="numbers">
                    <ul style={{ margin: "0px" }}> {dots} </ul>
                </div>
            ),
            customPaging: i => (
                <div
                    className="slide_num"
                >
                    {i + 1}
                    <div className="slide_num_border">
                        <div className="num_border"></div>
                        <div className="num_border"></div>
                    </div>
                </div>
            )
        };

        return (
            <Element className="slider" name="home">
                <div className="buttons">
                    <div className="button1" onClick={this.previous}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enableBackground="new 0 0 25.109 34.906" xmlSpace="preserve">
                            <polyline fill="none" stroke="currentColor" strokeMiterlimit="10" points="24.67,34.59 11.653,17.464 24.67,0.338 "></polyline>
                            <polyline fill="none" className="eltdf-popout" stroke="currentColor" strokeMiterlimit="10" points="13.688,34.59 0.671,17.464 13.688,0.338 "></polyline>
                        </svg>
                    </div>
                    <div className="button2" onClick={this.next}>
                        <svg className="rightarrow" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enableBackground="new 0 0 25.109 34.906" xmlSpace="preserve">
                            <polyline fill="none" stroke="currentColor" strokeMiterlimit="10" points="24.67,34.59 11.653,17.464 24.67,0.338 "></polyline>
                            <polyline fill="none" className="eltdf-popout" stroke="currentColor" strokeMiterlimit="10" points="13.688,34.59 0.671,17.464 13.688,0.338 "></polyline>
                        </svg>
                    </div>

                </div>
                <Slider ref={c => (this.slider = c)} {...settings}>
                    <Parallax bgImage={bg1} strength={200} className="slide1" >
                        <div className="slide_main">
                            <p className="sub_title">Высокое качество зуботехнических работ</p>
                            <div className="title">
                                <img className="leftRight_img leftRight_img1" src={rev_img} alt='img'/>
                                <div className="page_name">
                                    <h1 className="title_text">ЗУБОТЕХНИЧЕСКАЯ ЛАБОРАТОРИЯ</h1>
                                    <p className="title_text2">Lab Line</p>
                                </div>
                                <img className="leftRight_img" src={rev_img} alt='img'/>
                            </div>
                            <Link to="/portfolio"><button className="menu_button">
                                Примеры Работ
                                <span className="lineButton"></span>
                                <span className="lineButton2"></span>
                            </button>
                            </Link>
                        </div>
                    </Parallax>
                    <Parallax bgImage={bg2} strength={200} className="slide2">
                        <div className="slide_main">
                        <p className="sub_title">Высокое качество зуботехнических работ</p>
                            <div className="title">
                                <img className="leftRight_img leftRight_img1" src={rev_img} alt='img' />
                                <div className="page_name">
                                    <p className="title_text">ЗУБОТЕХНИЧЕСКАЯ ЛАБОРАТОРИЯ</p>
                                    <p className="title_text2">Lab Line</p>
                                </div>
                                <img className="leftRight_img" src={rev_img} alt='img' />
                            </div>
                            <Link to="/portfolio"><button className="menu_button">
                                Примеры Работ
                                <span className="lineButton"></span>
                                <span className="lineButton2"></span>
                            </button>
                            </Link>
                        </div>
                    </Parallax>
                    <Parallax bgImage={bg3} strength={200} className="slide3">
                        <div className="slide_main">
                        <p className="sub_title">Высокое качество зуботехнических работ</p>
                            <div className="title">
                                <img className="leftRight_img leftRight_img1" src={rev_img} alt='img' />
                                <div className="page_name">
                                    <p className="title_text">ЗУБОТЕХНИЧЕСКАЯ ЛАБОРАТОРИЯ</p>
                                    <p className="title_text2">Lab Line</p>
                                </div>
                                <img className="leftRight_img" src={rev_img} alt='img' />
                            </div>
                            <Link to="/portfolio"><button className="menu_button">
                                Примеры Работ
                                <span className="lineButton"></span>
                                <span className="lineButton2"></span>
                            </button>
                            </Link>
                        </div>
                    </Parallax>
                </Slider>
            </Element>
        );
    }
}