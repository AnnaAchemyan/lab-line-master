import React, { Component } from "react";
import RightFooter from "../Main/RightFooter/RightFooter";
import { NavLink } from 'react-router-dom';
import "./navStyle.css";
import logo from '../../Img/logo.png';
import { Link as Links } from 'react-scroll';

export default class Nav extends Component {
    state = {
        openRightFooter: false,
        openMenu: false,
        nav:false
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',null);
    }

    handleScroll= () => {
        if (window.pageYOffset > 140) {
            if(!this.state.nav){
                this.setState({ nav: true });
            }
        }else{
            if(this.state.nav){
                this.setState({ nav: false });
            }
        }
    }

    toggleRightFooter = () => {
        this.setState({
            openRightFooter: !this.state.openRightFooter
        })
    };

    toggleOpenMenu = () => {
        this.setState({
            openMenu: !this.state.openMenu
        })
    };

    toggleConfirmm = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }
    onCLoseMenu = () => {
        this.setState({
            openMenu: false
        })
    }

    render() {
        return (
            <>
                <div className={`nav ${this.state.nav && 'nav_fixed'}`}>
                    <div className="head">
                        <div className="logo" onClick={this.toggleConfirmm}>
                            <NavLink to='/'
                                exact
                            >
                                <img className="logoImg" src={logo} alt='img' />
                            </NavLink>
                        </div>
                        <div className="container">
                            <nav className="mainnav">
                                <div className="navItem">
                                    <Links activeClass='active_tab' to="home" spy={true} smooth={true} offset={0} duration={500} className="nav_link">
                                        ГЛАВНАЯ
                                        <div className="border border_activ"></div>
                                        <div className="border2 border2_activ"></div>
                                    </Links>
                                </div>
                                <div className="navItem">
                                    <Links activeClass='active_tab' to="about" spy={true} smooth={true} offset={0} duration={500} className="nav_link">
                                        О НАС
                                        <div className="border border_activ"></div>
                                        <div className="border2 border2_activ"></div>
                                    </Links>
                                </div>
                                <div className="navItem">
                                    <Links activeClass='active_tab' to="portfolio" spy={true} smooth={true} offset={0} duration={500} className="nav_link">
                                        ГАЛЕРЕЯ
                                        <div className="border border_activ"></div>
                                        <div className="border2 border2_activ"></div>
                                    </Links>
                                </div>
                                <div className="navItem">
                                    <Links activeClass='active_tab' to="contact" spy={true} smooth={true} offset={0} duration={500} >
                                        КОНТАКТЫ
                                        <div className="border border_activ"></div>
                                        <div className="border2 border2_activ"></div>
                                    </Links>
                                </div>
                            </nav>
                        </div>
                        <div className="humburgerMenu" onClick={this.toggleRightFooter}>
                            <div className="humburgerMenu_icon">
                                <div className="a"></div>
                                <div className="b"></div>
                                <div className="c"></div>
                                <div className="d"></div>
                            </div>
                        </div>
                        <div className="mediahumburgerMenu" onClick={this.toggleOpenMenu}>
                            <div className="humburgerMenu_icon">
                                <div className="a"></div>
                                <div className="b"></div>
                                <div className="c"></div>
                                <div className="d"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className={`mediaNav ${this.state.openMenu ? "openNav" : ""}`} >
                    <div className={`medianavItem navItem ${this.state.openMenu ? "openItem" : ""}`} >
                        <Links activeClass='active_tab' to="home" spy={true} smooth={true} offset={0} duration={500} className="nav_link">
                        ГЛАВНАЯ
                            <div className="border border_activ"></div>
                            <div className="border2 border2_activ"></div>
                        </Links>
                    </div>
                    <div className={`medianavItem navItem ${this.state.openMenu ? "openItem" : ""}`} >
                        <Links activeClass='active_tab' to="about" spy={true} smooth={true} offset={0} duration={500} className="nav_link">
                            О НАС
                            <div className="border border_activ"></div>
                            <div className="border2 border2_activ"></div>
                        </Links>
                    </div>
                    <div className={`medianavItem navItem ${this.state.openMenu ? "openItem" : ""}`} >
                        <Links activeClass='active_tab' to="portfolio" spy={true} smooth={true} offset={0} duration={500} className="nav_link">
                            ГАЛЕРЕЯ
                            <div className="border border_activ"></div>
                            <div className="border2 border2_activ"></div>
                        </Links>
                    </div>
                    <div className={`medianavItem navItem ${this.state.openMenu ? "openItem" : ""}`} >
                        <Links activeClass='active_tab' to="contact" spy={true} smooth={true} offset={0} duration={500} >
                            КОНТАКТЫ
                            <div className="border border_activ"></div>
                            <div className="border2 border2_activ"></div>
                        </Links>
                    </div>
                </nav>
                <RightFooter
                    onCLose={this.toggleRightFooter}
                    className={this.state.openRightFooter}
                />
                <div
                    className={`${this.state.openMenu ? "modal-backdrop" : ""}`}
                    onClick={this.onCLoseMenu}
                >
                </div>
            </>
        )
    }
}