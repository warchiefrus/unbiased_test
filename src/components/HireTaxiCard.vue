<template>
  <v-card class="hire-form" width="400px">
    <v-card-title class="d-flex justify-center">
      Hire taxi
    </v-card-title>
    <v-card-text>
      <v-form ref="formRef">
        <v-text-field
          v-model="formData.fullName"
          :rules="rules['requered']"
          label="Your full name"
          clearable
          validate-on-blur
          prepend-inner-icon="mdi-account"
        />

        <v-text-field
          v-model="formData.cellphone"
          v-mask="'#### ######'"
          :rules="rules['cellphone']"
          label="Your mobile phone"
          clearable
          validate-on-blur
          prefix="+44"
          class="cellphone-input"
        >
        </v-text-field>

        <v-menu
          v-model="isArrivalDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formData.arrivalDate | toDate"
              :rules="rules[('requered', 'todayOrMore')]"
              label="Date of arrival"
              readonly
              v-bind="attrs"
              v-on="on"
              prepend-inner-icon="mdi-calendar"
              hint="MM/DD/YYYY format"
              persistent-hint
            />
          </template>
          <v-date-picker
            v-model="formData.arrivalDate"
            no-title
            validate-on-blur
            @input="isArrivalDateMenu = false"
          ></v-date-picker>
        </v-menu>

        <v-autocomplete
          v-model="formData.airportId"
          :rules="rules['requered']"
          :loading="isAirportsLoading"
          item-value="id"
          item-text="name"
          :items="airports"
          label="Airport"
          clearable
          validate-on-blur
          prepend-inner-icon="mdi-airplane-landing"
          @input="formData.terminal = ''"
        />

        <v-select
          v-if="terminals.length"
          v-model="formData.terminal"
          :items="terminals"
          label="Terminal"
          clearable
          validate-on-blur
          prepend-inner-icon="mdi-garage-open"
        />

        <v-text-field
          v-model="formData.airflightNumber"
          v-mask="'ANNNNNN'"
          :rules="rules['airflightNumber']"
          label="Airflight number"
          clearable
          validate-on-blur
          prepend-inner-icon="mdi-airplane"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-center pb-4">
      <v-btn class="primary" :loading="isLoading" @click="submitForm">
        Send
      </v-btn>
    </v-card-actions>
    <ConfirmDialog :show="isConfirmDialog" @close="closeConfirmDialog" />
  </v-card>
</template>

<script>
import { defineComponent, ref, computed, watch, reactive, onMounted } from '@vue/composition-api'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import taxiOrderFormData from '@/entity/taxiOrderFormData'
import BaseRules from '@/rules/'
import GET_AIRPORTS from '@/graphql/queries/getAirports.gql'
import ADD_TAXI_ORDER from '@/graphql/mutations/addTaxiOrder.gql'

export default defineComponent({
  components: {
    ConfirmDialog
  },

  setup(props, ctx) {
    const store = ctx.root.$store
    const apollo = ctx.root.$apollo

    const formRef = ref('')
    const formData = reactive(new taxiOrderFormData())
    const rules = {
      requered: [BaseRules.fieldRequired],
      cellphone: [BaseRules.fieldRequired, BaseRules.UKCellphone],
      airflightNumber: [BaseRules.fieldRequired, BaseRules.airflightNumber],
      todayOrMore: [BaseRules.todayOrMore]
    }

    const isArrivalDateMenu = ref(false)

    const airports = computed(() => {
      return store.getters['hireTaxi/getAirports']
    })
    const terminals = computed(() => {
      let result = []
      if (formData.airportId) {
        result = airports.value.find(item => item.id === formData.airportId).terminals
      }
      return result
    })

    const isLoading = ref(false)
    const submitForm = async () => {
      if (formRef.value.validate()) {
        isLoading.value = true
        const response = await apollo.mutate({
          mutation: ADD_TAXI_ORDER,
          variables: {
            input: formData
          }
        })

        if (response.data.addTaxiOrder) {
          isConfirmDialog.value = true
          formData.id = response.data.addTaxiOrder
          localStorage.setItem('lastOrder', JSON.stringify(formData))
          Object.assign(formData, new taxiOrderFormData())
          formRef.value.resetValidation()
        }
        isLoading.value = false
      }
    }
    const isConfirmDialog = ref(false)
    const closeConfirmDialog = () => {
      isConfirmDialog.value = false
      window.open('https://unbiased.co.uk', '_blank')
    }

    const isAirportsLoading = ref(false)
    onMounted(() => {
      isAirportsLoading.value = true
      window.requestAnimationFrame(async () => {
        const response = await apollo.query({ query: GET_AIRPORTS })
        if (response.data.getAirports) {
          store.commit('hireTaxi/SET_AIRPORTS', response.data.getAirports)
        }
        isAirportsLoading.value = false
      })
    })

    return {
      formRef,
      formData,
      rules,
      isArrivalDateMenu,
      airports,
      terminals,
      isConfirmDialog,
      closeConfirmDialog,
      submitForm,
      isAirportsLoading,
      isLoading
    }
  }
})
</script>

<style lang="scss">
.cellphone-input {
  .v-text-field__slot {
    .v-label.v-label--active.theme--light {
      margin-left: 28px;
    }
  }
}
</style>
