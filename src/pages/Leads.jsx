import { Card, Button, Table, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getAllLeads } from "../api/lead.api";
const pageColumns = [
  {
    title: "NAME",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    width: "32%",
  },
  {
    title: "PHONE NUMBER",
    dataIndex: "phoneNumber",
    width: "32%",
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    width: "20%",
  },
];
export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [leadDetails, setLeadDetails] = useState("");
  const [leadDetailsModal, setLeadDetailsModal] = useState(false);
  const handleGetLeads = async () => {
    try {
      const response = await getAllLeads();
      const data = response.data.result;
      setLeads(
        data.map((lead) => ({
          ...lead,
          key: lead.id,
          name: <div className="flex items-center gap-2">{lead.name}</div>,
          email: <div className="flex items-center gap-2">{lead.email}</div>,
          phoneNumber: (
            <div className="flex items-center gap-2">
              {lead.phoneNumber ? lead.phoneNumber : "NA"}
            </div>
          ),
          actions: (
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                className="btn-circle"
                onClick={() => {
                  handleViewLeadDetailsModal(lead);
                }}
              >
                View Details
              </Button>
            </div>
          ),
        }))
      );
    } catch (error) {}
  };

  const handleViewLeadDetailsModal = (lead) => {
    const content = lead.description;
    setLeadDetails(content);
    setLeadDetailsModal(true);
  };
  useEffect(() => {
    handleGetLeads();
  }, []);
  return (
    <div className="tabled">
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Leads Table"
      >
        <div className="table-responsive">
          <Table
            columns={pageColumns}
            dataSource={leads}
            pagination={true}
            className="ant-border-space"
          />
        </div>
      </Card>
      {leadDetailsModal && (
        <Modal
          title="Add New Service"
          open={leadDetailsModal}
          centered
          onCancel={() => {
            setLeadDetailsModal(false);
            setLeadDetails("");
          }}
          okText=""
        >
          {leadDetails}
        </Modal>
      )}
    </div>
  );
}
