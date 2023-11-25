import MainLayout from "layouts/Main";
import { usePageTitle } from "hooks";
/* -------------------------------------------------------------------------- */

export default function ErrorPage() {
  usePageTitle("Error Page");
  return (
    <MainLayout>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Oops somethig went wrong!</h1>
            <p className="py-6">
              Things are a little unstable here. Please come back later.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
