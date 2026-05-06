import { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Form,
  Input,
  Modal,
  Table,
  Space,
  message,
  Tag,
  Empty,
} from 'antd';
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../utils/adminStorage';
import { Student } from '../types';

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const data = getStudents();
    setStudents(data);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    form.setFieldsValue(student);
    setIsModalVisible(true);
  };

  const handleDeleteStudent = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa học sinh này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteStudent(id);
        message.success('Đã xóa học sinh!');
        loadStudents();
      },
    });
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (editingStudent) {
        updateStudent(editingStudent.id, values);
        message.success('Cập nhật học sinh thành công!');
      } else {
        addStudent({
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'active',
        });
        message.success('Thêm học sinh thành công!');
      }
      setIsModalVisible(false);
      loadStudents();
    } catch (error) {
      message.error('Lỗi khi lưu học sinh!');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Student) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditStudent(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteStudent(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <Statistic
              title="Tổng số Khóa học"
              value={9}
              prefix={<BookOutlined className="text-blue-500" />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <Statistic
              title="Tổng số Giáo viên"
              value={2}
              prefix={<TeamOutlined className="text-green-500" />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <Statistic
              title="Tổng số Học sinh"
              value={students.length}
              prefix={<UserOutlined className="text-orange-500" />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Students Management */}
      <Card
        title="Quản lý Học sinh"
        extra={
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleAddStudent}
          >
            Thêm Học sinh
          </Button>
        }
      >
        {students.length > 0 ? (
          <Table
            dataSource={students}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        ) : (
          <Empty
            description="Chưa có học sinh nào"
            style={{ marginTop: '20px' }}
          />
        )}
      </Card>

      {/* Modal for adding/editing student */}
      <Modal
        title={editingStudent ? 'Chỉnh sửa Học sinh' : 'Thêm Học sinh mới'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Tên đầy đủ"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}
          >
            <Input placeholder="Nhập tên đầy đủ" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" type="email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
