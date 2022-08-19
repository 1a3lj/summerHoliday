<template>
    <div>

<router-view></router-view>
</div>
</template>
<script>
import center from './views/center.vue';

const state = {
  islogin:false,
  loginName:'null'
}
export default{
    components: { center },
}
</script>
