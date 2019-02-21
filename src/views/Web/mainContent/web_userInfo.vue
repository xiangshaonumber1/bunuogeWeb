<template>
    <div>

      <!--ok header -->
      <Row>
        <i-col span="24">
         <ok-header></ok-header>
        </i-col>
      </Row>

    </div>
</template>

<script>
    import OkHeader from "../header/ok_header";
    export default {
        name: "web_userInfo",
      components: {OkHeader}
    }
</script>

<style scoped>

</style>
