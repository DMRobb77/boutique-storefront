import Carousel from './carousel';
import styles from './home.module.css';
import 'material-icons/iconfont/outlined.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.buttonDiv}>
        <Link to="/store">
          <button>
            Browse Our Styles <span className="material-icons-outlined">chevron_right</span>
          </button>
        </Link>
      </div>
      <video loop muted autoPlay playsInline poster="src/assets/poster.webp" className="hero-video">
        <source src="src/assets/fashion-b-roll.mp4" type="video/mp4" />
        <source src="src/assets/fashion-b-roll.webm" type="video/webm" />
      </video>
      <h2>See what's trending</h2>
      <Carousel />
    </div>
  );
};

export default Home;
