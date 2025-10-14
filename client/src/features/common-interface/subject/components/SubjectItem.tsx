import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Modal, Pagination, Radio } from "antd";
import { Edit, Delete, WarningOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../stores";
import {
  fetchSubjects,
  updateSubject,
  deleteSubject,
  type Subject,
} from "../../../../slices/SubjectItemSlice";
import { toast, ToastContainer } from "react-toastify";

function SubjectItem({
  filterStatus,
  searchKeyword,
}: {
  filterStatus: "all" | true | false;
  searchKeyword: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { subjects } = useSelector((state: RootState) => state.subjectItem);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState(true);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleCancel = () => {
    setIsDelete(false);
    setIsEdit(false);
    setSelectedSubject(null);
  };

  const showModalDelete = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsDelete(true);
  };

  const handleOkDelete = () => {
    if (selectedSubject?.id) {
      dispatch(deleteSubject(selectedSubject.id)).then(() => {
        dispatch(fetchSubjects());
      });
    }
    setIsDelete(false);
  };

  const showModalEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setEditName(subject.title);
    setEditStatus(subject.status);
    setIsEdit(true);
  };

  const handleOkEdit = () => {
    if (selectedSubject?.id) {
      const updated: Subject = {
        id: selectedSubject.id,
        title: editName,
        status: editStatus,
        createdAt: selectedSubject.createdAt,
      };
      dispatch(updateSubject(updated)).then(() => {
        dispatch(fetchSubjects());
      });
      toast.success(`Chỉnh sửa thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setIsEdit(false);
  };

  const options = [
    { label: "Đang hoạt động", value: true },
    { label: "Ngừng hoạt động", value: false },
  ];

  // Lọc theo trạng thái
  const filteredSubjects =
    filterStatus === "all"
      ? subjects
      : subjects.filter((s) => s.status === filterStatus);

  // Lọc theo từ khóa tìm kiếm
  const searchedSubjects = filteredSubjects.filter((s) =>
    s.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Sắp xếp theo thời gian tạo
  const sortedSubjects = [...searchedSubjects].sort((a, b) => {
    const timeA = new Date(a.createdAt || "").getTime();
    const timeB = new Date(b.createdAt || "").getTime();
    return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
  });

  // Phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubjects = sortedSubjects.slice(startIndex, endIndex);

  return (
    <div>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                <div className="flex items-center gap-1">
                  Tên môn học
                  {sortOrder === "asc" ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )}
                </div>
              </TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSubjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.title}</TableCell>
                <TableCell>
                  <p
                    style={{ display: "inline" }}
                    className={`p-1.5 rounded-3xl ${
                      subject.status
                        ? "bg-green-100 text-green-400"
                        : "bg-red-100 text-red-400"
                    }`}
                  >
                    {subject.status ? "Đang hoạt động" : "Ngừng hoạt động"}
                  </p>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => showModalEdit(subject)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => showModalDelete(subject)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {paginatedSubjects.length == 0 ? (
        <div className="flex flex-col justify-center items-center mt-5">
          <FolderOpenOutlined className="text-7xl" />
          <p className="">Chưa có môn học nào</p>
        </div>
      ) : (
        <div className="flex justify-center mt-5">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={sortedSubjects.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* edit */}
      <Modal
        title="Cập nhật môn học"
        open={isEdit}
        onOk={handleOkEdit}
        onCancel={handleCancel}
        className="centered-modal"
      >
        <p>Tên môn học</p>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="p-2 border-1 rounded-lg"
          style={{ width: "100%" }}
        />
        <div className="mt-5">
          <p>Trạng thái</p>
          <Radio.Group
            options={options}
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          />
        </div>
      </Modal>

      {/* delete */}
      <Modal
        title={
          <div className="flex items-center">
            <WarningOutlined className="bg-red-500 m-2 rounded-3xl text-white" />
            <span>Xác nhận</span>
          </div>
        }
        open={isDelete}
        onOk={handleOkDelete}
        onCancel={handleCancel}
        className="centered-modal"
      >
        <h1 className="text-2xl mb-2">
          <b>Bạn có chắc muốn xóa môn học này?</b>
        </h1>
        <p>{selectedSubject?.title}</p>
      </Modal>
    </div>
  );
}

export default SubjectItem;
