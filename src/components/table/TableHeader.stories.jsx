import TableHeader from './TableHeader';

export default {
  title: '  table/table-Header',
  component: TableHeader,
};

export const UserTableHeader = () => {
  return (
    <TableHeader
      className="w-full bg-gray-100 shadow-md"
      fistName="First name"
      lastName="Last name"
      email="email address"
      dateofbirth="date of birth"
      gender="gender"
      status="status"
      rolename="role"
    />
  );
};
