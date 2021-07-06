<template>
  <div class="navbar-item">
    <div
      class="button"
      :class="navbutton.class ? navbutton.class : 'is-outlined is-success'"
      @click="navbutton.onClick">{{ navbutton.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavButton",
  props: ["navbutton"]
});
</script>

<style>

</style>