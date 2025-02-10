import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Table,
  Space,
  message,
} from "antd";
import { getPages } from "../api/page.api";
import {
  deleteHeader,
  getAllHeaders,
  saveHeader,
  updateHeader,
} from "../api/header.api";

const { Option } = Select;

const HeaderManagement = () => {
  const [form] = Form.useForm();
  const [headers, setHeaders] = useState([]);
  const [pages, setPages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const headerType = Form.useWatch("headerNameType", form);
  useEffect(() => {
    // Fetch pages for dropdowns
    getPages(true).then((data) => setPages(data.data.result));

    // Fetch existing headers
    getAllHeaders().then((data) => setHeaders(data.data.result));
  }, []);

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      pageId: values.headerNameType === "PAGE" ? values.pageId : null,
      pageIds: values.headerNameType === "SUB_PAGES" ? values.pageIds : null,
    };
    if (editingId) {
      updateHeader(editingId, payload).then(() => {
        message.success("Header updated!");
        form.resetFields();
        setEditingId(null);
        getAllHeaders().then((data) => setHeaders(data.data.result));
      });
    } else {
      saveHeader(payload).then(() => {
        message.success("Header created!");
        form.resetFields();
        setEditingId(null);
        getAllHeaders().then((data) => setHeaders(data.data.result));
      });
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    await deleteHeader(id).then(() => {
      message.success("Header deleted!");
      setHeaders(headers.filter((h) => h.id !== id));
    });
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Manage Headers</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Header Name" rules={[{ required: true }]}>
          <Input placeholder="Enter header name" />
        </Form.Item>

        <Form.Item
          name="headerNameType"
          label="Header Type"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="PAGE">Page</Radio>
            <Radio value="SUB_PAGES">Sub Pages</Radio>
          </Radio.Group>
        </Form.Item>

        {headerType === "PAGE" && (
          <Form.Item
            name="pageId"
            label="Select Page"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a page">
              {pages.map((page) => (
                <Option key={page.id} value={page.id}>
                  {page.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {headerType === "SUB_PAGES" && (
          <Form.Item
            name="pageIds"
            label="Select Sub Pages"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" placeholder="Select sub pages">
              {pages.map((page) => (
                <Option key={page.id} value={page.id}>
                  {page.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit">
          {editingId ? "Update Header" : "Create Header"}
        </Button>
      </Form>

      <h3
        className="text-lg font-semibold mt-6"
        style={{
          marginTop: "2rem",
        }}
      >
        Existing Headers
      </h3>
      <Table
        dataSource={headers}
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Type", dataIndex: "headerNameType", key: "headerNameType" },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default HeaderManagement;
