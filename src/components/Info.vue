<template>
  <b-row class="py-2" align-v="center">
    <b-col>
      <p class="mb-2">Document <strong>#{{ id }}</strong></p>
      <p class="mb-2">Status: <strong>{{ status }}</strong></p>
    </b-col>
    <b-col class="d-flex justify-content-end">
      <b-button
        variant="success"
        class="mx-1"
        :disabled="documentIsLocked"
        @click="saveDoc"
      >
        <b-icon icon="check2" aria-hidden="true"></b-icon>
        Save
      </b-button>
      <b-button
        variant="danger"
        class="mx-1"
        :disabled="documentIsLocked"
        @click="deleteDoc"
      >
        <b-icon icon="trash" aria-hidden="true"></b-icon>
        Delete
      </b-button>

      <b-modal
        title="Confirm action"
        :visible="deleteModalIsOpen"
        ok-title="Yes"
        cancel-title="No"
        :ok-disabled="documentIsLocked"
        :cancel-disabled="documentIsLocked"
        hide-header-close
        @ok="confirmModal"
        @close="closeModal"
      >
        <p>Delete document #100?</p>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'info',
    metaInfo() {
      return {
        title: `Document ${this.id} - ${this.status}`
      }
    },
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
    computed: {
      ...mapGetters([
        'documentIsLocked',
        'deleteModalIsOpen'
      ])
    },
    methods: {
      ...mapActions([
        'saveDocChanges',
        'openModal',
        'closeModal',
        'deleteDocument'
      ]),
      saveDoc() {
        // console.log('saveDoc method')
        this.saveDocChanges()
      },
      deleteDoc(){
        // console.log('deleteDoc method')
        this.openModal()
      },
      confirmModal(e) {
        e.preventDefault()
        this.deleteDocument()
      }
    },
  }
</script>
