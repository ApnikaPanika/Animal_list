import './Header.scss';
import logo from '../../Libs/photos/AnimalLogo.png';

const Header = () => {
  console.log(123);
  return (
    <div>
      <div className="logo__container">
        <img src={logo} alt="Logo" className="app__logo" />
      </div>
    </div>
  );
};

export default Header;
