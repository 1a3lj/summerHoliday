<script>
import {createStore} from 'vuex'
const store = createStore({
  state () {
    return {
        loginName:"null",
        islogin:false,
        ismanager:false,
    }
  },
  mutations: {
      updatename(state,n){
          state.loginName = n;
      },
      updateislogin(state,n){
          state.islogin = n;
      },
      updateismanager(state,n){
        state.ismanager = n;
      }
  }
})
export default store;
</script>