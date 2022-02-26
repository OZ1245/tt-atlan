<template>
  <b-row class="py-2" align-v="center">
    <b-col>
      <p class="mb-2">Document <strong>#{{ id }}</strong></p>
      <p class="mb-2">Status: <strong>{{ status }}</strong></p>
    </b-col>
    <b-col class="d-flex justify-content-end">
      <b-button
        variant="success"
        @click="saveDoc"
        class="mx-1"
      >
        <b-icon icon="check2" aria-hidden="true"></b-icon>
        Save
      </b-button>
      <b-button
        variant="danger"
        @click="deleteDoc"
        class="mx-1"
      >
        <b-icon icon="trash" aria-hidden="true"></b-icon>
        Delete
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'info',
    props: {
      id: {
        type: Number,
        default: 0
      },
      status: {
        type: String,
        default() {
          return 'Pending'
        }
      }
    },
    methods: {
      saveDoc() {
        // TODO
        console.log('saveDoc method')
      },
      deleteDoc(){
        // TODO
        console.log('deleteDoc method')
      }
    }
  }
</script>
