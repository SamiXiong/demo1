import Vue from "vue"

import Vuex from "vuex";

Vue.use(Vuex);
import action from"./action"
import state from "./state"
import mutations from"./mutations"
const store = new Vuex.Store({
    state:state,
    action,
    mutations
})
export default store