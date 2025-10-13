import { Layout } from "antd";
import Sidebar from "../features/common-interface/SideBar";
import { BellOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;

function StdTrackerLayOut() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/signup"); 
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ background: "#fff", padding: "0 24px" }}>
          <div className=" flex justify-between">
            <HomeOutlined
              className="text-4xl"
              onClick={() => {
                navigate("/");
              }}
            />
            <div className="flex">
              <SettingOutlined className="text-2xl" />
              <BellOutlined className="text-2xl ml-5" />
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                className=" rounded-full mt-3 ml-5"
              />
            </div>
          </div>
        </Header>
        <Content className=" bg-white">
          <div
            className=" flex flex-col justify-between"
            style={{ maxWidth: "8659px" }}
          >
            <Content className="bg-white">
              <Outlet />
            </Content>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default StdTrackerLayOut;
