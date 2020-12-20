<template>
  <v-dialog v-model="show" persistent max-width="360">
    <v-card>
      <v-card-text class="dialog-content ">
        <v-icon size="48" color="success" class="mb-4">mdi-calendar-check</v-icon>
        <div class="dialog-content__header">
          Thank you!
        </div>
        <div class="dialog-content__message">
          Your order is accepted.
        </div>

        <a href="https://unbiased.co.uk" target="_blank">unbiased.co.uk</a>
        <v-btn class="primary mt-6 " @click="closeClick">ok</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, ctx) {
    const closeClick = () => {
      ctx.emit('close')
    }
    return {
      closeClick
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 16px !important;
  background-color: white;
  overflow: hidden;
  border-radius: 8px;

  &__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  }

  &__message {
    text-align: center;
    font-size: 18px;
  }
}
</style>
