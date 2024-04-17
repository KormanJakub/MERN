import NavButton from './NavButton';
import {MegaMenu} from 'primereact/megamenu';

const NavBar = ({ onSelect }) => {

  const items = [
    {
      label: 'News',
      icon: 'pi pi-address-book'
    },
    {
      label: 'About',
      icon: 'pi pi-question'
    }
  ];

  const start = <div id="logo" onClick={() => onSelect("home")}>
                  NOVINY.SK
                </div>;
  
  const end = <div className="grid">
                <div className="col py-5">
                  Login
                </div>
                <div className="col py-5">
                  <i className='pi pi-user'></i>
                </div>
              </div>;

  return (
    <div className="card">
      <MegaMenu model={items} start={start} end={end} breakpoint="960px" className="p-3 surface-0 shadow-2"/>
    </div>
  );
};
export default NavBar;
