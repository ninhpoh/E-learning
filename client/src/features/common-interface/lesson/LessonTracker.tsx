import { Select, Button, Modal, Radio, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import "./LessonTracker.css";
import LessonItems from "./components/LessonItem";
import { useDispatch} from "react-redux";
import type { AppDispatch } from "../../../stores";
import { addLesson, fetchLessons } from "../../../slices/LessonSlice";
// import type { RootState } from "../../../stores";

const { Option } = Select;

function LessonTracker() {
  const dispatch = useDispatch<AppDispatch>();
  // const { lessons } = useSelector((state: RootState) => state.lesson);

  const [subjects, setSubjects] = useState<{ id: string; title: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [status, setStatus] = useState("Đang hoạt động");
  const [filterSubject, setFilterSubject] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchLessons());
    axios.get("http://localhost:3000/subjects")
      .then((res) => {
        const activeSubjects = res.data.filter((s: any) => s.status);
        setSubjects(activeSubjects);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách môn học:", err);
      });
  }, [dispatch]);

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setLessonName("");
    setSubjectName("");
    setDuration(null);
    setStatus("Đang hoạt động");
    setErrors({});
  };

  const handleOk = () => {
  const trimmedLesson = lessonName.trim();
  const trimmedSubject = subjectName.trim();
  const newErrors: { [key: string]: string } = {};

  if (!trimmedLesson) newErrors.lessonName = "Tên bài học không được để trống";
  if (!trimmedSubject) newErrors.subjectName = "Tên môn học không được để trống";
  if (!duration || duration <= 0) newErrors.duration = "Thời gian học phải lớn hơn 0";

  // Bỏ kiểm tra trùng tên
  // const isDuplicate = lessons.some(
  //   (l) => l.title.toLowerCase() === trimmedLesson.toLowerCase()
  // );
  // if (isDuplicate) newErrors.lessonName = "Tên bài học đã tồn tại";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  const newLesson = {
    title: trimmedLesson,
    subject: trimmedSubject,
    duration,
    status: status === "Đang hoạt động",
    createdAt: new Date().toISOString(),
    completed: false,
  };

  dispatch(addLesson(newLesson)).then(() => {
    dispatch(fetchLessons());
    message.success("Thêm bài học thành công");
    handleCancel();
  });
};

  const getInputClass = (field: string) =>
    errors[field] ? "p-2 border border-red-500 rounded-lg w-full" : "p-2 border rounded-lg w-full";

  return (
    <div className="p-2">
      <div className="flex items-center justify-between border-t-1 pt-2">
        <h2 className="text-4xl">Bài học</h2>
        <div className="flex items-center gap-3">
          <Select
            value={filterSubject ?? undefined}
            onChange={(value) => setFilterSubject(value)}
            style={{ width: 200 }}
            placeholder="Lọc theo môn học"
            allowClear
          >
            {subjects.map((subject) => (
              <Option key={subject.id} value={subject.title}>
                {subject.title}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={showModal}>
            Thêm
          </Button>
        </div>
      </div>

      <LessonItems filterSubject={filterSubject} searchKeyword="" />

      <Modal
        title="Thêm mới bài học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="centered-modal"
        okText="Thêm"
        cancelText="Hủy"
      >
        <div className="mb-4">
          <p>Tên bài học</p>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => {
              setLessonName(e.target.value);
              if (errors.lessonName) setErrors((prev) => ({ ...prev, lessonName: "" }));
            }}
            className={getInputClass("lessonName")}
            placeholder="Nhập tên bài học"
          />
          {errors.lessonName && <p className="text-red-500 mt-1">{errors.lessonName}</p>}
        </div>

        <div className="mb-4">
          <p>Tên môn học</p>
          <Select
            value={subjectName || undefined}
            onChange={(value) => {
              setSubjectName(value);
              if (errors.subjectName) setErrors((prev) => ({ ...prev, subjectName: "" }));
            }}
            style={{ width: "100%" }}
            placeholder="Chọn môn học"
            allowClear
          >
            {subjects.map((subject) => (
              <Option key={subject.id} value={subject.title}>
                {subject.title}
              </Option>
            ))}
          </Select>
          {errors.subjectName && <p className="text-red-500 mt-1">{errors.subjectName}</p>}
        </div>

        <div className="mb-4">
          <p>Thời gian học (phút)</p>
          <input
            type="number"
            value={duration ?? ""}
            onChange={(e) => {
              setDuration(Number(e.target.value));
              if (errors.duration) setErrors((prev) => ({ ...prev, duration: "" }));
            }}
            className={getInputClass("duration")}
            placeholder="Nhập thời lượng học"
          />
          {errors.duration && <p className="text-red-500 mt-1">{errors.duration}</p>}
        </div>

        <div className="mb-4">
          <p>Trạng thái</p>
          <Radio.Group
            options={[
              { label: "Hoan thanh", value: "Đang hoạt động" },
              { label: "Chua hoan thanh", value: "Ngừng hoạt động" },
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default LessonTracker;