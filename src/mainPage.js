import './mainPage.css';
import Map from './components/map';
import Navbar from './components/navbar';
import List from './components/list';
import Figure from './components/figure';

function MainPage() {
  return (
    <div className="homePage">
      <Navbar />
      <Map />
      <List />
      <Figure />
    </div>
  );
}

export default MainPage;
