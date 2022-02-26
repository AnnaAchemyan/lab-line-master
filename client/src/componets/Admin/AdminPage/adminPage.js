import React, { useEffect, useState } from "react";
import "./admin.css";
import Modal from "react-modal";
import Select from 'react-select';
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
const options = [
	{ value: 'type1', label: 'Керамика на рефракторе' },
	{ value: 'type2', label: 'Керамика на метале' },
	{ value: 'type3', label: 'Парка Emax' },
	{ value: 'type4', label: 'Другие' },
];

export default function AdminPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [picture, setPicture] = useState(null);
	const [imgData, setImgData] = useState(null);
	const [allImg, setallImg] = useState([]);
	const [noImg, setNoimg] = useState(false);
	const [imgadd, setImgadd] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);
	const usersPerPage = 15;
	const pagesVisited = pageNumber * usersPerPage;

	const onChangePicture = e => {
		if (e.target.files[0].type && e.target.files[0].type.indexOf('image') === -1) {
			return;
		}
		if (e.target.files[0]) {

			setPicture(e.target.files[0]);
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgData(reader.result);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	function toggleModal() {
		setIsOpen(!isOpen);
		setImgData(null);
		setSelectedOption(null);
		setPicture(null)
	}

	const handleChange = selectedOption => {
		setSelectedOption(selectedOption);
	};

	const resetpass = () => {
		history.push("/reset-password");
	}

	const history = useHistory();
	const singout = function () {
		window.localStorage.removeItem('token')
		window.location.href = "/login"
	};
	if (!localStorage.getItem('token')) {
		//show validation message
		history.push("/login");
	}
	useEffect(() => {
		fetch(`${apiUrl}/api/v1/get-all-images`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then((res) => res.json())
			.then(response => {
				if (response.error) {
					throw response.error;
				}
				setallImg(response.data)
			})
			.catch((error) => {
			})


	}, [])

	useEffect(() => {
		if (imgadd) {
			toast.success("Добавлено", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setImgadd(false)
		}
		if (noImg) {
			toast.error("Заполните все поля", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setNoimg(false)

		}
	})
	const removeImg = (taskId) => {
		fetch(`${apiUrl}/api/v1/delete-image/${taskId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
		})
			.then((res) => res.json())
			.then(response => {
				if (response.error) {
					throw response.error;
				}
				const newPics = allImg.filter(img => img._id !== taskId)
				setallImg(newPics)
			})
			.catch((error) => {
			})
	}

	const renderSwitch = (param) => {
		switch (param) {
			case 'type1':
				return 'Керамика на рефракторе';
			case 'type2':
				return 'Керамика на метале';
			case 'type3':
				return 'Парка Emax';
			case 'type4':
				return 'Другие';
			default:
				return 'Другие';
		}
	}

	const getAllImg = allImg
		.slice(pagesVisited, pagesVisited + usersPerPage)
		.map((img) => {

			return (
				<div className="resultImg" key={img._id}>
					<div className="img_block">
						<div className="img">
							<img src={`${apiUrl}/${img.image}`} alt="" />
						</div>
						<div className="overlay">{renderSwitch(img.type)}</div>
					</div>
					<div className="info">
						<button
							className="openmodal img_btn"
							onClick={() => {
								removeImg(img._id)
							}}
						>Удалить</button>
					</div>
				</div>
			)
		});

	const pageCount = Math.ceil(allImg.length / usersPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	const addImg = () => {
		if (!picture || !selectedOption) {
			setNoimg(true)
			return;
		}
		const formData = new FormData();
		formData.append('type', selectedOption.value)
		formData.append('image', picture)
		const config = {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
		}
		const url = `${apiUrl}/api/v1/upload-image`
		axios.post(url, formData, config).then((response) => {
			if (response.data.message === "success") {
				setImgadd(true)

			}
			setallImg([response.data.data, ...allImg])
		}).catch((err) => {
		})

		setIsOpen(!isOpen);
		setImgData(null);
		setSelectedOption(null);
		setPicture(null)
	};

	return (
		<div className="admin">
			<div className="admin_men">
				<div className="container admin_nav">
					<div className="admin_nav_block">
						<Link to="/" ><button className="openmodal">Вернуться на главную</button></Link>
						<button onClick={toggleModal} className="openmodal">Загрузить новое фото</button>
					</div>
					<div className="admin_nav_block">
						<p className="page_name">Admin</p>
					</div>
					<div className="admin_nav_block">
						<button onClick={resetpass} className="openmodal">Сброс пароля</button>
						<button onClick={singout} className="openmodal">Выйти</button>
					</div>
				</div>
			</div>
			<div className="container adminMain">
				{getAllImg}
			</div>
			<div className="page">
				<ReactPaginate
					previousLabel={"<"}
					nextLabel={">"}
					breakLabel={"..."}
					breakClassName={"break-me"}
					pageCount={pageCount}
					// marginPagesDisplayed={2}
					// pageRangeDisplayed={5}
					onPageChange={changePage}
					containerClassName={"pagination"}
					subContainerClassName={"pages pagination"}
					activeClassName={"active"} />
			</div>
			<Modal
				isOpen={isOpen}
				onRequestClose={toggleModal}
				contentLabel="My dialog"
				className="mymodal"
				overlayClassName="myoverlay"
				closeTimeoutMS={200}
			>
				<div className="cross"
					onClick={toggleModal}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.1 18.1" className="eltdf-menu-closer">
						<line x1="0.4" y1="0.4" x2="17.7" y2="17.7" stroke="red" className="a"></line>
						<line x1="0.4" y1="17.7" x2="17.7" y2="0.4" stroke="red"></line>
					</svg>
				</div>
				<div className="fileUpload">

					<p>Выберите новое фото для загрузки</p>
					<div className="pic">
						<input
							style={{ display: "none" }}
							id="raised-button-file"
							type="file"
							onChange={onChangePicture}
						/>
						<Button
							htmlFor="raised-button-file"
							className="shapefile-icon"
							component="label"
						>
							<PublishIcon />
						</Button>
						<div className="prevPic">
							<img src={imgData} alt="" className="prevImg" />
						</div>
					</div>
					<Select
						// styles={customStyles}
						className="react-select"
						isClearable
						value={selectedOption}
						onChange={handleChange}
						options={options}
						placeholder="Выберите категорию"
					/>
					<button onClick={addImg} className="uploadImg">Загрузить новое фото</button>
				</div>
			</Modal>
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
	);
}
