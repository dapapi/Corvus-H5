<template>
  <div class="upload-main">
    <div class="file">+</div>
    <input type="file" />
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data () {
    return {}
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
.upload-main {
  position: relative;
  display: inline-block;
  width: .8rem;
  height: .8rem;
  cursor: pointer;
  input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  .file {
    width: .8rem;
    height: .8rem;
    font-size: .8rem;
    text-align: center;
    line-height: .8rem;
    color: #E0E0E0;
    border: 1px dashed #E0E0E0;
  }
}
</style>
