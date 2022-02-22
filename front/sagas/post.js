import { all, fork, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from "../reducers/post";


function addPostAPI(data) {
  return axios.post('/api/post/${data.postId}/comment', data)
}

function addCommentAPI(data) {
  return axios.post('/api/post', data)
}


function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    console.log('saga logIn');
    yield delay(1000)
    yield put({
      type: ADD_POST_SUCCESS,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.responce.data
    })
  }
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data)
    console.log('saga logIn');
    yield delay(1000)
    yield put({
      type: ADD_COMMENT_SUCCESS,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.responce.data
    })
  }
}


function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* userSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment)
  ])
}