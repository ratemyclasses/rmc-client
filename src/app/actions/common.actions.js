import { createAsyncThunk } from '@reduxjs/toolkit';
import { ACTIONS } from '../constants';

export const reset = createAsyncThunk(ACTIONS.common.reset, async () => true);
