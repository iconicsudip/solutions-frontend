import {
  Card,
  Table,
  Button,
  Modal,
  Input,
  Form,
} from "antd";

import { Link } from "react-router-dom";
import {
  getPages,
  createPage,
  deletePage,
  publishPage,
  unpublishPage,
} from "../api/page.api";
import { useEffect, useState } from "react";
import { NotepadTextDashed } from "lucide-react";

// project table start
const pageColumns = [
  {
    title: "PAGE NAME",
    dataIndex: "title",
    width: "32%",
  },
  {
    title: "PUBLISHED",
    dataIndex: "isPublished",
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    width: "20%",
  },
];

function Pages() {
  const [addPageModal, setAddPageModal] = useState(false);
  const [pages, setPages] = useState([]);
  const [addForm] = Form.useForm();

  const handlePublishPage = async (id) => {
    try {
      const response = await publishPage(id);
      handleGetPages();
    } catch (error) {}
  };

  const handleUnPublishPage = async (id) => {
    try {
      const response = await unpublishPage(id);
      handleGetPages();
    } catch (error) {}
  };

  const handleDeletePage = async (id) => {
    try {
      const response = await deletePage(id);
      handleGetPages();
    } catch (error) {}
  };
  const handleGetPages = async () => {
    try {
      const response = await getPages();
      const data = response.data.result;

      setPages(
        data.map((page) => ({
          ...page,
          key: page.id,
          isPublished: page.isPublished ? "Yes" : "No",
          title: (
            <>
              <Link
                to={`/pages/${page.id}`}
                className="flex items-center gap-2"
                style={{ color: "#000000D9" }}
              >
                <NotepadTextDashed size={24} />
                {page.title}
              </Link>
            </>
          ),
          actions: (
            <div className="flex items-center gap-2">
              <Link to={`/pages/${page.id}`}>
                <Button type="primary" className="btn-circle">
                  View
                </Button>
              </Link>
              <Button
                type="danger"
                className="btn-circle"
                onClick={() => {
                  handleDeletePage(page.id);
                }}
              >
                Delete
              </Button>
              {page.isPublished ? (
                <Button
                  type="default"
                  className="btn-circle"
                  onClick={() => {
                    handleUnPublishPage(page.id);
                  }}
                >
                  Unpublish
                </Button>
              ) : (
                <Button
                  type="default"
                  className="btn-circle"
                  onClick={() => {
                    handlePublishPage(page.id);
                  }}
                >
                  Publish
                </Button>
              )}
            </div>
          ),
        }))
      );
      console.log(response.data.result);
    } catch (error) {}
  };

  const handleAddPage = async (values) => {
    try {
      const response = await createPage(values);
      // console.log(response.data);
      setAddPageModal(false);
      addForm.resetFields();
      handleGetPages();
    } catch (error) {}
  };

  const showAddModal = () => {
    setAddPageModal(true);
  };

  useEffect(() => {
    handleGetPages();
  }, []);
  return (
    <>
      <div className="tabled">
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="Pages Table"
          extra={
            <>
              <Button
                type="primary"
                className="btn-circle"
                onClick={showAddModal}
              >
                Add New Page
              </Button>
            </>
          }
        >
          <div className="table-responsive">
            <Table
              columns={pageColumns}
              dataSource={pages}
              pagination={true}
              className="ant-border-space"
            />
          </div>
        </Card>
        {addPageModal && (
          <Modal
            title="Add New Page"
            open={addPageModal}
            centered
            okText="Add"
            onCancel={() => {
              setAddPageModal(false);
              addForm.resetFields();
            }}
            okButtonProps={{ htmlType: "submit", form: "addForm" }}
          >
            <Form
              form={addForm}
              onFinish={handleAddPage}
              id="addForm"
              layout="vertical"
            >
              <Form.Item
                label="Page Name"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input page name!",
                  },
                ]}
              >
                <Input placeholder="Page Name" name="title" />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Pages;
