import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./forgotPassword.css"

const apiUrl = process.env.REACT_APP_API_URL;

export default class ForgotPassword extends Component {

    state = {
        title: '',
        incorrect_err: false,
        all_ok: false,
        empty_err: false
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
        this.setState({
            all_ok: false
        });
    };

    resetpass = () => {
        const { newPassword, confirmPassword } = this.state;
        const passwords = {
            newPassword,
            confirmPassword
        }
        if (!newPassword || !confirmPassword) {
            this.setState({
                empty_err: true
            });
            return;

        }
        const body = JSON.stringify(passwords);
        fetch(`${apiUrl}/api/v1/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        })
            .then((res) => res.json())
            .then(response => {
                if (response.message === "success") {
                    // window.location.href = "/admin"
                    // this.props.history.push("/admin");
                    // this.setState({
                    //     fff: true
                    // });
                    this.setState({
                        all_ok: true
                    });
                    setTimeout(() => {
                        this.props.history.push("/admin");
                    }, 5000);
                }
                else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch((error) => {
                if (error) {
                    this.setState({
                        incorrect_err: true
                    });
                }
            })
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push("/admin");
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.incorrect_err) {
            toast.error("Пароли не совпадают", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
        if (this.state.all_ok) {
            toast.success("Пароль изменен", {
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
            toast.error("Пароли пустые", {
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
                    <h2>Сбросить пароль</h2>
                    <form action="">
                        <div class="inputBox">
                            <input type="password" required=""
                                name="newPassword"
                                onKeyDown={this.handleKeyDown}
                                onChange={this.handleChange}
                            />
                            <label for="">Пароль</label>
                        </div>
                        <div class="inputBox">
                            <input type="password" required=""
                                name="confirmPassword"
                                onKeyDown={this.handleKeyDown}
                                onChange={this.handleChange}
                            />
                            <label for="">Подтвердить пароль</label>
                        </div>
                        <input type="button" name="" id="" value="Сбросить пароль"
                            onClick={this.resetpass}
                        />

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