import {
  AppstoreOutlined,
  BellOutlined,
  BookOutlined,
  CommentOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FieldTimeOutlined,
  GithubOutlined,
  HistoryOutlined,
  HomeOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Menu, Input, Avatar } from 'antd';
import '../../styles/MenuBar.css';

const MenuBar = () => {
  const { Search } = Input;

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const mainMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <a href='/'>Trang chủ</a>,
    },
    {
      key: 'groups',
      icon: <EditOutlined />,
      label: <a href='/groups'>Thêm bài</a>,
    },
    {
      key: 'follows',
      icon: <UserAddOutlined />,
      label: <a href='/follows'>Theo dõi</a>,
    },
    {
      key: 'friends',
      icon: <TeamOutlined />,
      label: <a href='/friend'>Bạn bè</a>,
    },
  ];

  const userMenuItems = [
    {
      key: 'menu',
      icon: <AppstoreOutlined />,
      label: 'Menu',
      children: [
        {
          key: 'home',
          icon: <HomeOutlined />,
          label: <a href='/'>Trang chủ</a>,
        },
        {
          key: 'groups',
          icon: <EditOutlined />,
          label: <a href='/groups'>Thêm bài</a>,
        },
        {
          key: 'follows',
          icon: <UserAddOutlined />,
          label: <a href='/follows'>Theo dõi</a>,
        },
        {
          key: 'friends',
          icon: <TeamOutlined />,
          label: <a href='/friend'>Bạn bè</a>,
        },
        {
          key: 'settings',
          icon: <SolutionOutlined />,
          label: <a href='/settings'>Danh sách bạn bè</a>,
        },
        {
          key: 'settings',
          icon: <HistoryOutlined />,
          label: <a href='/settings'>Hoạt động gần đây</a>,
        },
        {
          key: 'logout',
          icon: <BookOutlined />,
          label: <a href='/logout'>Bài viết đã lưu</a>,
        },
        {
          key: 'settings',
          icon: <FieldTimeOutlined />,
          label: <a href='/settings'>Kỉ niệm</a>,
        },
      ],
    },
    {
      key: 'messages',
      icon: <CommentOutlined />,
      label: <a href='/chatRooms'>Tin nhắn</a>,
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: <a href='/notifications'>Thông báo</a>,
    },
    {
      key: 'other',
      icon: (
        <Avatar
          style={{
            verticalAlign: 'middle',
          }}
          size={32}
        >
          {'T'}
        </Avatar>
      ),
      label: 'Thêm',
      children: [
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: <a href='/settings'>Cài đặt</a>,
        },
        {
          key: 'logout',
          icon: <SafetyOutlined />,
          label: <a href='/logout'>Quyền riêng tư</a>,
        },
        {
          key: 'logout',
          icon: <QuestionCircleOutlined />,
          label: <a href='/logout'>Trợ giúp và hỗ trợ</a>,
        },
        {
          key: 'logout',
          icon: <MoonOutlined />,
          label: <a href='/logout'>Màn hình và trợ năng</a>,
        },
        {
          key: 'logout',
          icon: <ExclamationCircleOutlined />,
          label: <a href='/logout'>Đóng góp ý kiến</a>,
        },
        {
          key: 'logout',
          icon: <UserSwitchOutlined />,
          label: <a href='/logout'>Đăng xuất</a>,
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '98%' }}>
      <div style={{ display: 'flex', width: '25%' }}>
        <GithubOutlined style={{ fontSize: '30px', margin: '0 20px 0 20px', color: 'white' }} />
        <Search
          placeholder='Tìm kiếm trên Social Space'
          allowClear
          onSearch={onSearch}
          style={{
            width: '70%',
          }}
        />
      </div>

      <Menu mode='horizontal' items={mainMenuItems} className='menu-bar' />

      <Menu mode='horizontal' items={userMenuItems} className='menu-bar' />
    </div>
  );
};

export default MenuBar;
