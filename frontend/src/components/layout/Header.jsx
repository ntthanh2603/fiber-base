import MenuBar from "../ui/MenuBar";

const Header = () => {
  return (
    <div className="header" style={{backgroundColor: '#FFFFFF', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)', 
    margin: '0px 10px 0px 10px',}}>
        <MenuBar />
    </div>
  );
}

export default Header;