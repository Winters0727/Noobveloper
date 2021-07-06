<template>
  <div class="modal" :class="modal.isActive ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modal.title }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        {{ modal.content }}
      </section>
      <footer class="modal-card-foot">
        <button 
          v-for="button in modal.buttons"
          :key="button.label"
          class="button"
          :class="button.class"
          @click="button.onClick">{{ button.label }}</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: ["modal"],
  methods: {
      closeModal() {
          this.$emit("close");
      }
  }
});
</script>

<style>

</style>