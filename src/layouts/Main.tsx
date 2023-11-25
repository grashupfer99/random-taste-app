import { PropsWithChildren } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
/* -------------------------------------------------------------------------- */

type Props = PropsWithChildren;

export default function Main({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
