import {  Select, Button, Modal, Radio } from "antd";
import { useState } from "react";
import "./LessonTracker.css";
import LessonItems from "./components/LessonItem";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../../../stores/index";

const { Option } = Select;

function LessonTracker() {
  //   const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [status, setStatus] = useState("Đang hoạt động");
  const [filterStatus, setFilterStatus] = useState<"all" | true | false>("all");

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSubjectName("");
    setStatus("Đang hoạt động");
  };

  const handleOk = () => {
    if (!subjectName || !status) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setIsModalOpen(false);
    setSubjectName("");
    setStatus("Đang hoạt động");
    window.location.reload();
  };

  const options = [
    { label: "Đang hoạt động", value: "Đang hoạt động" },
    { label: "Ngừng hoạt động", value: "Ngừng hoạt động" },
  ];



  return (
    <div className="p-2">
      <div className="flex items-center justify-between border-t-1 pt-2">
        <h2 className="text-4xl">Bài học</h2>
        <div>
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            style={{ width: 200 }}
          >
            <Option value="all">Lọc theo môn học</Option>
            <Option value={true}>Đang hoạt động</Option>
            <Option value={false}>Ngừng hoạt động</Option>
          </Select>
          <Button className="ml-3" type="primary" onClick={showModal}>
            Thêm mới môn học
          </Button>
        </div>
      </div>
      {/* .centered-modal {
  margin-top: 250px !important;
}
 */}
      <LessonItems />

      <Modal
        title="Thêm mới môn học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="centered-modal"
      >
        <p>Tên môn học</p>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="p-2 border-1 rounded-lg"
          style={{ width: "100%" }}
        />
        <div className="mt-5">
          <p>Trạng thái</p>
          <Radio.Group
            options={options}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default LessonTracker;
