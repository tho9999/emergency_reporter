import './mainPage.css';
import Map from './components/map';
import Navbar from './components/navbar';
import List from './components/list';

function MainPage() {
  return (
    <div className="homePage">
      <Map />
      <Navbar />
      <List />
    </div>
  );
}

export default MainPage;
