<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Main" active>
        <b-card-text>
          <MainTab :nested="content.nested" />
        </b-card-text>
      </b-tab>
      <b-tab title="Table">
        <TableTab :table="content.table" />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
  import MainTab from '@/components/MainTab'
  import TableTab from '@/components/TableTab'

  export default {
    name: 'tabs',
    components: {
      MainTab,
      TableTab
    },
    props: {
      content: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    // beforeUpdate() {
    //   console.log('Tabs component - beforeUpdate method')
    //   console.log(this.content.nested)
    // }
  }
</script>
