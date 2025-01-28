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
import '../../styles/Header.css';
import type { GetProps } from 'antd';
import Link from "next/link";

const Header = () => {
  type SearchProps = GetProps<typeof Input.Search>;

  const { Search } = Input;

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  

  const mainMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link href="/">Trang chủ</Link>,
    },
    {
      key: 'groups',
      icon: <EditOutlined />,
      label: <Link href="/groups">Thêm bài</Link>,
    },
    {
      key: 'follows',
      icon: <UserAddOutlined />,
      label: <Link href="/follows">Theo dõi</Link>,
    },
    {
      key: 'friends',
      icon: <TeamOutlined />,
      label: <Link href="/friend">Bạn bè</Link>,
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
          label: <Link href="/groups">Thêm bài</Link>,
        },
        {
          key: 'groups',
          icon: <EditOutlined />,
          label: <a href='/groups'>Thêm bài</a>,
        },
        {
          key: 'follows',
          icon: <UserAddOutlined />,
          label: <Link href="/follows">Theo dõi</Link>,
        },
        {
          key: 'friends',
          icon: <TeamOutlined />,
          label: <Link href="/friend">Bạn bè</Link>,
        },
        {
          key: 'settings',
          icon: <SolutionOutlined />,
          label: <Link href="/settings">Danh sách bạn bè</Link>,
        },
        {
          key: 'settings',
          icon: <HistoryOutlined />,
          label: <Link href="/recent">Hoạt động gần đây</Link>,
        },
        {
          key: 'logout',
          icon: <BookOutlined />,
          label: <Link href="/saved">Bài viết đã lưu</Link>,
        },
        {
          key: 'settings',
          icon: <FieldTimeOutlined />,
          label: <Link href="/memories">Kỉ niệm</Link>,
        },
      ],
    },
    {
      key: 'messages',
      icon: <CommentOutlined />,
      label: <Link href="/chatRooms">Tin nhắn</Link>,
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: <Link href="/notifications">Thông báo</Link>,
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
          label: <Link href="/settings">Cài đặt</Link>,
        },
        {
          key: 'logout',
          icon: <SafetyOutlined />,
          label: <Link href="/privacy">Quyền riêng tư</Link>,
        },
        {
          key: 'logout',
          icon: <QuestionCircleOutlined />,
          label: <Link href="/help">Trợ giúp và hỗ trợ</Link>,
        },
        {
          key: 'logout',
          icon: <MoonOutlined />,
          label: <Link href="/display">Màn hình và trợ năng</Link>,
        },
        {
          key: 'logout',
          icon: <ExclamationCircleOutlined />,
          label: <Link href="/feedback">Đóng góp ý kiến</Link>,
        },
        {
          key: 'logout',
          icon: <UserSwitchOutlined />,
          label: <Link href="/logout">Đăng xuất</Link>,
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', 
    top: '5px',
    left: '10px',
    zIndex: 1000,
    borderRadius: '12px', 
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#2B92E4', 
    right: '10px',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '98%' }}>
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

export default Header;
