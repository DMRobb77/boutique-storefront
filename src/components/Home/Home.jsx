import Carousel from './Carousel.jsx';
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
      <video loop muted autoPlay playsInline poster="https://iyddlapmuvfxhvgh.public.blob.vercel-storage.com/poster-OtFGu6UqqSZ9RlhPqUSrSWu67C8g6O.webp" className="hero-video">
        <source
          src="https://iyddlapmuvfxhvgh.public.blob.vercel-storage.com/fashion-b-roll-HsVmDb7ZPpj9NyQmnEwpCC2B6ChbxJ.mp4"
          type="video/mp4"
        />
        <source
          src="https://iyddlapmuvfxhvgh.public.blob.vercel-storage.com/fashion-b-roll-U90bWVl3YaoHUSjr5cENLbhXCOABDR.webm"
          type="video/webm"
        />
      </video>
      <h2>See what's trending</h2>
      <Carousel />
    </div>
  );
};

export default Home;
