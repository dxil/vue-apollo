<template>
  <div class="hello">
    <input type="text" v-model="name" placeholder="2017年7月投资会">
    <input type="text" v-model="count" placeholder="调用次数">
    <select v-model="num">
      <option disabled value="">请选择层级</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="g_search()">GraphQL搜索</button>
    <button @click="r_search()">Restful搜索</button>
    <div>
      <h1>GraphQL:</h1>
      <ul>
        <li>Result:{{g_result}}</li>
        <li>Time:  {{g_time}}ms</li>
      </ul>
    </div>
    <div>
      <h1>Restful:</h1>
      <ul>
        <li>Result:{{r_result}}</li>
        <li>Time:  {{r_time}}ms</li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import axios from 'axios'
/* eslint-disable */
const g_ql1 = gql`query searchMeeting1($name: String!){
        meeting(name: $name) {
          _id
          name
          status
        }
      }`
const g_ql2 = gql`query searchMeeting2($name: String!){
        meeting(name: $name) {
          _id
          name
          status
          application {
            _id
            meetingId
            corporationId
            name
          }
        }
      }`
const g_ql3 = gql`query searchMeeting3($name: String!){
        meeting(name: $name) {
          _id
          name
          status
          application {
            _id
            meetingId
            corporationId
            name
            company {
              shareCode
              shareType
            }
          }
        }
      }`
export default {
  name: 'hello',
  data () {
    return {
      meeting: '',
      name: '',
      num: '',
      r_time: 0,
      g_time: 0,
      count: 1,
      g_result: '',
      r_result: ''
    }
  },
  // Apollo-specific options
//  apollo: {
//    // Query with parameters
//    Meeting: {
//      // gql query
//      query: g_ql1,
//      pollInterval: 3000, // 轮询
//      // Static parameters
//      variables () {
//        return {
//          name: '2017年7月投资会'
//        }
//      },
//      result (data) {
//        console.log(data)
//      },
//      update (data) {
//        return data.meeting
//      }
//    }
//  },
  methods: {
    g_search () {
//      this.name = this.$refs.searchName.value
      let g_ql
      switch (this.num) {
        case '1':
          g_ql = g_ql1
          break;
        case '2':
          g_ql = g_ql2
          break;
        case '3':
          g_ql = g_ql3
          break;
        default:
          g_ql = g_ql1
          break;
      }
      let startTime = new Date().getTime()
      for (let i = 0; i < this.count; i++) {
        this.$apollo.addSmartQuery('Meeting', {
          query: g_ql,
          variables () {
            return {
              name: '2017年7月投资会'
            }
          },
          result (data) {
//            this.g_result = data
            //            console.log(data)
          },
          update (data) {
            return data.meeting
          }
        })
      }
      this.g_time = new Date().getTime() - startTime
    },
    async r_search (num) {
      num = this.num || 1
//      console.log(this.name)
      const name = this.name || '2017年7月投资会'
      let response = ''
      let startTime = new Date().getTime()
      for (let i = 0; i < this.count; i++) {
        response = await axios.request(`http://localhost:8080/index/${num}?name=${name}`)
      }
//      this.r_result = response.data
//      console.log(response.data)
      this.r_time = new Date().getTime() - startTime
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

/*li {*/
  /*display: inline-block;*/
  /*margin: 0 10px;*/
/*}*/

a {
  color: #42b983;
}
</style>
