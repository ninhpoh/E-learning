import { useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import {
  BarChartOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;

function Sidebar() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(() => {
    if (location.pathname.includes("/manager/subject")) return "2";
    if (location.pathname.includes("/manager/lesson")) return "3";
    return "1";
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#f0f0f0",
          },
          Menu: {
            itemColor: "#000",
            itemBg: "#f0f0f0",
            itemHoverBg: "#d9d9d9",
            itemSelectedBg: "#d9d9d9",
          },
        },
      }}
    >
      <Sider width={220}>
        <div style={{ color: "black", padding: "16px", fontSize: "18px" }}>
          Study Tracker
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
        >
          <Menu.Item key="1" icon={<BarChartOutlined />}>
            <NavLink to="/manager">Thống kê</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <NavLink to="/manager/subject">Quản lý môn học</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<ReadOutlined />}>
            <NavLink to="/manager/lesson">Quản lý học</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    </ConfigProvider>
  );
}

export default Sidebar;