<template>
  <b-row ref="TableTab">
    <b-col>
      <b-row>
        <b-col>
          <p><strong>End:</strong> {{ end }}</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'table-tab',
    props: {
      table: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      end() {
        return '0000-00-00'
      }
    },
  }
</script>
