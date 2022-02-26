<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Main" active>
        <b-card-text>
          <MainTable :nested="content.nested" />
        </b-card-text>
      </b-tab>
      <b-tab title="Table">
        <b-card-text>Tab contents TABLE</b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
  import MainTable from '@/components/MainTab'

  export default {
    name: 'tabs',
    components: { MainTable },
    props: {
      content: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>
