import TableRow from './TableRow';

export default {
  title: '  table/table-row',
  component: TableRow,
};

export const UserRow = () => {
  return (
    <TableRow
      className="w-full bg-white shadow-md"
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
