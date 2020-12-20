<template>
  <section class="hire-taxi">
    <HireTaxiCard />
  </section>
</template>

<script>
import { defineComponent, ref, computed, watch, reactive } from '@vue/composition-api'
import HireTaxiCard from '@/components/HireTaxiCard.vue'

export default defineComponent({
  components: {
    HireTaxiCard
  }
})
</script>

<style lang="scss" scoped>
.hire-taxi {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff6d7;
  padding: 16px;

  @media (max-width: 719px) {
    & {
      padding: 8px;
    }
  }
}
</style>
