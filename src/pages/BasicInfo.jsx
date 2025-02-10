import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Switch } from "antd";
import React, { useEffect } from "react";
import { getBasicInfo, upsertBasicInfo } from "../api/basicinfo.api";

export default function BasicInfo() {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await upsertBasicInfo(values).then(() => {
      handleGetBasicInfo();
    });
  };
  const handleGetBasicInfo = async () => {
    const response = await getBasicInfo();
    form.setFieldsValue(response.data.result);
  };
  useEffect(() => {
    handleGetBasicInfo();
  }, []);
  const onBannerTextChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <Card
      className="header-solid h-full"
      bordered={false}
      title={[<h6 className="font-semibold m-0">Basic Information</h6>]}
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
      <h4>Banner Text</h4>
      <Form
        name="dynamic_form_item"
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="isBannerShow"
          label="Show banner or not"
          valuePropName="checked"
        >
          <Switch onChange={onBannerTextChange} />
        </Form.Item>
        <Form.List name="bannerText">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item required={false} key={field.key}>
                  <Form.Item {...field} noStyle>
                    <Input
                      placeholder="Banner text"
                      //   style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "100%" }}
                  icon={<PlusOutlined />}
                >
                  Add Banner Text
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name="companyName" label={"Company name"}>
          <Input type="text" placeholder="Please enter company name" />
        </Form.Item>
        <Form.Item name="companyEmail" label={"Company email"}>
          <Input type="email" placeholder="Please enter company email" />
        </Form.Item>
        <Form.Item name="companyLocation" label={"Company Location"}>
          <Input type="text" placeholder="Please enter company location" />
        </Form.Item>
        <Form.Item name="companyPhoneNumber" label={"Company Phone Number"}>
          <Input
            maxLength={10}
            placeholder="Please enter company phone number"
          />
        </Form.Item>
        <Form.Item
          name="companyLocationIframe"
          label={"Company Location Iframe ( Extract from Google Map )"}
        >
          <Input
            type="text"
            placeholder="Please enter company location iframe"
          />
        </Form.Item>
        <Form.Item
          name="websiteThemeColor"
          label={"Website Theme Primary Color (Hex Code without '#')"}
        >
          <Input
            type="text"
            minLength={6}
            maxLength={6}
            placeholder="Please enter website primary color hex code"
          />
        </Form.Item>
      </Form>
    </Card>
  );
}
