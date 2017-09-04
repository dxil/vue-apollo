<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
export default {
  name: 'app'
  // Apollo-specific options
//  apollo: {
//    // Query with parameters
//    author: {
//      // gql query
//      query: gql`query getAuthor($id: Int!){
//        author(id: $id) {
//          firstName
//          lastName
//          posts {
//            id
//            title
//          }
//        }
//      }`,
//      // Static parameters
//      variables () {
//        return {
//          id: 1
//        }
//      },
//      result (data) {
//        console.log(data)
//        if (data.author) {
//          console.log(data.author.firstName)
//        }
//      }
//    }
//  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
