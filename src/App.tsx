import { Routes, Route } from "react-router-dom"; 

import RequireAuth from "./auth/RequireAuth";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import PostsList from "./pages/PostsList";
import PostsDetails from "./pages/details/PostsDetails";
import UsersList from "./pages/UsersList";
import UserDetail from "./pages/details/UserDetail";

export default function App() {
  return (
    <Routes>
      {/* Pubblica */}
      <Route path="/login" element={<Login />} />

      {/* Protette */}
      <Route element={<RequireAuth />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostsDetails />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/analytics" element={<div>Not Found</div>} />
          <Route path="/settings" element={<div>Not Found</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
