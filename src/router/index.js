import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    },
  },
  {
    path: "/glitch-image",
    name: "GlitchImage",
    component: function() {
      return import(
        /* webpackChunkName: "GlitchImage" */ "../views/GlitchImage.vue"
      );
    },
  },
  {
    path: "/mock-progress-bar",
    name: "MockProgressBar",
    component: function() {
      return import(
        /* webpackChunkName: "MockProgressBar" */ "../views/MockProgressBar.vue"
      );
    },
  },
  {
    path: "/video-captureframe",
    name: "VideoCaptureFrame",
    component: function() {
      return import(
        /* webpackChunkName: "VideoCaptureFrame" */ "../views/VideoCaptureFrame.vue"
      );
    },
  },
  {
    path: "/tweenmax",
    name: "Tweenmax",
    component: function() {
      return import(/* webpackChunkName: "Tweenmax" */ "../views/Tweenmax.vue");
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
