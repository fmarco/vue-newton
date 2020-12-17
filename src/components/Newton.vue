<template>
  <div>
    <div v-if="!loading" class="form">
      <h1>solve calculus problems</h1>
      <input v-model="formula" placeholder="Insert your formula">
      <br /><br />
      <span>Choose an operation</span><br />
      <select v-model="selectedOperation">
        <option v-for="(option, index) in operations" v-bind:value="option.value" v-bind:key="index">
          {{ option.label }}
        </option>
      </select>
      <br /><br />
      <button v-on:click="solveFormula">Run</button>
      <button v-on:click="resetAll">Reset</button>
      <button v-if="history.length > 0" v-on:click="clearHistory">Clear history</button>
      <br /><br />
      <span v-if="result">Result: {{result}}</span>
      <br /><br />
      <span v-if="history.length > 0">History</span>
      <History />
    </div>
    <h1 v-if="loading">Solving...</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import History from './History'

export default {
  name: 'Newton',
  components: {
    History
  },
  computed: {
    ...mapState(['history', 'loading', 'result', 'operations']),
    selectedOperation: {
      get() {
        return this.$store.state.selectedOperation
      },
      set(value) {
        this.$store.commit('SET_OPERATION', value)
      },
    },
    formula: {
      get() {
        return this.$store.state.formula
      },
      set(value) {
        this.$store.commit('SET_FORMULA', value)
      },
    }
  },
  methods: {
    ...mapActions(['solveFormula', 'clearHistory', 'resetAll',]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

table, td, tr, th {
  margin-left: 10%;
  border: 2px solid black;
}

</style>
