import ShopRegistrationsList from "@components/ShopRegistrationsList/ShopRegistrationsList";
import { NextPage } from "next";
import { AdminPageWrapper } from "../AdminPageWrapper";

const AdminShopsPage: NextPage = () => {
  return (
    <AdminPageWrapper>
      <ShopRegistrationsList />
    </AdminPageWrapper>
  );
};

export default AdminShopsPage;
