import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Row, Col, Progress, Statistic, Typography, Card, Empty, Avatar, Badge, Tag } from 'antd';
import {
  BarChartOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
  TrophyOutlined,
  LogoutOutlined,
  CrownOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { getStudents } from '../../utils/adminStorage';
import AdminDashboard from '../../components/AdminDashboard';
import AdminCourses from '../../components/AdminCourses';
import AdminTeachers from '../../components/AdminTeachers';
import AdminAboutUs from '../../components/AdminAboutUs';
import StudentRanking from '../../components/StudentRanking';
import { Student } from '../../types';
import { calculateRankingScore, getStudentRank } from '../../utils/rankingUtils';

const { Sider, Content, Header } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function Profile() {
  const { user, logout } = useAuth();
  const [adminMenuKey, setAdminMenuKey] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  useEffect(() => {
    const data = getStudents();
    setStudents(data);

    if (user?.role === 'student') {
      const matched = data.find((student) => student.username === user.username);
      setCurrentStudent(matched ?? null);
    }
  }, [user]);

  const currentStudentRank = currentStudent ? getStudentRank(currentStudent, students) : null;

  const sameGroupStudents = currentStudent
    ? students.filter(
        (student) =>
          student.class === currentStudent.class &&
          student.birthYear === currentStudent.birthYear,
      )
    : [];

  const currentGroupRank = currentStudent
    ? sameGroupStudents.findIndex((student) => student.id === currentStudent.id) + 1
    : null;

  if (user?.role === 'student') {
    // Student Dashboard
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <Title level={1} className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dashboard Học Tập
                </Title>
                <Text className="text-lg text-slate-600">
                  Chào mừng {currentStudent?.fullName || user.username}!
                </Text>
              </div>
    
            </div>
          </div>

          {/* Stats Overview */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} sm={8}>
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <Statistic
                  title={<span className="text-yellow-300">Khóa học hoàn thành</span>}
                  value={3}
                  prefix={<TrophyOutlined className="text-yellow-200" />}
                  valueStyle={{ color: '#cc9393', fontSize: '32px' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <Statistic
                  title={<span className="text-blue-300">Khóa học đang học</span>}
                  value={2}
                  prefix={<BookOutlined className="text-blue-200" />}
                  valueStyle={{ color: '#cc9393', fontSize: '32px' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <Statistic
                  title={<span className="text-green-300">Tổng thời gian học</span>}
                  value={45}
                  suffix="giờ"
                  prefix={<BarChartOutlined className="text-green-200" />}
                  valueStyle={{ color: '#cc9393', fontSize: '32px' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Personal Progress */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-blue-600" />
                <span className="font-bold">Tiến độ cá nhân</span>
              </div>
            }
            className="mb-8 shadow-xl border-2 border-slate-300 bg-gradient-to-br from-white to-slate-100"
            headStyle={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '12px 12px 0 0',
              borderBottom: '2px solid rgba(255,255,255,0.3)'
            }}
          >
            {currentStudent ? (
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Performance Card */}
                <div className="rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-green-100 to-emerald-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <Text strong className="text-lg text-slate-800">Kết quả thi</Text>
                    <Badge count={`${currentStudent.correctAnswers ?? 0}/${currentStudent.totalExams ?? 0}`} color="green" />
                  </div>
                  <Progress
                    percent={currentStudent.totalExams ? ((currentStudent.correctAnswers ?? 0) / currentStudent.totalExams) * 100 : 0}
                    status="active"
                    strokeColor="#059669"
                    className="mb-2"
                  />
                  <div className="text-sm font-medium text-slate-700">
                    Tỷ lệ chính xác: {currentStudent.totalExams ? ((currentStudent.correctAnswers ?? 0) / currentStudent.totalExams * 100).toFixed(1) : 0}%
                  </div>
                </div>

                {/* Profile Info Card */}
                <div className="rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-blue-100 to-indigo-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar size={48} className="bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-white shadow-md">
                      {currentStudent.fullName.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Text strong className="text-lg block text-slate-800">{currentStudent.fullName}</Text>
                      <Text className="text-slate-700 font-medium">{currentStudent.class} • {currentStudent.birthYear}</Text>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-3 bg-white/60 rounded-lg">
                      <span className="text-slate-700 font-medium">Cơ sở:</span>
                      <Tag color={currentStudent.branch === "cs1" ? "green" : "purple"} className="font-medium">
                        {currentStudent.branch === "cs1" ? "Cơ sở 1" : "Cơ sở 2"}
                      </Tag>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-white/60 rounded-lg">
                      <span className="text-slate-700 font-medium">Thời gian học:</span>
                      <span className="font-bold text-slate-800">{currentStudent.totalTimeSpent ?? 0} phút</span>
                    </div>
                  </div>
                </div>

                {/* Ranking Card */}
                <div className="rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-purple-100 to-pink-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <CrownOutlined className="text-purple-600 text-xl" />
                    <Text strong className="text-lg text-slate-800">Xếp hạng</Text>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-3 bg-white/60 rounded-lg">
                      <span className="text-slate-700 font-medium">Thứ hạng toàn bộ:</span>
                      <div className="flex items-center gap-1">
                        <TrophyOutlined className="text-yellow-500" />
                        <span className="font-bold text-xl text-yellow-600">#{currentStudentRank}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-white/60 rounded-lg">
                      <span className="text-slate-700 font-medium">Điểm xếp hạng:</span>
                      <div className="flex items-center gap-1">
                        <StarOutlined className="text-yellow-500" />
                        <span className="font-bold text-lg text-slate-800">{calculateRankingScore(currentStudent).toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-white/60 rounded-lg">
                      <span className="text-slate-700 font-medium">Cùng nhóm:</span>
                      <span className="font-bold text-slate-800">#{currentGroupRank}/{sameGroupStudents.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Empty
                  description="Chưa có dữ liệu học viên. Vui lòng liên hệ quản trị để hoàn thiện hồ sơ."
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            )}
          </Card>

          {/* Rankings */}
          {students.length > 0 ? (
            <StudentRanking
              students={students}
              currentStudentId={currentStudent?.id}
              title="Bảng xếp hạng học viên"
              showFilters={false}
              compact={true}
            />
          ) : (
            <Card title="Bảng xếp hạng" className="shadow-lg">
              <Empty description="Chưa có dữ liệu xếp hạng" />
            </Card>
          )}

          {/* Recent Scores */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <BarChartOutlined className="text-green-600" />
                <span className="font-bold">Điểm số gần đây</span>
              </div>
            }
            className="mt-8 shadow-xl border-2 border-slate-300 bg-gradient-to-br from-white to-slate-100"
            headStyle={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              borderRadius: '12px 12px 0 0',
              borderBottom: '2px solid rgba(255,255,255,0.3)'
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="text-center border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-100 to-blue-200">
                  <Title level={4} className="mb-2 text-slate-800">Toán Lớp 6 - Đề thi giữa kì</Title>
                  <div className="flex items-center justify-center gap-2">
                    <StarOutlined className="text-yellow-500" />
                    <Text className="text-3xl font-bold text-blue-700">8.5/10</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="text-center border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-green-100 to-green-200">
                  <Title level={4} className="mb-2 text-slate-800">Tiếng Anh - Bài tập tuần 3</Title>
                  <div className="flex items-center justify-center gap-2">
                    <StarOutlined className="text-yellow-500" />
                    <Text className="text-3xl font-bold text-green-700">9.2/10</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="text-center border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-100 to-orange-200">
                  <Title level={4} className="mb-2 text-slate-800">Toán Lớp 10 - Ôn tập</Title>
                  <div className="flex items-center justify-center gap-2">
                    <StarOutlined className="text-yellow-500" />
                    <Text className="text-3xl font-bold text-orange-700">7.8/10</Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
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