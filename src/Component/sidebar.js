import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <Link href="/dashboard" className="hover:text-gray-400">Home</Link>
          </li>
          <li className="mb-2">
            <Link href="/dashboard/new-product" className="hover:text-gray-400">Add new Product</Link>
          </li>
          <li className="mb-2">
            <Link href="/dashboard/settings" className="hover:text-gray-400">Settings</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
