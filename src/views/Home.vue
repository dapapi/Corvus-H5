<template>
  <div class="home">
    CRM-H5
    <ul>
      <li>
        任务新增 /task/add
      </li>
      <li>
        任务概况 /task/detail/id (任务id)
      </li>
      <li>
        任务编辑/task/edit/id
      </li>
      <li>
        客户新增 /client/add
      </li>
      <li>
        客户概况 /client/detail/id (客户id)
      </li>
      <li>
        客户编辑/client/edit/id
      </li>
       <li>
        销售线索新增 /trail/add
      </li>
      <li>
        销售线索概况 /trail/detail/id (线索id)
      </li>
      <li>
        销售线索编辑/trail/edit/id
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
ul li {
  margin: .2rem;
  font-size: .32rem;
}
</style>
