import { useState } from 'react';
import { Layout, Menu, Button, Row, Col, Progress, Statistic, Typography, Card } from 'antd';
import {
  BarChartOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
  TrophyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from '../../components/AdminDashboard';
import AdminCourses from '../../components/AdminCourses';
import AdminTeachers from '../../components/AdminTeachers';
import AdminAboutUs from '../../components/AdminAboutUs';

const { Sider, Content, Header } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function Profile() {
  const { user, logout } = useAuth();
  const [adminMenuKey, setAdminMenuKey] = useState('dashboard');

  if (user?.role === 'student') {
    // Student Dashboard
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Title level={1} className="text-3xl font-bold mb-8 text-center">Dashboard Học Tập</Title>

        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={8}>
            <Card className="text-center">
              <Statistic
                title="Khóa học đã hoàn thành"
                value={3}
                prefix={<TrophyOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center">
              <Statistic
                title="Khóa học đang học"
                value={2}
                prefix={<FileTextOutlined className="text-blue-500" />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center">
              <Statistic
                title="Tổng thời gian học"
                value={45}
                suffix="giờ"
                prefix={<BarChartOutlined className="text-green-500" />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Card title="Tiến độ học tập" className="mb-6">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Text strong>Toán Lớp 6</Text>
                <Text>75%</Text>
              </div>
              <Progress percent={75} status="active" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Text strong>Tiếng Anh Giao Tiếp</Text>
                <Text>60%</Text>
              </div>
              <Progress percent={60} status="active" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Text strong>Toán Lớp 10</Text>
                <Text>90%</Text>
              </div>
              <Progress percent={90} status="active" />
            </div>
          </div>
        </Card>

        <Card title="Điểm số gần đây">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Card size="small" className="text-center">
                <Title level={4}>Toán Lớp 6 - Đề thi giữa kì</Title>
                <Text className="text-2xl font-bold text-blue-600">8.5/10</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card size="small" className="text-center">
                <Title level={4}>Tiếng Anh - Bài tập tuần 3</Title>
                <Text className="text-2xl font-bold text-green-600">9.2/10</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card size="small" className="text-center">
                <Title level={4}>Toán Lớp 10 - Ôn tập</Title>
                <Text className="text-2xl font-bold text-yellow-600">7.8/10</Text>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }

  // Admin Panel with Sidebar Navigation
  const renderAdminContent = () => {
    switch (adminMenuKey) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'courses':
        return <AdminCourses />;
      case 'teachers':
        return <AdminTeachers />;
      case 'about':
        return <AdminAboutUs />;
      default:
        return <AdminDashboard />;
    }
  };

  const adminMenuItems = [
    {
      key: 'dashboard',
      icon: <BarChartOutlined />,
      label: 'Tổng quan',
    },
    {
      key: 'courses',
      icon: <BookOutlined />,
      label: 'Quản lý Khóa học',
    },
    {
      key: 'teachers',
      icon: <TeamOutlined />,
      label: 'Giáo viên',
    },
    {
      key: 'about',
      icon: <FileTextOutlined />,
      label: 'Về chúng tôi',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={250}
        breakpoint="lg"
        collapsedWidth={0}
        theme="light"
        style={{
          background: '#f0f2f5',
          borderRight: '1px solid #d9d9d9',
        }}
      >
         <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent p-4">
          Kata Admin
        </h1>
        <Menu
          items={adminMenuItems}
          selectedKeys={[adminMenuKey]}
          onClick={(e) => setAdminMenuKey(e.key)}
          style={{ borderRight: 'none' }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={3} className="mb-0">
            {adminMenuItems.find((item) => item.key === adminMenuKey)?.label}
          </Title>
          
        </Header>

        <Content style={{ padding: '24px', background: '#fafafa' }}>
          {renderAdminContent()}
        </Content>
      </Layout>
    </Layout>
  );
}