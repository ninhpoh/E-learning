import { Table, Checkbox, Button, Tooltip, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../../../stores";
import {
  fetchLessons,
  deleteLesson,
  type Lesson,
  updateLesson,
} from "../../../../slices/LessonSlice";

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

  useEffect(() => {
    dispatch(fetchLessons());
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
            <Button icon={<EditOutlined />} type="default" />
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
    </>
  );
}

export default LessonItem;