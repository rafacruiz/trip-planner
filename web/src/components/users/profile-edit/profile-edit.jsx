
import { useAuth } from "../../../contexts";

function ProfileEdit() {

    const { user } = useAuth();

     return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center py-16 px-6">

      <div className="w-full max-w-xl">

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-32 relative flex justify-center">

            <div className="absolute -bottom-14 group cursor-pointer">

              <img
                
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <label
                htmlFor="avatar"
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <span className="text-white text-xs font-semibold">
                  Change
                </span>
              </label>

              <input
                id="avatar"
                type="file"
                accept="image/*"
                
                className="hidden"
              />

            </div>

          </div>

          {/* FORM */}
          <form
            
            className="pt-20 pb-8 px-8 space-y-6"
          >

            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Edit profile
            </h2>

            {/* USERNAME */}
            <div>
              <label className="text-sm text-gray-500">Username</label>

              <input
                name="username"
                
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* EMAIL (READ ONLY) */}
            <div>
              <label className="text-sm text-gray-500">Email</label>

              <input
                value={user.email}
                disabled
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400"
              />
            </div>

            {/* BIO */}
            <div>
              <label className="text-sm text-gray-500">Bio</label>

              <textarea
                name="bio"
                
                rows="3"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-500">
                New password
              </label>

              <input
                name="password"
                type="password"
                
                placeholder="Leave empty to keep current password"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between pt-4">

              <button
                type="button"
                className="px-5 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow transition"
              >
                Save changes
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
    

}

export default ProfileEdit;