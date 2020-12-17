<template>
  <div>
      <span v-if="history.length > 0">History</span>
      <table v-if="history.length > 0">
        <tr>
          <th>Formula</th>
          <th>Result</th>
          <th>Operation</th>
          <th></th>
        </tr>
        <tr v-for="(entry, index) in history" v-bind:key="index">
          <td>{{ entry.formula }}</td>
          <td>{{ entry.result }}</td>
         <td>{{ entry.operation }}</td>
         <td><button v-on:click="copyFromHistory(index)">Copy</button></td>
         <td><button v-on:click="removeFromHistory(index)">Remove</button></td>
        </tr>
      </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'History',
  computed: {
    ...mapState(['history', 'loading']),
  },
  methods: {
    ...mapActions(
        [
            'copyFromHistory',
            'removeFromHistory'
        ]
    ),
  }
}
</script>
