import './mainPage.css';
import Map from './mainPageComponents/map';
import Navbar from './mainPageComponents/navbar';
import List from './mainPageComponents/list';
import Figure from './mainPageComponents/figure';
import FormButton from './mainPageComponents/FormButton';

function MainPage() {
  return (
    <div className="homePage">
      <Navbar />
      <Map />
      <List />
      <Figure />
      <FormButton />
    </div>
  );
}

export default MainPage;
