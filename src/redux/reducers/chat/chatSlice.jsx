import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL =
  'https://ecommerce-app-legends-bn-production.up.railway.app/api/v1/';
export const fetchPreviousMessages = createAsyncThunk(
  'chat/fetchPreviousMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}chat/messages/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch previous messages');
      }

      const data = await response.json();
      const previousMessages = data.data;

      return previousMessages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, sender }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}chat/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, sender }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      const { message: sentMessage, sender: sentSender, createdAt } = data;

      return { message: sentMessage, sender: sentSender, createdAt };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearChatMessages = createAsyncThunk(
  'chat/clearChatMessages',
  async () => {
    const token = JSON.parse(localStorage.getItem('token'));

    const response = await fetch(`${URL}chat/messages/clear`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
  }
);

export const setInputMessage = (inputMessage) => ({
  type: 'chat/setInputMessage',
  payload: inputMessage,
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setInputMessage: (state, action) => {
      return {
        ...state,
        inputMessage: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreviousMessages.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(fetchPreviousMessages.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          messages: action.payload,
        };
      })
      .addCase(fetchPreviousMessages.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(sendMessage.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          messages: [...state.messages, action.payload],
        };
      })
      .addCase(sendMessage.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      })
      .addCase(clearChatMessages.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      })
      .addCase(clearChatMessages.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          messages: [...state.messages, action.payload],
        };
      })
      .addCase(clearChatMessages.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export default chatSlice.reducer;
