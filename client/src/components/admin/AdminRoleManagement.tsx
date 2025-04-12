import { useState } from "react";
import { User, UserPlus, Shield, Lock, Check, X, Edit } from "lucide-react";

// Kullanıcı verileri (örnek veri)
const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@myhair.com",
    role: "admin",
    createdAt: new Date("2025-01-10"),
    lastLogin: new Date("2025-04-10"),
  },
  {
    id: 2,
    username: "editor",
    email: "editor@myhair.com",
    role: "editor",
    createdAt: new Date("2025-02-15"),
    lastLogin: new Date("2025-04-08"),
  },
  {
    id: 3,
    username: "marketing",
    email: "marketing@myhair.com",
    role: "marketing",
    createdAt: new Date("2025-03-20"),
    lastLogin: new Date("2025-04-05"),
  },
];

// Rol tanımlamaları (örnek veri)
const roles = [
  {
    id: "admin",
    name: "Yönetici",
    description: "Tam yetki erişimine sahip kullanıcı",
    permissions: ["tüm_yetki"],
  },
  {
    id: "editor",
    name: "Editör",
    description: "İçerik düzenleme yetkisine sahip kullanıcı",
    permissions: ["içerik_düzenleme", "okuma"],
  },
  {
    id: "marketing",
    name: "Pazarlama",
    description: "Blog ve pazarlama içeriklerini yönetebilen kullanıcı",
    permissions: ["blog_düzenleme", "okuma"],
  },
  {
    id: "viewer",
    name: "Görüntüleyici",
    description: "Sadece görüntüleme yetkisine sahip kullanıcı",
    permissions: ["okuma"],
  },
];

type AdminRoleManagementProps = {
  activeTab: string;
};

export const AdminRoleManagement = ({ activeTab }: AdminRoleManagementProps) => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activeTab === "users" ? "Kullanıcı Yönetimi" : "Rol ve İzin Yönetimi"}
        </h2>

        {activeTab === "users" && (
          <button
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowAddUser(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Yeni Kullanıcı
          </button>
        )}

        {activeTab === "roles" && (
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Shield className="w-4 h-4 mr-2" />
            Yeni Rol
          </button>
        )}
      </div>

      {activeTab === "users" && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kullanıcı Adı
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    E-posta
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rol
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kayıt Tarihi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Son Giriş
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "editor"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role === "admin"
                          ? "Yönetici"
                          : user.role === "editor"
                          ? "Editör"
                          : "Pazarlama"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditRole(true);
                          }}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-1 text-red-500 hover:text-red-700">
                          <Lock className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-full ${
                      role.id === "admin"
                        ? "bg-purple-100"
                        : role.id === "editor"
                        ? "bg-blue-100"
                        : role.id === "marketing"
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <Shield
                      className={`h-5 w-5 ${
                        role.id === "admin"
                          ? "text-purple-600"
                          : role.id === "editor"
                          ? "text-blue-600"
                          : role.id === "marketing"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {role.name}
                  </h3>
                </div>

                <div className="flex space-x-1">
                  <button className="p-1 text-blue-500 hover:text-blue-700">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">{role.description}</p>

              <div className="mt-5">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  İzinler:
                </h4>
                <ul className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600 capitalize">
                        {permission.replace("_", " ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Yeni Kullanıcı Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Yeni Kullanıcı Ekle
              </h3>
              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rol
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="">Rol Seçin</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Şifre
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rol Düzenleme Modal */}
      {showEditRole && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Kullanıcı Rolünü Düzenle
              </h3>
              <button
                onClick={() => {
                  setShowEditRole(false);
                  setSelectedUser(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{selectedUser.username}</span>{" "}
                kullanıcısının rolünü değiştiriyorsunuz
              </p>
            </div>

            <form>
              <div>
                <label
                  htmlFor="edit-role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rol
                </label>
                <select
                  id="edit-role"
                  defaultValue={selectedUser.role}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditRole(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoleManagement;