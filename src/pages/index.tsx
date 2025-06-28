import { ReactElement, useEffect } from "react";
import ContainerLayout from "@/components/layouts/ContainerLayout";


export default function IndexPage() {
  return (
    <>
      <ContainerLayout>
      </ContainerLayout>
    </>
  );
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>{page}</>
  );
};
