<template>
  <b-row ref="TableTab">
    <b-col>
      <b-row>
        <b-col>
          <p><strong>End:</strong> {{ end | moment('add', '1 months') | moment('YYYY-MM-DD HH:MM') }}</p>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table striped hover :fields="fields" :items="items" sort-by.sync="period">
            <template #cell(period)="data">
              <div class="d-flex">
                {{ data.value.period }}
                <b-form-checkbox
                  v-model="data.value.check"
                  @change="changeCheck(data.value.id, $event)"
                />
              </div>
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
  import { mapActions } from 'vuex'

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
        const maxPeriod = Math.max.apply(Math, this.table.map((item) => {
          return item.period;
        }))
        const item = this.table.find((item) => item.period === maxPeriod)
        return item.start
      },
      items() {
        return this.table.map((item) => {
          return {
            period: { id: item.id, period: item.period, check: item.check },
            qwe: item.qwe,
            rty: item.rty,
            start: item.start,
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'updateTableItem'
      ]),
      changeCheck(id, value) {
        console.log(`changeCheck method: id = ${id}, value = ${value}`)
        this.updateTableItem({ id: id, check: value })
      }
    }
  }
</script>
