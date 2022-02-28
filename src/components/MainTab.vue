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
                  @click="deleteNested(i)"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Title:"
                  invalid-feedback="This is a required field."
                  :state="validateState(i, 'title')"
                >
                  <b-form-input
                    v-model="item.title"
                    type="text"
                    @blur="checkInput(i, 'title')"
                    :state="validateState(i, 'title')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  label="Price:"
                  invalid-feedback="This is a required field and must contain only a number"
                  :state="validateState(i, 'price')"
                >
                  <b-form-input
                    v-model="item.price"
                    type="text"
                    @blur="checkInput(i, 'price')"
                    :state="validateState(i, 'price')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" v-if="item.foo">
                <b-form-group
                  label="Foo:"
                >
                  <b-form-input
                    v-model="item.foo"
                    type="text"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" v-if="item.bar">
                <b-form-group
                  label="Bar:"
                >
                  <b-form-input
                    v-model="item.bar"
                    type="text"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" v-if="item.baz">
                <b-form-group
                  label="Baz:"
                >
                  <b-form-input
                    v-model="item.baz"
                    type="text"
                  />
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
  import { validationMixin } from "vuelidate";
  import { required, minLength, minValue, decimal } from "vuelidate/lib/validators";

  export default {
    name: 'main-tab',
    mixins: [validationMixin],
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
    validations: {
      nested: {
        $each: {
          title: {
            required,
            minLength: minLength(1)
          },
          price: {
            required,
            minValue: minValue(0.0),
            decimal
          }
        }
      }
    },
    methods: {
      ...mapActions({
        deleteNestedAction: 'deleteNested',
        showAlert: 'showAlert',
        addNested: 'addNested'
      }),
      deleteNested(key) {
        console.log(`deleteNested method: key = ${key}`)

        const title = this.nested[key].title

        this.deleteNestedAction(key)
        this.showAlert(`The "${title}" has deleted`)
      },
      updatePrice() {
        console.log('updatePrice method')
        let price = 0.0

        this.nested.map((item) => {
          if (item.price || item.price !== '') price = price + parseFloat(item.price)
        })

        this.$set(this, 'totalPrice', price)
      },
      validateState(i, name) {
        console.log(`validateState method: key = ${i}, name = ${name}`)

        const { $invalid } = this.$v.nested.$each[i][name]
        return $invalid ? !$invalid : null;
      },
      checkInput(i, name) {
        console.log('checkInputs method')
        this.$v.$touch()
        this.validateState(i, name)
      },
    },
    mounted() {
      this.updatePrice()
    },
    beforeUpdate() {
      this.updatePrice()
    },
  }
</script>

<style lang="sass">
  .form
    label
      font-weight: bold
</style>
