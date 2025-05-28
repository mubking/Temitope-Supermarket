import { useEffect } from "react";

const Toast = ({ title, description, status = "info", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  const color = bgColors[status] || bgColors.info;

  return (
   <div
  data-aos="fade-left"
  data-aos-duration="400"
  className={`border-l-4 p-4 rounded shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg ${color}`}
>

      <p className="font-bold">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
};

export default Toast;
