<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/tweenmax">Tweenmax</router-link> |
      <router-link to="/glitch-image">Glitch Image</router-link> |
      <router-link to="/mock-progress-bar">Mock Progress Bar</router-link> |
      <router-link to="/video-captureframe">Video Capture Frame</router-link>
    </div>

    <div class="flex glitch-container">
      <h1 class="text-glitch glitch-0-5" glitch-text="Welcome">Welcome</h1>
      <h1 class="text-glitch" glitch-text="to">to</h1>
      <h1 class="text-glitch glitch-2-0" glitch-text="Vue">Vue</h1>
      <h1 class="text-glitch glitch-3-0" glitch-text="Experiment">
        Experiment
      </h1>
    </div>
    <hr />

    <router-view />
    <hr />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:100");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html,
body,
h1 {
  padding: 0;
  margin: 0;
  font-family: "Montserrat", sans-serif;
}

#app {
  background: black;
  // background: white;

  .flex {
    display: flex;
    flex-wrap: wrap;

    h1 {
      margin: 0 10px;
    }
  }
}

.glitch-container {
  // --- reference = https://codepen.io/cipherbeta/pen/YLdVjw
  @mixin text-glitch-scaling($scale) {
    $is-big: $scale > 2;

    @if $is-big {
      animation: text-glitch-skew-scaled 1s infinite linear alternate-reverse;
    } @else {
      animation: text-glitch-skew 1s infinite linear alternate-reverse;
    }

    &::before {
      text-shadow: (-2px * $scale) 0 #ff00c1;
      animation: text-glitch-anim 5s infinite linear alternate-reverse;
    }

    &::after {
      text-shadow: (-2px * $scale) 0 #00fff9,
        (2px * $scale) (2px * $scale) #ff00c1;
      animation: text-glitch-anim2 1s infinite linear alternate-reverse;
    }
  }

  .text-glitch {
    position: relative;
    // color: black;
    color: white;
    font-size: 3.5em;
    letter-spacing: 0.5em;
    animation: text-glitch-skew 1s infinite linear alternate-reverse;

    &::before,
    &::after {
      content: attr(glitch-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &::before {
      left: 2px;
      text-shadow: -2px 0 #ff00c1;
      clip: rect(44px, 450px, 56px, 0);
      animation: text-glitch-anim 5s infinite linear alternate-reverse;
    }

    &::after {
      left: -2px;
      text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
      animation: text-glitch-anim2 1s infinite linear alternate-reverse;
    }
  }

  .glitch-0-5 {
    @include text-glitch-scaling(0.5);
  }

  .glitch-2-0 {
    @include text-glitch-scaling(2);
  }

  .glitch-3-0 {
    @include text-glitch-scaling(2.5);
  }

  // cant include keyframe inside mixin because it's conflicting
  @keyframes text-glitch-anim {
    $steps: 20;
    @for $i from 0 through $steps {
      #{percentage($i*(1/$steps))} {
        clip: rect(random(100) + px, 9999px, random(100) + px, 0);
        transform: skew((random(100) / 100) + deg);
      }
    }
  }

  @keyframes text-glitch-anim2 {
    $steps: 20;
    @for $i from 0 through $steps {
      #{percentage($i*(1/$steps))} {
        clip: rect(random(100) + px, 9999px, random(100) + px, 0);
        transform: skew((random(100) / 100) + deg);
      }
    }
  }

  @keyframes text-glitch-skew {
    $steps: 10;
    @for $i from 0 through $steps {
      #{percentage($i*(1/$steps))} {
        transform: skew((random(10) - 5) + deg);
      }
    }
  }

  // --- scaled
  @keyframes text-glitch-skew-scaled {
    $steps: 10;
    @for $i from 0 through $steps {
      #{percentage($i*(1/$steps))} {
        transform: skew((random(10) - 5) * 2.5 + deg);
      }
    }
  }
}
</style>
