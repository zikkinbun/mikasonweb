<template>
  <div id="app">
    <NavMenu></NavMenu>
    <Container></Container>
  </div>
</template>

<script>
  import '../components/common/style.scss'
  import NavMenu from '../components/common/NavMenu.vue'
  import Container from '../components/common/Container.vue'
  // import { store } from '../store/store'

  export default {
    name: 'app',
    components: {
      NavMenu,
      Container,
      // store,
    }
  }
</script>
