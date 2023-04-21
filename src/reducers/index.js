import { combineReducers } from "redux";
import { profile } from "./profile";
import { post } from "./post";
import { activity } from "./activity";
import { home } from "./home";
import { search } from "./search";

export const rootReducers = combineReducers({
  home,
  profile,
  post,
  activity,
  search,
});
