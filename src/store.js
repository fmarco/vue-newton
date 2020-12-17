import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)


export const BASE_URL = 'https://newton.now.sh/api/v2/'


export const validateInput = (state) => {
  if (state.formula === '') {
    throw 'Empty formula!'
  }
  if (state.selectedOperation === '') {
    throw 'You must choose an operation!'
  }
}


export const state = {
  history: [],
  loading: false,
  result: '',
  formula: '',
  selectedOperation: '',
  operations: [
    { label:  'Simplify', value: 'simplify'},
    { label:  'Factor', value: 'factor'},
    { label:  'Derive', value: 'derive'},
    { label:  'Integrate', value: 'integrate'},
    { label:  'Find 0\'s', value: 'zeroes'},
    { label:  'Find Tangent', value: 'tangent'},
    { label:  'Area Under Curve', value: 'area'},
    { label:  'Cosine', value: 'cos'},
    { label:  'Sine', value: 'sin'},
    { label:  'Tangent', value: 'tan'},
    { label:  'Inverse Cosine', value: 'arccos'},
    { label:  'Inverse Sine', value: 'arcsin'},
    { label:  'Inverse Tangent', value: 'arctan'},
    { label:  'Absolute Value', value: 'abs'},
    { label:  'Logarithm', value: 'log'},
  ]
}


export const mutations = {
  RESET_ALL(state) {
    state.formula = ''
    state.result = ''
    state.selectedOperation = ''
  },
  CLEAR_HISTORY(state) {
    state.history = []
  },
  COPY_FROM_HISTORY(state, index) {
    const entry = state.history[index]
    state.formula = entry.formula
    state.selectedOperation = entry.operation
    state.result = ''
  },
  REMOVE_FROM_HISTORY(state, index) {
    state.history.splice(index, 1)
  },
  START_LOADING(state) {
    state.loading = true
  },
  END_LOADING(state) {
    state.loading = false
  },
  SET_RESULT(state, payload) {
    state.result = payload
  },
  UPDATE_HISTORY(state) {
    state.history.push(
      {
        formula: state.formula,
        result: state.result,
        operation: state.selectedOperation
      }
    )
  },
  SET_OPERATION(state, value) {
    state.selectedOperation = value
  },
  SET_FORMULA(state, value) {
    state.formula = value
  }
}


export const actions = {
  solveFormula: async (context) => {
    context.commit('START_LOADING')
    try {
      validateInput(
        {
          formula: context.state.formula,
          selectedOperation: context.state.selectedOperation
        }
      )
      const response = await axios.get(`${BASE_URL}${context.state.selectedOperation}/${encodeURI(context.state.formula)}`)
      context.commit(
        'SET_RESULT',
        response.data.result
      )
      context.commit('UPDATE_HISTORY')
    } catch(error) {
      context.commit(
        'SET_RESULT',
        error
      )
    }
    context.commit('END_LOADING')
  },
  updateHistory: (context) => {
    context.commit('UPDATE_HISTORY')
  },
  copyFromHistory: (context, index) => {
    console.log(context, index)
    context.commit('COPY_FROM_HISTORY', index)
  },
  removeFromHistory: (context, index) => {
    console.log(context, index)
    context.commit('REMOVE_FROM_HISTORY', index)
  },
  clearHistory: (context) => {
    context.commit('CLEAR_HISTORY')
  },
  resetAll: (context) => {
    context.commit('RESET_ALL')
  }
}


export default new Vuex.Store(
  {
    state: state,
    mutations: mutations,
    actions: actions
  }
)