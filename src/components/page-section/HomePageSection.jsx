import React, { useEffect, useState } from "react";
import { Card, Button, Input, Form, Select, Skeleton } from "antd";
import { getPages } from "../../api/page.api";
import { addPageSection, getPageSections } from "../../api/pagesection.api";
import { getServices } from "../../api/service.api";
import { getTestimonials } from "../../api/testimonial.api";

const information = [
  {
    title: "Oliver Liam",
    description: "Viking Burrito",
    address: "oliver@burrito.com",
    vat: "FRB1235476",
  },
  {
    title: "Lucas Harper",
    description: "Stone Tech Zone",
    address: "lucas@syone-tech.com",
    vat: "FRB1235476",
  },
  {
    title: "Oliver Liam",
    description: "ethan@fiber.com",
    vat: "NumberFRB1235476",
  },
];
export default function HomePageSection({ page }) {
  const [form] = Form.useForm();
  const [pages, setPages] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxTestimonials, setMaxTestimonials] = useState(1);
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);

  // Handle changes in "No. of Testimonials" field
  const handleTestimonialLimitChange = (value) => {
    if (value < selectedTestimonials.length) {
      // Trim the selection if the new limit is smaller than current selection
      const trimmedSelection = selectedTestimonials.slice(0, value);
      setSelectedTestimonials(trimmedSelection);
      form.setFieldValue(["testimonial", "testimonials"], trimmedSelection);
    }
    setMaxTestimonials(value || 1); // Ensure at least 1 testimonial can be selected
  };

  // Handle testimonials selection
  const handleTestimonialSelection = (values) => {
    if (values.length <= maxTestimonials) {
      setSelectedTestimonials(values);
      form.setFieldValue(["testimonial", "testimonials"], values);
    }
  };

  const allPages = async () => {
    const response = await getPages(true);
    const data = response.data.result;
    setPages(data);
  };

  const allServices = async () => {
    const response = await getServices();
    const data = response.data.result;
    setServices(data);
  };
  const allTestimonials = async () => {
    const response = await getTestimonials();
    const data = response.data.result;
    setTestimonials(data);
  };

  const getPageSectionsById = async (id) => {
    const response = await getPageSections(id);
    const data = response.data.result;
    form.setFieldsValue(data);
  };

  const handleSubmit = async (values) => {
    const data = {
      page: parseInt(page),
      ...values,
    };
    const response = await addPageSection(data);
    getPageSectionsById(page);
  };

  useEffect(() => {
    allPages();
    allServices();
    allTestimonials();
    setLoading(true);
    getPageSectionsById(page).finally(() => {
      setLoading(false);
    });
  }, [page]);
  return (
    <Card
      className="header-solid h-full"
      bordered={false}
      title={[<h6 className="font-semibold m-0">Home</h6>]}
      extra={[
        <Button
          type="primary"
          className="btn-circle"
          onClick={() => {
            form.submit();
          }}
        >
          Save
        </Button>,
      ]}
      bodyStyle={{ paddingTop: "0" }}
    >
      {loading ? (
        <Skeleton.Input
          style={{ width: "100%", height: "600px" }}
          active
          size="large"
          block
        />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="flex gap-2 flex-column"
        >
          <Card className="card-billing-info">
            <div className="col-info" style={{ width: "100%" }}>
              <h3>Hero Information</h3>
              <Form.Item label="First Title" name={["heroInfo", "firstTitle"]}>
                <Input placeholder="First Title" />
              </Form.Item>

              <Form.Item
                label="Second Title"
                name={["heroInfo", "secondTitle"]}
              >
                <Input placeholder="Second Title" />
              </Form.Item>

              <Form.Item label="Description" name={["heroInfo", "description"]}>
                <Input.TextArea
                  placeholder="Description"
                  style={{
                    height: "200px",
                    resize: "none",
                  }}
                />
              </Form.Item>

              <Form.Item label="Button Text" name={["heroInfo", "buttonText"]}>
                <Input placeholder="Button Text" />
              </Form.Item>
              <Form.Item label="Button Link" name={["heroInfo", "buttonLink"]}>
                <Select
                  placeholder="Button Link"
                  style={{ width: "100%" }}
                  allowClear
                  size="large"
                >
                  {pages.map((page) => (
                    <Select.Option value={`${page.title}.html`}>
                      {page.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Card>
          <Card className="card-billing-info">
            <div className="col-info" style={{ width: "100%" }}>
              <h3>About Us</h3>
              <Form.Item label="Title" name={["aboutUs", "title"]}>
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item label="Description" name={["aboutUs", "description"]}>
                <Input.TextArea
                  placeholder="Description"
                  style={{
                    height: "200px",
                    resize: "none",
                  }}
                />
              </Form.Item>

              <Form.Item label="Link Text" name={["aboutUs", "linkText"]}>
                <Input placeholder="Link Text" />
              </Form.Item>
              <Form.Item label="Link Text Link" name={["aboutUs", "linkLink"]}>
                <Select
                  placeholder="Link Text Link"
                  style={{ width: "100%" }}
                  allowClear
                  size="large"
                >
                  {pages.map((page) => (
                    <Select.Option value={`${page.title}.html`}>
                      {page.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Card>
          <Card className="card-billing-info">
            <div className="col-info" style={{ width: "100%" }}>
              <h3>Services</h3>
              <Form.Item label="Title" name={["services", "title"]}>
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item label="Services" name={["services", "services"]}>
                <Select
                  placeholder="Service"
                  style={{ width: "100%" }}
                  allowClear
                  size="large"
                  mode="tags"
                >
                  {services.map((service) => (
                    <Select.Option value={`${service.id}`}>
                      {service.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Card>
          <Card className="card-billing-info">
            <div className="col-info" style={{ width: "100%" }}>
              <h3>Testomonials</h3>
              <Form.Item label="Title" name={["testimonial", "title"]}>
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                label="No. of Testimonials"
                name={["testimonial", "noOfTestimonials"]}
              >
                <Input
                  placeholder="No. of Testimonials"
                  type="number"
                  min={1}
                  value={maxTestimonials}
                  onChange={(e) =>
                    handleTestimonialLimitChange(Number(e.target.value))
                  }
                />
              </Form.Item>

              <Form.Item
                label="Testimonials"
                name={["testimonial", "testimonials"]}
              >
                <Select
                  placeholder="Testimonials"
                  style={{ width: "100%" }}
                  allowClear
                  size="large"
                  mode="tags"
                  value={selectedTestimonials}
                  onChange={handleTestimonialSelection}
                  maxTagCount="responsive"
                >
                  {testimonials.map((testimonial) => (
                    <Select.Option value={`${testimonial.id}`}>
                      {testimonial.testimonial.slice(0, 40) + "..."}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Card>
        </Form>
      )}
    </Card>
  );
}
