
import Footer from '../Component/Footer'
import HeroSection from './Homepage'
import HomePage from './Features'
import Testimonials from './Testimonials'
import Contect from './Contect'

const Home = () => {
  return (
    <div>
        < HeroSection   />
        <HomePage />
        <Testimonials />
        <Contect />
        <Footer />
    </div>
  )
}

export default Home