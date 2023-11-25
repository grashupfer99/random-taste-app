import MainLayout from "layouts/Main";
import { usePageTitle } from "hooks";
/* -------------------------------------------------------------------------- */

export default function NotFound() {
  usePageTitle("Page Not Found");
  return (
    <MainLayout>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Not Found!</h1>
            <p className="py-6">
              The page you are looking for may have been removed, deleted, or
              possibly never existed.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
