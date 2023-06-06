import { configureStore } from '@reduxjs/toolkit';
import usersSlice, {
  fetchUsers,
} from '../src/redux/reducers/appUsersManager/manageUsersReducer';

import RoleSlice, {
  fetchRoles,
} from '../src/redux/reducers/appUsersManager/getUsersRole';

describe('shop page product slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: usersSlice,
        roles: RoleSlice,
      },
    });
  });
  test('to fetch app users should require the following actions', async () => {
    const expectedActions = [
      fetchUsers.pending.type,
      fetchUsers.fulfilled.type,
      fetchUsers.rejected.type,
    ];
    await store.dispatch(fetchUsers());
  });
  test('to get available roles for the users should require the following actions', async () => {
    const expectedActions = [
      fetchUsers.pending.type,
      fetchUsers.fulfilled.type,
      fetchUsers.rejected.type,
    ];
    await store.dispatch(fetchRoles());
  });
});
