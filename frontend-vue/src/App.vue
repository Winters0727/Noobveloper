<template>
  <nav class="navbar has-background-success-light" role="navigation" arai-label="main navibation" id="navbar">
    <div class="navbar-brand" id="navbar-brand">
      <a class="navbar-item" href="#">
        <img class="image" id="brand-image" :src="require('@/assets/logo.png')" alt="Noobveloper" />
        <p class="content has-text-success">
          <strong>Noobveloper</strong>
        </p>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
      </div>
      <div class="navbar-end">
        <div class="navbar-item" v-for="link in routerLinks" :key="link.label">
          <router-link :class="link.class" :to="link.to">{{  link.label  }}</router-link>
        </div>
        <div v-if="isLogin" class="navbar-item">
          <div class="button is-outlined is-success">logout</div>
        </div>
        <nav-button v-else :navbutton="login" />
      </div>
    </div>
  </nav>
  <login-modal :isActive="loginModalIsActive" @close="closeLoginModal" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginModal from "@/components/account/LoginModal.vue";
import NavButton from "@/components/UI/NavButton.vue";

export default defineComponent({
  name: "App",
  components: {
    "login-modal": LoginModal,
    "nav-button": NavButton
  },
  data() {
    return {
      isLogin: false as boolean,
      loginModalIsActive: false as boolean,
      login: {
        label: "Login",
        onClick: this.showLoginModal
      },
      logout: {
        label: "Logout",
        onClick: null
      },
      routerLinks : [
        {
          class: "button is-outlined is-success",
          label: "Home",
          to: "/"
        },
        {
          class: "button is-outlined is-success",
          label: "About",
          to: "/about"
        }
      ]
    }
  },
  methods: {
    showLoginModal() {
      this.loginModalIsActive = true;
    },
    closeLoginModal() {
      this.loginModalIsActive = false;
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#brand-image {
  margin-right: 5px;
}
</style>
