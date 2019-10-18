<template>
    <div class="loading" id="loading">
      <Row>

        <Col class="spin-col" span="24">
          <Spin fix size="large">
            <Icon type="ios-loading" size=30 class="spin-icon-load" /><br>
            <div>正在加载数据，请稍后......</div>
          </Spin>
        </Col>

      </Row>
    </div>
</template>

<script>
    export default {
        name: "CommonLoading"
    }
</script>

<style scoped>

  @keyframes ani-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }

  .spin-icon-load{
    animation: ani-spin 1s linear infinite;
  }

  .spin-col{
    height: 300px;
    position: relative;
  }

</style>
