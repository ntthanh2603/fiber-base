import MenuBar from "../ui/MenuBar";

const Header = () => {
  return (
    <div style={{boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', 
    margin: '0px 10px 0px 10px',}}>
        <MenuBar />
    </div>
  );
}

export default Header;