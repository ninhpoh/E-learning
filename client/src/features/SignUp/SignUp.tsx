import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../stores/index";
import { loginUser, resetLoginStatus } from "../../slices/signUpSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success, user } = useSelector(
    (state: RootState) => state.signup
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (success && user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`đăng nhập thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(resetLoginStatus());
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [success, user, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(`Lỗi: ${error}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Xóa lỗi của trường đang thay đổi
    const updatedErrors = { ...errors };
    delete updatedErrors[name];

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors(updatedErrors);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@gmail+\.com+/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
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
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
    }
  };

  const getInputClass = (fieldError?: string) =>
    `inputForm border-1 p-2.5 rounded-lg ${
      fieldError ? "border-red-500" : "border-blue-100"
    }`;

  return (
    <div className="flex flex-col justify-center items-center mt-30">
      <ToastContainer />
      <div className="title m-10" style={{ width: "480px" }}>
        <h1 className="text-5xl text-shadow-sm text-start">Đăng nhập</h1>
        <h1 className="text-2xl mt-5">
          Đăng nhập tài khoản để sử dụng dịch vụ
        </h1>
      </div>
      <form onSubmit={handleSubmit} style={{ width: "480px" }}>
        {/* Email */}
        <div>
          <h1>Email</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={getInputClass(errors.email)}
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
            className={getInputClass(errors.password)}
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password}</p>
          )}
        </div>

        {/* Checkbox */}
        <div className="flex mt-5 justify-between">
          <div className="flex">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <h1 className="ml-2">Nhớ mật khẩu</h1>
          </div>
          <div>
            <h1 className="text-blue-400">Quên mật khẩu?</h1>
          </div>
        </div>

        {/* Trạng thái */}
        {loading && (
          <p className="text-blue-500 mt-4 text-center">Đang xử lý...</p>
        )}

        {/* Nút đăng nhập */}
        <div className="mt-5">
          <button
            type="submit"
            className="inputForm bg-blue-500 hover:bg-blue-700 border-1 border-blue-100 p-2.5 rounded-lg text-amber-50"
          >
            Đăng nhập
          </button>
        </div>

        {/* Link chuyển hướng */}
        <div className="mt-5 flex items-center justify-center">
          <h1>
            Chưa có tài khoản?{" "}
            <b className="text-blue-400">
              <Link to={"/login"}>Đi đến đăng ký</Link>
            </b>
          </h1>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
