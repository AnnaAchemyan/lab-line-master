import { useEffect, useState } from "react";
import SliderCarousel from './Slider/Slider';
import Portfolio from './Portfolio/Portfolio';
import About from './About/About';
import ContactUs from './ContactUs/ContactUs';
import Nav from '../Nav/Nav';
import { Helpers, LineLeft, LineRight } from './helpers/helpers';
import PuffLoader from "react-spinners/PuffLoader";

export default function Main() {

  let color = "rgb(188, 154, 107)";
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])
  
  return (
    <div className="App">
      <Nav />
      <SliderCarousel />
      <About />
      <Portfolio />
      <ContactUs />
      <Helpers />
      <LineLeft />
      <LineRight />
      {
        loading &&
        <div className="spiner_block">
          <PuffLoader color={color} loading={loading} size={150} />
        </div>
      }
    </div>
  );
}
