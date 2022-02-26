import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./resetPassword.css"

const apiUrl = process.env.REACT_APP_API_URL;

export default class ResetPassword extends Component {

        state = {
            title: '',
            incorrect_err: false,
            all_ok: false,
            empty_err: false
            // en: ''
        }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.resetpass();
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
        const { oldPassword, newPassword, confirmPassword } = this.state;
        const passwords = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        if (!newPassword || !confirmPassword || !oldPassword) {
            this.setState({
                empty_err: true
            });
            return;

        }
        const body = JSON.stringify(passwords);
        fetch(`${apiUrl}/api/v1/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+  localStorage.getItem('token')

            },
            body: body
        })
            .then((res) => res.json())
            .then(response => {
                if (response.message === "success") {
                    this.setState({
                        all_ok: true
                    });
                    setTimeout(() => {
                        this.props.history.push("/admin");
                    }, 5000);
                }
                else {
                    this.setState({
                        incorrect_err: true
                    });
                }
            })
            .catch((error) => {

            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.incorrect_err){
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
        if(this.state.all_ok){
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
            <div className="login">
                <div class="box">
                    <h2>Изменить пароль</h2>
                    <form action="">
                        <div class="inputBox">
                            <input type="password" required=""
                                   name="oldPassword"
                                   onKeyDown={this.handleKeyDown}
                                   onChange={this.handleChange}
                            />
                            <label for="">Старый пароль</label>
                        </div>
                        <div className="inputBox">
                            <input type="password" required=""
                                   name="newPassword"
                                   onKeyDown={this.handleKeyDown}
                                   onChange={this.handleChange}
                            />
                            <label htmlFor="">Новый пароль</label>
                        </div>
                        <div class="inputBox">
                            <input type="password" required=""
                                   name="confirmPassword"
                                   onKeyDown={this.handleKeyDown}
                                   onChange={this.handleChange}
                            />
                            <label for="">Подтвердить пароль</label>
                        </div>
                        <input type="button" name="" id="" value="Сохранить пароль"
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