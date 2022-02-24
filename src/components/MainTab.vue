<template>
  <b-row>
    <b-col>
      <b-row class="pt-2">
        <b-col>
          <p><strong>Total price:</strong> {{ totalPrice }}</p>
        </b-col>
      </b-row>

      <b-row v-for="(item, i) in nested" :key="i" :class="`${i !== 0 ? 'pt-3' : ''}`">
        <b-col>
          <b-card>
            <b-row align-v="end">
              <b-col>
                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  @click="removeNested(item.id)"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </b-col>
            </b-row>

            <form id="nested-form">
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group
                    label="Title:"
                    :label-for="`input-title-${item.id}`"
                  >
                    <b-form-input
                      :id="`input-title-${item.id}`"
                      v-model="item.title"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    label="Price:"
                    :label-for="`input-price-${item.id}`"
                  >
                    <b-form-input
                      :id="`input-price-${item.id}`"
                      v-model="item.price"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6" v-if="item.foo">
                  <b-form-group
                    label="Foo:"
                    :label-for="`input-foo-${item-id}`"
                  >
                    <b-form-input
                      :id="`input-foo-${item-id}`"
                      v-model="item.foo"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6" v-if="item.bar">
                  <b-form-group
                    label="Bar:"
                    :label-for="`input-bar-${item.id}`"
                  >
                    <b-form-input
                      :id="`input-bar-${item.id}`"
                      v-model="item.bar"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6" v-if="item.baz">
                  <b-form-group
                    label="Baz:"
                    :label-for="`input-baz-${item.id}`"
                  >
                    <b-form-input
                      :id="`input-baz-${item.id}`"
                      v-model="item.baz"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </form>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'main-tab',
    computed: {
      ...mapGetters({
        nested: 'getNested',
      }),
      totalPrice() {
        let price = 0.0

        this.nested.map((item) => {
          if (item.price === '') item.price = 0

          price = price + parseFloat(item.price)
        })

        return price
      }
    },
    mounted() {
      this.$store.dispatch('fetchNested')
    },
    methods: {
      removeNested(id) {
        // TODO
        console.log(`removeNested method: id = ${id}`)
      }
    }
  }
</script>

<style lang="sass">
  .form
    label
      font-weight: bold
</style>
