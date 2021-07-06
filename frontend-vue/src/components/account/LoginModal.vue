<template>
  <div class="modal" :class="isActive ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        asdf
      </section>
      <footer class="modal-card-foot">

      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginModal",
  props: ["isActive"],
  methods: {
      closeModal() {
          this.$emit("close");
      }
  }
});
</script>

<style>

</style>