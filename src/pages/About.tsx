import MainLayout from "layouts/Main";
import { usePageTitle } from "hooks";
/* -------------------------------------------------------------------------- */

export default function About() {
  usePageTitle("About");
  return (
    <MainLayout>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">About</h1>
            <p className="py-6">Coming Soon...</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
