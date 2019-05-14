<template>
    <div>
      这里是个人消息部分：
      {{this.$route.params.openID}}
    </div>
</template>

<script>
    export default {
        name: "web_personalMessage"
    }
</script>

<style scoped>

</style>
