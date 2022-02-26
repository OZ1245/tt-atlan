<template>
  <b-row ref="MainTab">
    <b-col>
      <b-row class="pt-2">
        <b-col>
          <p><strong>Total price:</strong> {{ totalPrice }}</p>
        </b-col>
      </b-row>

      <b-row v-for="(item, i) in nested" :key="i" class="pb-3">
        <b-col :class="`j-nested-col-${item.id}`">
          <b-card class="j-nested-card">
            <b-row align-v="end">
              <b-col>
                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  @click="deleteNested(item.id)"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Title:"
                >
                  <b-form-input
                    v-model="item.title"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Price:"
                >
                  <b-form-input
                    v-model="item.price"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" v-if="item.foo">
                <b-form-group
                  label="Foo:"
                >
                  <b-form-input
                    v-model="item.foo"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" v-if="item.bar">
                <b-form-group
                  label="Bar:"
                >
                  <b-form-input
                    v-model="item.bar"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" v-if="item.baz">
                <b-form-group
                  label="Baz:"
                >
                  <b-form-input
                    v-model="item.baz"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button
            variant="primary"
            @click="addNested"
          >
            <b-icon icon="plus" aria-hidden="true"></b-icon>
            Add new
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'main-tab',
    props: {
      nested: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        totalPrice: 0.0
      }
    },
    methods: {
      ...mapActions({
        deleteNestedAction: 'deleteNested',
        showAlert: 'showAlert'
      }),
      deleteNested(id) {
        console.log(`deleteNested method: id = ${id}`)

        const title = this.nested.filter((item) => item.id === id)[0].title

        this.deleteNestedAction(id)
        this.showAlert(`The "${title}" is deleted`)

        this.updatePrice()
      },
      addNested() {
        // TODO
        console.log(`addNested method`)
      },
      updatePrice() {
        console.log('updatePrice method')
        let price = 0.0

        this.nested.map((item) => {
          if (item.price === '') item.price = 0.0

          price = price + parseFloat(item.price)
        })

        this.$set(this, 'totalPrice', price)
      }
    },
    mounted() {
      this.updatePrice()
    }
  }
</script>

<style lang="sass">
  .form
    label
      font-weight: bold
</style>
