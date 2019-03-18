<template>
    <div>
      <Row class="code-row-bg" type="flex" justify="center" align="top">

        <!--导航栏部分-->
        <i-col span="3">
          传递过来的值{{this.$route.params.open_id}}
        </i-col>
        <Divider type="vertical" />
        <!--调用组件化部分-->
        <i-col span="10" style="border: 1px solid black">
          <router-view></router-view>
        </i-col>
      </Row>

    </div>
</template>

<script>
    export default {
        name: "Web_setting"
    }
</script>

<style scoped>

</style>
