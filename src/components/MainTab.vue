<template>
  <b-row ref="MainTab">
    <b-col>
      <b-row class="pt-2">
        <b-col>
          <p><strong>Total price:</strong> {{ totalPrice }}</p>
        </b-col>
      </b-row>

      <b-row v-for="(item, i) in nested" :key="i" class="pb-3" :data-key="i">
        <b-col :class="`j-nested-col-${item.id}`">
          <b-card class="j-nested-card">
            <b-row align-v="end">
              <b-col>
                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  @click="deleteNested(item.key, item.id)"
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
                    :state="validateState(i, 'title')"
                    @change="changeInput(item.key, item.id, 'title', $event)"
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
                    :state="validateState(i, 'price')"
                    @blur="changeInput(item.key, item.id, 'price', $event)"
                  />
                </b-form-group>
              </b-col>

              <template v-for="(field, keyName) in item">
                <b-col cols="12" md="6" v-if="keyName !== 'id' && keyName !== 'key' && keyName !== 'title' && keyName !== 'price'" :key="keyName">
                    <b-form-group
                      :label="`${keyName}:`"
                      label-class="text-capitalize"
                      invalid-feedback="Must contain only a number"
                      :state="validateState(i, 'other')"
                    >
                      <b-form-input
                        v-model="item[keyName]"
                        type="text"
                        :state="validateState(i, 'other')"
                        @blur="changeInput(item.key, item.id, keyName, $event)"
                      />
                    </b-form-group>
                </b-col>
              </template>

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
  import { required, minLength, minValue, decimal, integer } from "vuelidate/lib/validators";

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
        totalPrice: 0.0,
        isValid: true
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
          },
          other: {
            integer
          }
        }
      }
    },
    methods: {
      ...mapActions({
        deleteNestedAction: 'deleteNested',
        showAlert: 'showAlert',
        addNestedAction: 'addNested',
        updateNested: 'updateNested',
        lockDocument: 'lockDocument',
        unlockDocument: 'unlockDocument',
      }),
      deleteNested(key, id) {
        // console.log(`deleteNested method: id = ${id}, key = ${key}`)

        const title = (key) ? 'New Nested' : this.nested.find((item) => item.id === id).title

        let data
        if (typeof id !== 'undefined') {
          data = { id: id, deleted: true }
        } else {
          data = { key: key }
        }

        this.deleteNestedAction(data)
        this.showAlert(`The "${title}" has deleted`)
      },
      addNested() {
        let key = Math.max.apply(Math, this.nested.map((item) => {
          return item.key + 1;
        }))
        if (!key) {
          key = this.nested.length
        }
        this.addNestedAction(key)
      },
      updatePrice() {
        // console.log('updatePrice method')
        let price = 0.0

        this.nested.map((item) => {
          if (item.price || item.price !== '') price = price + parseFloat(item.price)
        })

        this.$set(this, 'totalPrice', price)
      },
      validateState(i, name) {
        // console.log(`validateState method`)
        // console.log(`validateState method: key = ${i}, name = ${name}`)

        const { $invalid } = this.$v.nested.$each[i][name]
        this.$set(this, 'isValid', !this.$v.nested.$invalid)

        return $invalid ? !$invalid : null;
      },
      changeInput(key, id, name) {
        console.log(`changeInput method: key = ${key}, id = ${id}, name = ${name}`)

        let value
        if (typeof id !== 'undefined') {
          value = this.nested.find((item) => item.id === id)[name]
        }
        if (typeof key !== 'undefined') {
          value = this.nested.find((item) => item.key === key)[name]
        }

        this.$v.$touch()

        let data
        if (typeof id === 'undefined') {
          data = { key: key, [name]: value }
        } else {
          data = { id: id, [name]: value }
        }
        this.updateNested(data)
      },
    },
    mounted() {
      this.updatePrice()
    },
    updated() {
      this.updatePrice()
    },
    watch: {
      isValid: {
        handler(value) {
          if (value) {
            this.unlockDocument()
          } else {
            this.lockDocument()
          }
        }
      }
    }
  }
</script>

<style lang="sass">
  .form
    label
      font-weight: bold
</style>
