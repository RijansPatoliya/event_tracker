import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "../Style/Home.css";
import one from "../assets/arjit.webp";
import two from "../assets/Dj West.avif";
import three from "../assets/Ed sheeran.jpg";
import four from "../assets/Green-Day.jpg";
import five from "../assets/Izack.avif";
import six from "../assets/Luke.avif";
import seven from "../assets/shawn Mendes.webp";
import Nav from "../Component/Nav";  // Importing your custom Nav component
import Banner from "../Component/Banner";

const Home = () => {

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <Nav /> {/* Include the Navbar here */}
     <Banner />
      <div className="text-container">
        <div className="header">
          <p>BOUTIQUE ENTERTAINMENT</p>
          <h1 className="header-title">Live music for your special event</h1>
        </div>
        <div className="event-description">
          <p>
            Unplugged Entertainment is founded, owned, and run by professional musicians based in Melbourne. Our mission
            is to provide an exceptional, tailored service that gives wedding couples, corporate clients, and private
            event hosts access to Melbourne's finest live music talent. We're passionate about giving both our clients
            and musicians the professional, personalized experience they deserve.
          </p>
          <br />
          <p>
            Our roster features the very best wedding singers in Melbourne, alongside acoustic duos, trios, and full
            bands who can elevate your special day. Whether you're looking for a solo acoustic performance, hybrid acts,
            or a live DJ with a twist, we have it all. Many of our acoustic duos also offer DJ services, ensuring
            seamless entertainment for your wedding or event.
          </p>
          <br />
          <p>
            We work with Melbourne's top wedding DJs, who can incorporate live elements such as saxophone, vocals,
            percussion, and more to create an unforgettable experience. No matter what type of entertainment you need,
            we are here to make your wedding day or special event truly extraordinary.
          </p>
        </div>
      </div>

      <div className="carousel">
        <div className="artist">
          <h1>Artists on tour near Ahmedabad</h1>
        </div>
        <div className="scrollRow" ref={targetRef}>
          <motion.div className="images" style={{ x }}>
            {[{ src: one }, { src: two }, { src: three }, { src: four }, { src: six }, { src: seven }, { src: five }].map((image, index) => (
              <div key={index} className="imageItem">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </>
  );
};

export default Home;
