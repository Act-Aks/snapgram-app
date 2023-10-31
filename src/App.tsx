import { Route, Routes } from "react-router-dom";
import {
  Explore,
  Home,
  Profile,
  AllUsers,
  CreatePost,
  Saved,
  PostDetails,
  EditProfile,
  EditPost,
} from "./_root/pages";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import "./global.css";
import { Toaster } from "./components/ui/toaster";
import { routes } from "./constants";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={routes.signIn} element={<SignInForm />} />
          <Route path={routes.signUp} element={<SignUpForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path={routes.explore} element={<Explore />} />
          <Route path={routes.saved} element={<Saved />} />
          <Route path={routes.allUsers} element={<AllUsers />} />
          <Route path={routes.createPost} element={<CreatePost />} />
          <Route path={routes.updatePost} element={<EditPost />} />
          <Route path={routes.posts} element={<PostDetails />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.updateProfile} element={<EditProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
