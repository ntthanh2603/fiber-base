import MenuBar from "../ui/MenuBar";

const Header = () => {
  return (
    <div
      style={{
        position: 'fixed', // Giữ header cố định
        top: '5px', // Cách trên 10px
        left: '10px', // Cách trái 20px
        right: '10px', // Cách phải 20px
        zIndex: 1000, // Đảm bảo header nằm trên các thành phần khác
        backgroundColor: '#2B92E4',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        borderRadius: '12px', // Bo góc (nếu cần)
        // padding: '10px', // Tạo khoảng cách bên trong
      }}
    >
      <MenuBar />
    </div>
  );
};

export default Header;
