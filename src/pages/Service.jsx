import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Input, Form, Select, Skeleton } from "antd";
import { getService, updateService } from "../api/service.api";
import { getPages } from "../api/page.api";
import * as LucideIcons from "lucide-react";

export default function Service() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const handleGetService = async () => {
    getService(id).then((response) => {
      setTitle(response.data.result.title);
      form.setFieldsValue(response.data.result);
    });
  };

  const allPages = async () => {
    const response = await getPages(true);
    const data = response.data.result;
    setPages(data);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    updateService(id, values).finally(() => {
      handleGetService();
    });
  };

  //   const handleIconChange = (iconName) => {
  //     if (!iconName) {
  //       form.setFieldValue("icon", null); // Clear from form
  //       return;
  //     }
  //     const IconComponent = LucideIcons[iconName];
  //     console.log(React.createElement(IconComponent));
  //     const svg = `
  //       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  //         ${React.createElement(IconComponent).props.children}
  //       </svg>
  //     `;

  //     form.setFieldValue("icon", svg); // Update form's hidden field
  //   };

  useEffect(() => {
    allPages();
    setLoading(true);
    handleGetService().finally(() => setLoading(false));
  }, []);
  console.log(LucideIcons);
  return (
    <Card
      className="header-solid h-full"
      bordered={false}
      title={[<h6 className="font-semibold m-0">{title}</h6>]}
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
              <h3>Service Details</h3>
              <Form.Item label="Title" name={["title"]}>
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item label="Short Description" name={["shortDescription"]}>
                <Input.TextArea
                  placeholder="Short Description"
                  style={{
                    height: "200px",
                    resize: "none",
                  }}
                />
              </Form.Item>

              <Form.Item label="Description" name={["description"]}>
                <Input.TextArea
                  placeholder="Description"
                  style={{
                    height: "200px",
                    resize: "none",
                  }}
                />
              </Form.Item>

              <Form.Item label="Link Text" name={["cardLinkText"]}>
                <Input placeholder="Link Text" />
              </Form.Item>
              <Form.Item label="Link" name={["cardLink"]}>
                <Select
                  placeholder="Link"
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

              {/* <Form.Item label="Icon" name="serviceIcon">
                <Select
                  placeholder="Select an Icon"
                  style={{ width: "100%" }}
                  allowClear
                  size="large"
                  onChange={handleIconChange}
                  dropdownRender={(menu) => (
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {menu}
                    </div>
                  )}
                >
                  {Object.entries(LucideIcons).map(
                    ([iconName, IconComponent]) => (
                      <Select.Option key={iconName} value={iconName}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span>{iconName}</span>
                        </div>
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              <Form.Item label="Icon SVG" name="icon" hidden /> */}
            </div>
          </Card>
        </Form>
      )}
    </Card>
  );
}
