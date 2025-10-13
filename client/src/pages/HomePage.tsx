import {
  CheckCircleOutlined,
  FacebookOutlined,
  HeartOutlined,
  InstagramOutlined,
  LogoutOutlined,
  SearchOutlined,
  TikTokOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";

function HomePage() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    setIsLoggedIn(!!userData);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    localStorage.removeItem("user");
    setIsModalOpen(false);
    navigate("/signup");
    setIsLoggedIn(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const showWarning = () => {
    setIsOpen(true);
  };

  const handleOkWarning = () => {
    setIsOpen(false);
  }  

  const userData = localStorage.getItem("user");
  const email = userData ? JSON.parse(userData).email : null;
  return (
    <div>
      {/* header */}
      <div className=" border-1 border-gray-300">
        <div
          className="flex justify-between items-center"
          style={{ margin: "16px 160px 16px 160px" }}
        >
          <div>
            <Input
              size="large"
              placeholder="Search here"
              prefix={<SearchOutlined />}
              style={{ width: "768px" }}
            />
          </div>
          <div className="flex gap-20 text-2xl">
            <p>Trang chủ</p>
            <p
              className="text-gray-300 hover:text-black"
              onClick={() => {
                if (email === "admin@gmail.com") {
                  navigate("/manager/subject");
                } else {
                  showWarning()
                }
              }}
            >
              Môn học
            </p>
            <p
              className="text-gray-300 hover:text-black"
              onClick={() => {
                if (email === "admin@gmail.com") {
                  navigate("/manager/lesson");
                } else {
                  showWarning()
                }
              }}
            >
              Bài học
            </p>
          </div>
          <div className=" flex gap-20 ">
            <HeartOutlined className=" text-3xl" />
            {isLoggedIn ? (
              email === "admin@gmail.com" ? (
                <p className="text-2xl">ADMIN</p>
              ) : (
                <p className="text-2xl">USER</p>
              )
            ) : (
              <div style={{ display: "none" }}></div>
            )}
            {isLoggedIn ? (
              <div className=" text-red-500">
                <LogoutOutlined className="text-3xl" onClick={showModal} />
              </div>
            ) : (
              <UserOutlined
                className="text-3xl"
                onClick={() => navigate("/login")}
              />
            )}
          </div>
        </div>
      </div>
      {/* body */}
      <div className=" ">
        <div
          className="flex gap-20 text-2xl "
          style={{ margin: "40px 160px 16px 160px" }}
        >
          <p className=" border-b">Tất cả môn học</p>
          <p className="text-gray-300 hover:text-black">Đã hoàn thành</p>
          <p className="text-gray-300 hover:text-black">Chưa hoàn thành</p>
        </div>
        <div
          className=" flex flex-wrap gap-5 justify-center"
          style={{ margin: "40px 160px 160px 160px" }}
        >
          <div
            style={{ height: "502px", width: "510px", padding: "30px" }}
            className="border-1 border-gray-700 rounded-lg flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              <p className=" text-4xl">HTML cơ bản</p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 01: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 02: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 03: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 04: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 05: Tổng quan về HTML
              </p>
            </div>
            <div className="flex justify-center mt-9 text-2xl hover:text-blue-300">
              <p>xem them</p>
            </div>
          </div>
          <div
            style={{ height: "502px", width: "510px", padding: "30px" }}
            className="border-1 border-gray-700 rounded-lg flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              <p className=" text-4xl">CSS co ban</p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 01: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 02: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 03: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 04: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 05: Tổng quan về HTML
              </p>
            </div>
            <div className="flex justify-center mt-9 text-2xl hover:text-blue-300">
              <p>xem them</p>
            </div>
          </div>
          <div
            style={{ height: "502px", width: "510px", padding: "30px" }}
            className="border-1 border-gray-700 rounded-lg flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              <p className=" text-4xl">JavaScript co ban</p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 01: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 02: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 03: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 04: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 05: Tổng quan về HTML
              </p>
            </div>
            <div className="flex justify-center mt-9 text-2xl hover:text-blue-300">
              <p>xem them</p>
            </div>
          </div>
          <div
            style={{ height: "502px", width: "510px", padding: "30px" }}
            className="border-1 border-gray-700 rounded-lg flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              <p className=" text-4xl">Lap trinh voi React.js</p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 01: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 02: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 03: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 04: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 05: Tổng quan về HTML
              </p>
            </div>
            <div className="flex justify-center mt-9 text-2xl hover:text-blue-300">
              <p>xem them</p>
            </div>
          </div>
          <div
            style={{ height: "502px", width: "510px", padding: "30px" }}
            className="border-1 border-gray-700 rounded-lg flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              <p className=" text-4xl">Lap trinh voi Java</p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 01: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 02: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 03: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 04: Tổng quan về HTML
              </p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Session 05: Tổng quan về HTML
              </p>
            </div>
            <div className="flex justify-center mt-9 text-2xl hover:text-blue-300">
              <p>xem them</p>
            </div>
          </div>
          <div
            style={{ height: "502px", width: "510px", padding: "30px" }}
            className="border-1 border-gray-700 rounded-lg flex flex-col justify-between"
          >
            <div className="flex flex-col gap-5">
              <p className=" text-4xl">Lap trinh C</p>
              <p className="flex gap-3 text-2xl">
                <CheckCircleOutlined />
                Chua co bai hoc nao
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className=" bg-black text-white">
        <p className=" text-black">.</p>
        <div
          className=" flex justify-between "
          style={{ margin: "100px 160px 100px 160px" }}
        >
          <div
            className="flex flex-col justify-between gap-30"
            style={{ maxWidth: "400px" }}
          >
            <p className="text-xl">
              Chúng tôi cung cấp giải pháp học tập, giúp học sinh và viên học
              tập tốt hơn và hiệu quả hơn.
            </p>
            <div className="flex gap-10 text-3xl">
              <TwitterOutlined />
              <FacebookOutlined />
              <TikTokOutlined />
              <InstagramOutlined />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-3xl">Danh muc</p>
            <p>Mon hoc</p>
            <p>Bai hoc</p>
            <p>Ghi chu</p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-3xl">Ho tro khach hang</p>
            <p>Tim kiem dich vu</p>
            <p>Dieu khoan su dung</p>
            <p>Chinh sach va dieu khoan</p>
          </div>
        </div>
        <p className="text-black">d</p>
      </div>
      <Modal
        title="Đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="centered-modal"
      >
        <p>bạn muốn đăng xuất thật chứ !?</p>
      </Modal>
      <Modal
        title="Cảnh báo"
        open={isOpen}
        onOk={handleOkWarning}
        onCancel={handleCancel}
        className="centered-modal"
      >
        <p className="text-red-500">Bạn không có quyền truy cập vào trường này !!!</p>
        <p className="text-red-500">GET OUTTTT</p>
      </Modal>
      
    </div>
  );
}

export default HomePage;
