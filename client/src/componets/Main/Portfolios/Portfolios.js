import React, {useEffect, useState} from "react";
import { Helpers, LineLeft, LineRight } from '../helpers/helpers';
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import { useTransition, animated } from "react-spring";
import { NavLink } from 'react-router-dom';
import logo from '../../../Img/logo.png';
import RightFooter from "../RightFooter/RightFooter";
import "./portfoliosStyle.css"
import "lightgallery.js/dist/css/lightgallery.css";
import ReactPaginate from 'react-paginate';
import PuffLoader from "react-spinners/PuffLoader";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Portfolios() {
  let color = "rgb(188, 154, 107)";
  let [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [openRightFooter, setOpenRightFooter] = useState(false);
  const [allImg, setallImg] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect (() => {
    fetch(`${apiUrl}/api/v1/get-all-images?type=${filter}`, {
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
  }, [filter])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])
  
  const sliceImg = allImg.slice(pagesVisited, pagesVisited + usersPerPage)

  const transition = useTransition(sliceImg, {
    from: { opacity: 0},
    enter: { opacity: 1}
  });

  const PhotoItem = ({ image, group }) => (
    <LightgalleryItem src={image} group="galery">
      <img src={image} alt='img' />
    </LightgalleryItem>
  );

  const fadeInListItems = transition((style, item) => {
    return (
      <animated.div style={style}>
        <div className="avatar">
          <PhotoItem key={item._id} image={`${apiUrl}/${item.image}`} />
        </div>
      </animated.div>
    );
  });

  const handleSearchBarChange = (target) => {
    setFilter(target)
    setPageNumber(0)
  };

  const toggleRightFooter = () => {
    setOpenRightFooter(!openRightFooter)
  };

  const pageCount = Math.ceil(allImg.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="portfolios">
      <div className="nav">
        <div className="head">
          <div className="logo">
            <NavLink to='/'
              exact
            >
              <img className="logoImg" src={logo} alt='img' />
            </NavLink>
          </div>
          <div className="container">
            <h1 className="page_name">Галерея</h1>
          </div>
          <div className="humburgerMenuu" onClick={toggleRightFooter}>
            <div className="humburgerMenu_icon">
              <div className="a"></div>
              <div className="b"></div>
              <div className="c"></div>
              <div className="d"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="page_name page_name-2">Галерея</h1>
        <div className="portfolio__labels">
          <span
            onClick={() => handleSearchBarChange("")}
            className={filter === "" ? "active_label" : " "}
          >
            Показать все
          </span>
          <span
            onClick={() => handleSearchBarChange("type1")}
            className={filter === "type1" ? "active_label" : " "}
          >
            Керамика на рефракторе
          </span>
          <span
            onClick={() => handleSearchBarChange("type2")}
            className={filter === "type2" ? "active_label" : " "}
          >
            Керамика на метале
          </span>
          <span
            onClick={() => handleSearchBarChange("type3")}
            className={filter === "type3" ? "active_label" : " "}
          >
            Парка Emax
          </span>
          <span
            onClick={() => handleSearchBarChange("type4")}
            className={filter === "type4" ? "active_label" : " "}
          >
            Другие
          </span>
        </div>
        <div className="portfolio__container">
          <LightgalleryProvider>
            {fadeInListItems}
          </LightgalleryProvider>
        </div>

        <div className="page">
          <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              forcePage={pageNumber}
              onPageChange={changePage}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}/>
        </div>
      </div>
      <Helpers />
      <LineLeft />
      <LineRight />
      <RightFooter
        onCLose={toggleRightFooter}
        className={openRightFooter}
      />
      {
        loading &&
        <div className="spiner_block">
          <PuffLoader color={color} loading={loading} size={150} />
        </div>
      }
    </div>
  )
}