import { Input, Radio, Modal, Button, Select } from "antd";
import { useState } from "react";
import "./SubjectTracker.css";
import SubjectItem from "./components/SubjectItem";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../stores/index";
import { addSubject } from "../../../slices/SubjectTrackerSlice";
import { fetchSubjects } from "../../../slices/SubjectItemSlice";
import type { RootState } from "../../../stores";

const { Option } = Select;

function SubjectTracker() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [status, setStatus] = useState("Đang hoạt động");
  const [filterStatus, setFilterStatus] = useState<"all" | true | false>("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { subjects } = useSelector((state: RootState) => state.subjectItem);

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSubjectName("");
    setStatus("Đang hoạt động");
    setErrorMessage("");
  };

  const handleOk = () => {
    const trimmedName = subjectName.trim();

    if (!trimmedName) {
      setErrorMessage("Vui lòng nhập tên môn học");
      return;
    }

    const isDuplicate = subjects.some(
      (s) => s.title.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage("Tên môn học đã tồn tại");
      return;
    }

    const newSubject = {
      title: trimmedName,
      status: status === "Đang hoạt động",
      createdAt: new Date().toISOString(),
    };

    dispatch(addSubject(newSubject)).then(() => {
      dispatch(fetchSubjects());
    });

    setIsModalOpen(false);
    setSubjectName("");
    setStatus("Đang hoạt động");
    setErrorMessage("");
  };

  const getInputClass = (error?: string) =>
    error ? "p-2 border border-red-500 rounded-lg w-full" : "p-2 border rounded-lg w-full";

  return (
    <div className="p-2">
      <div className="flex items-center justify-between border-t-1 pt-2">
        <h2 className="text-4xl">Môn học</h2>
        <div>
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            style={{ width: 200 }}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value={true}>Đang hoạt động</Option>
            <Option value={false}>Ngừng hoạt động</Option>
          </Select>
          <Button className="ml-3" type="primary" onClick={showModal}>
            Thêm mới môn học
          </Button>
        </div>
      </div>

      <div className="text-end p-2">
        <Input.Search
          placeholder="Tìm kiếm môn học theo tên"
          style={{ width: 300 }}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      <SubjectItem filterStatus={filterStatus} searchKeyword={searchKeyword} />

      <Modal
        title="Thêm mới môn học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="centered-modal"
      >
        <div>
          <p>Tên môn học</p>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => {
              setSubjectName(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            className={getInputClass(errorMessage)}
            placeholder="Nhập tên môn học"
          />
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>

        <div className="mt-5">
          <p>Trạng thái</p>
          <Radio.Group
            options={[
              { label: "Đang hoạt động", value: "Đang hoạt động" },
              { label: "Ngừng hoạt động", value: "Ngừng hoạt động" },
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SubjectTracker;