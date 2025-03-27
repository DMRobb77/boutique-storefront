import Carousel from './carousel';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <video loop muted autoPlay playsInline poster="src/assets/poster.webp" className="hero-video">
        <source src="src/assets/fashion-b-roll.mp4" type="video/mp4" />
        <source src="src/assets/fashion-b-roll.webm" type="video/webm" />
      </video>
      <Carousel />
    </div>
  );
};

export default Home;
