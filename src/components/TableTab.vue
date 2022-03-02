<template>
  <b-row ref="TableTab">
    <b-col>
      <b-row>
        <b-col>
          <!-- TODO - Неверная дата -->
          <p><strong>End:</strong> {{ end | moment('add', '1 months') | moment('YYYY-MM-DD') }}</p>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table striped hover :fields="fields" :items="items" sort-by.sync="period">
            <template #cell(period)="data">
              {{ data.value.period }}
              <b-form-checkbox
                v-model="data.value.check"
              />
            </template>

            <template #cell(qwe)="data">
              {{ data.value }}
            </template>

            <template #cell(rty)="data">
              {{ data.value }}
            </template>

            <template #cell(start)="data">
              {{ data.value | moment('YYYY-MM-DD') }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'table-tab',
    data() {
      return {
        fields: [
          {
            key: 'period',
            sortable: true,
            sortByFormatted(e) {
              return e.period
            }
          },
          {
            key: 'qwe',
            sortable: true
          },
          {
            key: 'rty',
            sortable: true
          },
          {
            key: 'start',
            sortable: true
          }
        ]
      }
    },
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
        // TODO - НЕверная дата
        // const item = this.table.filter((item) => {
        const maxPeriod = Math.max.apply(Math, this.table.map((item) => {
          return item.period;
        }))
        const item = this.table.filter((item) => {
          return item.period === maxPeriod
        })
        return item[0].start
      },
      items() {
        return this.table.map((item) => {
          return {
            period: { period: item.period, check: item.check },
            qwe: item.qwe,
            rty: item.rty,
            start: item.start,
          }
        })
      }
    }
  }
</script>
