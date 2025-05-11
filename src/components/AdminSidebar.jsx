
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  ShoppingBag,
  Folders,
  CreditCard,
  Settings,
  LogOut
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <span className="font-bold text-xl">FreshMart Admin</span>
      </div>
      
      <nav className="flex-grow">
        <ul className="py-4">
          <li>
            <Link 
              to="/admin" 
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <Package size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/products" 
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <ShoppingBag size={20} className="mr-3" />
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/categories" 
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <Folders size={20} className="mr-3" />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users" 
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <Users size={20} className="mr-3" />
              <span>Customers</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/orders" 
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <Package size={20} className="mr-3" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/credit-applications" 
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <CreditCard size={20} className="mr-3" />
              <span>Credit Applications</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/settings" 
              className="flex items-center px-6 py-3 hover:bg-gray-700"
            >
              <Settings size={20} className="mr-3" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center text-gray-300 hover:text-white w-full">
          <LogOut size={20} className="mr-3" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;