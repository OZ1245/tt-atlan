<template>
  <div id="app">
    <b-alert
      class="j-app-alert"
      :show="alert.show"
      dismissible
      fade
      variant="warning"
      @dismissed="hideAlert"
    >
      <p>{{ alert.message }}</p>
    </b-alert>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <Info :id="doc.id" :status="doc.status" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Tabs :content="doc" v-if="isLoaded"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Info from '@/components/Info'
import Tabs from '@/components/Tabs'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Tabs,
    Info
  },
  data() {
    return {
      isLoaded: false,
    }
  },
  computed: {
    ...mapGetters({
      doc: 'getDoc',
      alert: 'getAlert'
    }),
  },
  methods: {
    ...mapActions([
      'fetchDoc',
      'hideAlert'
    ])
  },
  async created() {
    await this.fetchDoc()
    this.isLoaded = true
  },
  // beforeUpdate() {
  //   console.log('App component - beforeUpdate method')
  //   console.log(this.doc)
  // }
}
</script>

<style lang="sass">
  .j-app-alert
    max-width: 400px
    position: fixed !important
    top: 0
    right: 0
    z-index: 100
</style>
