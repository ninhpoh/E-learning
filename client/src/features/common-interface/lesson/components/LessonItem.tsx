import {
  Table,
  Checkbox,
  Button,
  Tooltip,
  Pagination,
  Modal,
  Input,
  Select,
  Radio,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../../../stores";
import {
  fetchLessons,
  deleteLesson,
  updateLesson,
  type Lesson,
} from "../../../../slices/LessonSlice";
import axios from "axios";

const { Option } = Select;

function LessonItem({
  filterSubject,
  searchKeyword,
}: {
  filterSubject: string | null;
  searchKeyword: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { lessons } = useSelector((state: RootState) => state.lesson);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [subjects, setSubjects] = useState<{ id: string; title: string }[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    dispatch(fetchLessons());
    axios.get("http://localhost:3000/subject").then((res) => {
      const activeSubjects = res.data.filter((s: any) => s.status);
      setSubjects(activeSubjects);
    });
  }, [dispatch]);

  const filteredLessons = lessons
    .filter((l) => (filterSubject ? l.subject === filterSubject : true))
    .filter((l) => l.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleStatus = (lesson: Lesson) => {
    const updated = { ...lesson, status: !lesson.status };
    dispatch(updateLesson(updated)).then(() => {
      dispatch(fetchLessons());
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteLesson(id)).then(() => {
      dispatch(fetchLessons());
    });
  };

  const showEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingLesson(null);
  };

  const handleEditSave = () => {
    if (!editingLesson) return;
    dispatch(updateLesson(editingLesson)).then(() => {
      dispatch(fetchLessons());
      message.success("Cập nhật bài học thành công");
      handleEditCancel();
    });
  };

  const columns = [
    {
      title: "Hoàn thành",
      dataIndex: "status",
      key: "status",
      render: (_: boolean, record: Lesson) => (
        <Checkbox
          checked={record.status}
          onChange={() => handleToggleStatus(record)}
        />
      ),
      width: 120,
    },
    {
      title: "Tên bài học",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thời gian học",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => `${duration} phút`,
    },
    {
      title: "Trạng thái",
      key: "statusDisplay",
      render: (_: unknown, record: Lesson) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            record.status ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {record.status ? "Hoàn thành" : "Chưa hoàn thành"}
        </span>
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (_: unknown, record: Lesson) => (
        <div className="flex gap-2">
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              type="default"
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              type="default"
              danger
              onClick={() => handleDelete(record.id!)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={paginatedLessons}
        columns={columns}
        rowKey="id"
        pagination={false}
        rowClassName={(record) => (record.status ? "bg-green-50" : "")}
      />
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredLessons.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa bài học"
        open={isEditModalOpen}
        onOk={handleEditSave}
        onCancel={handleEditCancel}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        {editingLesson && (
          <div className="space-y-4">
            <div>
              <p>Tên bài học</p>
              <Input
                value={editingLesson.title}
                onChange={(e) =>
                  setEditingLesson({ ...editingLesson, title: e.target.value })
                }
              />
            </div>
            <div>
              <p>Môn học</p>
              <Select
                value={editingLesson.subject}
                onChange={(value) =>
                  setEditingLesson({ ...editingLesson, subject: value })
                }
                style={{ width: "100%" }}
              >
                {subjects.map((subject) => (
                  <Option key={subject.id} value={subject.title}>
                    {subject.title}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <p>Thời gian học (phút)</p>
              <Input
                type="number"
                value={editingLesson.duration}
                onChange={(e) =>
                  setEditingLesson({
                    ...editingLesson,
                    duration: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <p>Trạng thái</p>
              <Radio.Group
                options={[
                  { label: "Hoàn thành", value: true },
                  { label: "Chưa hoàn thành", value: false },
                ]}
                value={editingLesson.status}
                onChange={(e) =>
                  setEditingLesson({ ...editingLesson, status: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default LessonItem;