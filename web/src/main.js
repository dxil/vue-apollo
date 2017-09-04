// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient, createNetworkInterface, createBatchingNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

// Create the network interface
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
})

// Create the batching network interface
const networkBatchingInterface = createBatchingNetworkInterface({
  uri: 'http://localhost:8080/graphql',
  batchInterval: 10,
  batchMax: 10,
  opts: {}
})

console.log(networkBatchingInterface)

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: networkInterface,
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Install the vue plugin
Vue.use(VueApollo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App),
  template: '<App/>'
  // components: { App }
})
