import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../stores/index";
import { registerUser, resetStatus } from "../../slices/loginSlice";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.login
  );

  const [formData, setFormData] = useState({
    hoTenDem: "",
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const done = () => (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Here is a gentle confirmation that your action was successful.
    </Alert>
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (success) {
      setFormData({
        hoTenDem: "",
        name: "",
        email: "",
        password: "",
        
        agree: false,
      });
      dispatch(resetStatus());
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;

  // Xóa lỗi của trường đang thay đổi
  if (errors[name]) {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
};

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.hoTenDem || !formData.name) {
      newErrors.name = "Họ và tên không được để trống";
    }
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@gmail+\.com+/.test(formData.email)) {
      newErrors.email = "Email phải đúng định dạng";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu tối thiểu 8 ký tự";
    }
    if (!formData.agree) {
      newErrors.agree = "Bạn phải đồng ý với chính sách và điều khoản";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const userData = {
        hoTenDem: formData.hoTenDem,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      dispatch(registerUser(userData));
    }
  };

  const getInputShot = (fieldError?: string) =>
    `inputInName border-1 p-2.5 rounded-lg ${
      fieldError ? "border-red-500" : "border-blue-100"
    }`;

  const getInputLong = (fieldError?: string) =>
    `inputEmail border-1 p-2.5 rounded-lg ${
      fieldError ? "border-red-500" : "border-blue-100"
    }`;

  return (
    <div className="flex flex-col justify-center items-center mt-20 static">
      {showSuccess && <div className="m-4 absolute bottom-230 left-350">{done()}</div>}
      <div className="text-center m-10">
        <h1 className="text-4xl">Đăng ký tài khoản</h1>
        <h1 className="text-2xl mt-5">Đăng ký tài khoản để sử dụng dịch vụ</h1>
      </div>

      <form onSubmit={handleSubmit} className="m-5" style={{ width: "480px" }}>
        {/* Họ tên */}
        <div className="formName">
          <div>
            <h1>Họ tên đệm</h1>
            <input
              type="text"
              name="hoTenDem"
              value={formData.hoTenDem}
              onChange={handleChange}
              className={getInputShot(errors.name)}
            />
          </div>
          <div>
            <h1>Tên</h1>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={getInputShot(errors.name)}
            />
          </div>
        </div>
        {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}

        {/* Email */}
        <div className="mt-5">
          <h1>Email</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="yourEmail@gmail.com"
            className={getInputLong(errors.email)}
          />
          {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
        </div>

        {/* Mật khẩu */}
        <div className="mt-5">
          <h1>Mật khẩu</h1>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={getInputLong(errors.password)}
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password}</p>
          )}
        </div>

        {/* Xác nhận mật khẩu */}
        {/* <div className="mt-5">
          <h1>Xác nhận mật khẩu</h1>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={getInputLong(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 mt-2">{errors.confirmPassword}</p>
          )}
        </div> */}

        {/* Checkbox */}
        <div className="mt-5 flex items-center justify-center">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <h1 className="ml-2">
            Bạn đồng ý với{" "}
            <b className="text-blue-400">chính sách và điều khoản</b>
          </h1>
        </div>
        {errors.agree && (
          <p className="text-red-500 mt-2 text-center">{errors.agree}</p>
        )}

        {/* Trạng thái */}
        {error && <p className="text-red-500 mt-4 text-center">Lỗi: {error}</p>}
        {loading && (
          <p className="text-blue-500 mt-4 text-center">Đang xử lý...</p>
        )}

        {/* Nút đăng ký */}
        <div className="mt-5">
          <button
            type="submit"
            className="inputEmail bg-blue-500 hover:bg-blue-700 border-1 border-blue-100 p-2.5 rounded-lg text-amber-50"
          >
            Đăng ký
          </button>
        </div>

        {/* Link chuyển hướng */}
        <div className="mt-5 flex items-center justify-center">
          <h1>
            Đã có tài khoản?{" "}
            <b className="text-blue-400">
              <Link to={"/signup"}>Đi đến đăng nhập</Link>
            </b>
          </h1>
        </div>
      </form>
    </div>
  );
}

export default Login;
