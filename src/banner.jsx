import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "./assets/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import './app.css';
import './banner.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "You Hackathon!" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      
      <Container>
      
        <Row className="aligh-items-center">
        <div className="con">
          <div className="text">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""} style={{marginLeft:"20px",}}>
                {/* <span className="tagline">Welcome to my Portfolio</span> */}
                <h1 style={{color:"white"}}>{`Revolutionize the Way`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "You Hackathon!"]'><span className="wrap">{text}</span></span></h1>
                  <p>Join our cutting-edge AI-powered platform, where innovation meets collaboration! Tackle real-world challenges, connect with like-minded individuals to build dynamic teams, and unlock exciting opportunities. Experience growth, problem-solving, and success—all in real time!</p>
                  <button onClick={() => console.log('connect')}>Explore<ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          </div>
          <div className="imi">
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
          </div>
          </div>
        </Row>
        
      </Container>
      
    </section>
  )
}