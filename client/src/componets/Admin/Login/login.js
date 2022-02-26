import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./login.css"

const apiUrl = process.env.REACT_APP_API_URL;

export default class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            incorrect_err: false,
            empty_err: false
        }
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.login();
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        this.setState({
            incorrect_err: false
        });
        this.setState({
            empty_err: false
        });
    };

    login = () => {
        const { password, email } = this.state;
        const tasks = {
            email,
            password
        }
        if (!password || !email) {
            this.setState({
                empty_err: true
            });
            return;
        }
        const body = JSON.stringify(tasks);
        fetch(`${apiUrl}/api/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        })
            .then((res) => res.json())
            .then(response => {
                if (response.message === "success") {
                    window.localStorage.setItem('token', response.token)
                    // window.location.href = "/admin"
                    this.props.history.push("/admin");
                }
                throw new Error('Network response was not ok.');
            })
            .catch((error) => {
                this.setState({
                    incorrect_err: true
                });
            })
    }

    resetpass = () => {
        fetch(`${apiUrl}/api/v1/email-forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(response => {
                if (response.message === "Email sent") {
                    toast.success("На вашу эл. почту отправлено сообщение", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((error) => {
            })

    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push("/admin");
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.incorrect_err) {
            toast.error("Эл. почта или пароль неверны", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
        if (this.state.empty_err) {
            toast.error("Эл. почта или пароль пустой", {
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

    render() {
        return (
            <div className="login">
                <div class="box">
                    <h2>Войти</h2>
                    <form action="">
                        <div class="inputBox">
                            <input
                                type="text"
                                required=""
                                name="email"
                                onKeyDown={this.handleKeyDown}
                                onChange={this.handleChange}
                            />
                            <label for="">Эл. почта</label>
                        </div>
                        <div class="inputBox">
                            <input
                                type="password"
                                required=""
                                name="password"
                                onKeyDown={this.handleKeyDown}
                                onChange={this.handleChange}
                            />
                            <label for="">Пароль</label>
                        </div>
                        <input
                            type="button"
                            name="" id=""
                            value="Войти"
                            onClick={this.login}
                        />
                        <div className="forgotpass">
                            <span
                                onClick={this.resetpass}
                            >Забыли пароль?</span>
                        </div>
                    </form>
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
            </div>
        )
    }
}