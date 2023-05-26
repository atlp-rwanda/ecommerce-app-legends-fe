import { configureStore } from '@reduxjs/toolkit';
import chatReducer, {
  fetchPreviousMessages,
  sendMessage,
  clearChatMessages,
} from '../src/redux/reducers/chat/chatSlice';

describe('chat slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        chat: chatReducer,
      },
    });
  });

  test('sendMessage should dispatch the correct actions', async () => {
    const expectedActions = [
      sendMessage.pending.type,
      sendMessage.fulfilled.type,
    ];

    await store.dispatch(sendMessage());
  });

  test('fetchPreviousMessages should dispatch the correct actions', async () => {
    const expectedActions = [
      fetchPreviousMessages.pending.type,
      fetchPreviousMessages.fulfilled.type,
    ];

    await store.dispatch(fetchPreviousMessages());
  });

  test('clearChatMessages should dispatch the correct actions', async () => {
    const expectedActions = [
      clearChatMessages.pending.type,
      clearChatMessages.fulfilled.type,
    ];

    await store.dispatch(clearChatMessages(1));

    const dispatchedActions = store.getState().chat.status;
  });
});
