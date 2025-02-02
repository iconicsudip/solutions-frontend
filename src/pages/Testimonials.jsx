import { Card, Table, Button, Modal, Input, Form } from "antd";

import { Link } from "react-router-dom";
import {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "../api/testimonial.api";
import { useEffect, useState } from "react";
import { NotepadTextDashed } from "lucide-react";

const pageColumns = [
  {
    title: "TESTIMONIAL",
    dataIndex: "testimonial",
    width: "32%",
  },
  {
    title: "NAME",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    width: "20%",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [addTestimonialModal, setAddTestimonialModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [updateId, setUpdateId] = useState();
  const [addForm] = Form.useForm();
  const handleGetTestimonials = async () => {
    try {
      const response = await getTestimonials();
      const data = response.data.result;
      setTestimonials(
        data.map((testimonial) => ({
          ...testimonial,
          key: testimonial.id,
          testimonial: (
            <div className="flex items-center gap-2">
              <NotepadTextDashed size={24} />
              {testimonial.testimonial.slice(0, 40) + "..."}
            </div>
          ),
          name: <>{testimonial.name}</>,
          actions: (
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                className="btn-circle"
                onClick={() => {
                  handleUpdateTestimonialModal(testimonial);
                }}
              >
                Update
              </Button>
              <Button
                type="danger"
                className="btn-circle"
                onClick={() => {
                  handleDeleteTestimonial(testimonial.id);
                }}
              >
                Delete
              </Button>
            </div>
          ),
        }))
      );
    } catch (error) {}
  };
  const handleDeleteTestimonial = async (id) => {
    try {
      const response = await deleteTestimonial(id);
      handleGetTestimonials();
    } catch (error) {}
  };
  const handleAddTestimonial = async (values) => {
    try {
      const response = await createTestimonial(values);
      // console.log(response.data);
      setAddTestimonialModal(false);
      addForm.resetFields();
      setUpdateId();
      setModalType("add");
      handleGetTestimonials();
    } catch (error) {}
  };

  const handleUpdateTestimonial = async (values) => {
    try {
      const response = await updateTestimonial(updateId, values);
      // console.log(response.data);
      setAddTestimonialModal(false);
      addForm.resetFields();
      setUpdateId();
      setModalType("add");
      handleGetTestimonials();
    } catch (error) {}
  };

  const handleUpdateTestimonialModal = (data) => {
    addForm.setFieldsValue(data);
    setUpdateId(data.id);
    setModalType("update");
    setAddTestimonialModal(true);
  };

  const showAddModal = () => {
    addForm.resetFields();
    setUpdateId();
    setModalType("add");
    setAddTestimonialModal(true);
  };

  useEffect(() => {
    handleGetTestimonials();
  }, []);
  return (
    <div className="tabled">
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Testimonials Table"
        extra={
          <>
            <Button
              type="primary"
              className="btn-circle"
              onClick={showAddModal}
            >
              Add New Testimonial
            </Button>
          </>
        }
      >
        <div className="table-responsive">
          <Table
            columns={pageColumns}
            dataSource={testimonials}
            pagination={true}
            className="ant-border-space"
          />
        </div>
      </Card>
      {addTestimonialModal && (
        <Modal
          title="Add New Service"
          open={addTestimonialModal}
          centered
          okText={
            modalType.charAt(0).toUpperCase() + modalType.slice(1).toLowerCase()
          }
          onCancel={() => {
            setAddTestimonialModal(false);
            addForm.resetFields();
          }}
          okButtonProps={{ htmlType: "submit", form: "addForm" }}
        >
          <Form
            form={addForm}
            onFinish={
              modalType === "add"
                ? handleAddTestimonial
                : handleUpdateTestimonial
            }
            id="addForm"
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input testimonial's name!",
                },
              ]}
            >
              <Input placeholder="Name" name="name" />
            </Form.Item>
            <Form.Item
              label="Designation"
              name="designation"
              rules={[
                {
                  required: true,
                  message: "Please input testimonial's designation!",
                },
              ]}
            >
              <Input placeholder="Designation" name="designation" />
            </Form.Item>
            <Form.Item
              label="Testimonial"
              name="testimonial"
              rules={[
                {
                  required: true,
                  message: "Please input testimonial!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Testimonial"
                name="testimonial"
                style={{
                  height: 200,
                  resize: "none",
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}
