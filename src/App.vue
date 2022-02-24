<template>
  <div id="app">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <Info />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Tabs />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Info from '@/components/Info'
import Tabs from '@/components/Tabs'

export default {
  name: 'App',
  components: {
    Tabs,
    Info
  }
}
</script>
