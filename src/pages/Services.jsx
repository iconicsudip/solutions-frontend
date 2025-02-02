import { Card, Table, Button, Modal, Input, Form } from "antd";

import { Link } from "react-router-dom";
import {
  getServices,
  createService,
  deleteService,
} from "../api/service.api";
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
    title: "ACTIONS",
    dataIndex: "actions",
    width: "20%",
  },
];

function Services() {
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [service, setServices] = useState([]);
  const [addForm] = Form.useForm();

  const handleDeleteService = async (id) => {
    try {
      const response = await deleteService(id);
      handleGetServices();
    } catch (error) {}
  };
  const handleGetServices = async () => {
    try {
      const response = await getServices();
      const data = response.data.result;

      setServices(
        data.map((service) => ({
          ...service,
          key: service.id,
          title: (
            <>
              <Link
                to={`/services/${service.id}`}
                className="flex items-center gap-2"
                style={{ color: "#000000D9" }}
              >
                <NotepadTextDashed size={24} />
                {service.title}
              </Link>
            </>
          ),
          actions: (
            <div className="flex items-center gap-2">
              <Link to={`/services/${service.id}`}>
                <Button type="primary" className="btn-circle">
                  View
                </Button>
              </Link>
              <Button
                type="danger"
                className="btn-circle"
                onClick={() => {
                  handleDeleteService(service.id);
                }}
              >
                Delete
              </Button>
            </div>
          ),
        }))
      );
      console.log(response.data.result);
    } catch (error) {}
  };

  const handleAddService = async (values) => {
    try {
      const response = await createService(values);
      // console.log(response.data);
      setAddServiceModal(false);
      addForm.resetFields();
      handleGetServices();
    } catch (error) {}
  };

  const showAddModal = () => {
    setAddServiceModal(true);
  };

  useEffect(() => {
    handleGetServices();
  }, []);
  return (
    <>
      <div className="tabled">
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="Services Table"
          extra={
            <>
              <Button
                type="primary"
                className="btn-circle"
                onClick={showAddModal}
              >
                Add New Service
              </Button>
            </>
          }
        >
          <div className="table-responsive">
            <Table
              columns={pageColumns}
              dataSource={service}
              pagination={true}
              className="ant-border-space"
            />
          </div>
        </Card>
        {addServiceModal && (
          <Modal
            title="Add New Service"
            open={addServiceModal}
            centered
            okText="Add"
            onCancel={() => {
              setAddServiceModal(false);
              addForm.resetFields();
            }}
            okButtonProps={{ htmlType: "submit", form: "addForm" }}
          >
            <Form
              form={addForm}
              onFinish={handleAddService}
              id="addForm"
              layout="vertical"
            >
              <Form.Item
                label="Service Name"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input service name!",
                  },
                ]}
              >
                <Input placeholder="Service Name" name="title" />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Services;
