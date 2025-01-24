import { BellOutlined, CommentOutlined, GithubOutlined, GlobalOutlined, HomeOutlined, SettingOutlined, TeamOutlined, UserAddOutlined, UserSwitchOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { Input } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import '../../styles/MenuBar.css'

const MenuBar = () => {

  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const { SubMenu } = Menu;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}> 
      <div style={{ display: 'flex', width: '30%'}}>
        <GithubOutlined style={{fontSize: '30px', margin: '0 20px 0 20px '}} />
        <Search
          placeholder="Tìm kiếm trên Social Space"
          allowClear
          onSearch={onSearch}
          style={{
          width: '70%',
          }}
        />
      </div>
 
      <Menu mode="horizontal" style={{width: '30%' }}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <a href='/'>Trang chủ</a>  
        </Menu.Item>
        <Menu.Item key="follows" icon={<UserAddOutlined />}>
          <a href='/follows'>Theo dõi</a>  
        </Menu.Item>
        <Menu.Item key="friends" icon={<TeamOutlined />}>
          <a href='/friend'>Bạn bè</a>
        </Menu.Item>
        <Menu.Item key="groups" icon={<GlobalOutlined />}>
          <a href='/groups'>Nhóm</a>
        </Menu.Item>
      </Menu>

      <Menu mode="horizontal" style={{width: '25%' }}>
        <Menu.Item key="messages" icon={<CommentOutlined />}>
          <a href='/chatRooms'>Tin nhắn</a>
        </Menu.Item>
        <Menu.Item key="notifications" icon={<BellOutlined />}>
          <a href='/notifications'>Thông báo</a>
        </Menu.Item>
        <SubMenu key="other" title="Khác" icon={<Avatar
          style={{
            // backgroundColor: color,
            verticalAlign: 'middle',
          }} size="40"// gap={gap} 
          >{'TT'}
        </Avatar>}>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <a href='/settings'>Cài đặt</a>
          </Menu.Item>
          <Menu.Item key="logout" icon={<UserSwitchOutlined />}>
            <a href='/logout'>Đăng xuất</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default MenuBar;