import './mainPage.css';
import Map from './mainPageComponents/map';
import Navbar from './mainPageComponents/navbar';
import List from './mainPageComponents/list';
import Figure from './mainPageComponents/figure';

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
