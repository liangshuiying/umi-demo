import { queryList } from '@/services/product';
const productModel = {
  namespace: 'product',
  state: {
    proList: [],
  },
  effects: {
    *fetchProduct(_, { call, put }) {
      const response = yield call(queryList);
      yield put({
        type: 'saveProList',
        payload: response,
      });
    },
  },
  reducers: {
    saveProList(state, { payload }) {
      return { ...state, proList: payload || [] };
    },
  },
};
export default productModel;
