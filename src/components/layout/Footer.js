import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
import moment from "moment";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const currentYear = moment().format("YYYY");

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © {currentYear}, made with
            {<HeartFilled />} by 7Solutions Team
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
