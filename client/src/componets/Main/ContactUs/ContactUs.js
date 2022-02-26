import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./contactUsStyle.css"
import rev_img from '../../../Img/rev-img.png'
import footerLogo from '../../../Img/logo.png'
import { Element } from 'react-scroll'
import { NavLink } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

export default class ContactUs extends Component {
    state = {
        title: '',
        er: false,
        all_ok: false,
        empty_err: false,
        nomail: false,
        en: ''
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.emaailSend();
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        this.setState({
            er: false
        });
        this.setState({
            empty_err: false
        });
        this.setState({
            all_ok: false
        });
        this.setState({
            nomail: false
        });
    };

    emaailSend = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const { name, email, message } = this.state;
        const messages = {
            name,
            email,
            message
        }
        if (!name || !email || !message) {
            this.setState({
                empty_err: true
            });
            return;

        }
        if(regex.test(email) === false){
            this.setState({
                nomail: true
            });
            return;
        }
        const body = JSON.stringify(messages);
        fetch(`${apiUrl}/api/v1/sent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        })
            .then((res) => res.json())
            .then(response => {
                if (response.message === "success") {
                    this.setState({
                        all_ok: true,
                        name: '',
                        email: '',
                        message: ''
                    });
                }
                else {
                    this.setState({
                        en: response.message,
                        er: true

                    });
                }
            })
            .catch((error) => {

            })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.er){
            toast.error(this.state.en, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
        if(this.state.all_ok){
            toast.success("Сообшение отпровлено", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if(this.state.nomail){
            toast.error("Неверный адрес электронной почты!\"", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if(this.state.empty_err){
            toast.error("Пожалуйста, заполните все поля", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }

render(){
        return (
            <Element className="contact" name="contact">
                <div className="container">
                    <div className="aboutUs_background_lines">
                        <div className="aboutUs_line">
                        </div>
                        <div className="aboutUs_line">
                        </div>
                        <div className="aboutUs_line">
                        </div>
                        <div className="aboutUs_line">
                        </div>
                    </div>
                    <div className="footer_contact">
                        <div className="footer_headText">
                            <div className="footer_title">
                                <img className="leftRight_img" src={rev_img} alt='img' />
                                <p className="footer_title_text">
                                    КОНТАКТЫ
                                </p>
                                <img className="leftRight_img" src={rev_img} alt='img' />
                            </div>
                        </div>
                        <div className="footerBlocks">
                            <div className="contactUs">
                                <div className="footer_subTitle">
                                    <p className="footer_susubTitle_text">
                                    Остались вопросы? Задайте прямо сейчас:
                                    </p>
                                </div>
                                <form>
                                    <input
                                        type="text"
                                        id="fname"
                                        name="name"
                                        placeholder="Имя"
                                        onKeyDown={this.handleKeyDown}
                                        onChange={this.handleChange}
                                        value= {this.state.name}
                                    />
                                    <input
                                        type="email"
                                        id="lname"
                                        name="email"
                                        placeholder="Мейл"
                                        onKeyDown={this.handleKeyDown}
                                        onChange={this.handleChange}
                                        value= {this.state.email}
                                    />
                                    <textarea
                                        id="subject"
                                        name="message"
                                        placeholder="Сообшение"
                                        onKeyDown={this.handleKeyDown}
                                        onChange={this.handleChange}
                                        value= {this.state.message}
                                    >
                                </textarea>
                                    <button
                                        type="button"
                                        className="menu_button contactUs_button"
                                        onClick={this.emaailSend}
                                    >
                                        Отправить
                                        <span className="lineButton contact_lineButton1"></span>
                                        <span className="lineButton2 contact_lineButton2"></span>
                                    </button>
                                </form>
                            </div>
                            <div className="moreUs">
                                <div className="footer_subTitle">
                                    <p className="footer_susubTitle_text">
                                    Найдите Нас
                                    </p>
                                </div>
                                <div className="logo">
                                    <img className="logoImg" src={footerLogo} alt='img' />
                                </div>
                                <div className="adress">
                                    <p>Москва,Дмитровское шоссе 157 ст 9 </p>
                                    <p> Открыть: Пн-Сб 10.00-19.00</p>
                                    <p>+79999697979</p>
                                    <p>Labline178@gmail.com</p>
                                </div>
                                <div className="smm">
                                    <nav className="footNav">
                                        <div className="navItem footerNavItem">
                                            <a href="">FACEBOOK</a>
                                            <div className="footerBorder"></div>
                                            <div className="footerBorder"></div>
                                        </div>
                                        <div className="navItem footerNavItem">
                                            <a href="">INSTAGRAM</a>
                                            <div className="footerBorder"></div>
                                            <div className="footerBorder"></div>
                                        </div>
                                        <div className="navItem footerNavItem">
                                            <a href="">VKONTAKTE</a>
                                            <div className="footerBorder"></div>
                                            <div className="footerBorder"></div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Element>
        )
    }
}