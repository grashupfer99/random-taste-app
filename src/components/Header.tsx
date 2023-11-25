import { Link } from "react-router-dom";
import { ROOT } from "routes/paths";
/* -------------------------------------------------------------------------- */

export default function Header() {
  return (
    <div className="navbar sticky top-0 bg-base-100">
      <div className="w-full flex justify-center">
        <Link to={ROOT} className="btn btn-ghost text-xl">
          Random Taste
        </Link>
      </div>
    </div>
  );
}
