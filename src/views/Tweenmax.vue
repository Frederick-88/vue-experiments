<template>
  <div class="main-container">
    <div class="playground">
      <h1 class="playground-title">
        Green Sock Animation Platform (GSAP) - Tweenmax Controller
      </h1>
      <button @click="setupTimeline">Setup Timeline</button>
      <button @click="playTimeline">Play</button>
      <button @click="pauseTimeline">Pause</button>
      <button @click="resumeTimeline">Resume</button>
      <button @click="restartTimeline">Restart</button>
      <button @click="reverseTimeline">Reverse</button>
      <button @click="stopTimeline">Stop</button>
      <button
        :class="{ 'button--active': isLoopTimeline }"
        @click="toggleLoopTimeline"
      >
        Use Loop
      </button>
      <div class="playground-elements">
        <!-- ------------ -->
        <!-- Image Glitch -->
        <!-- ------------ -->
        <div class="image__glitch-container">
          <img
            src="https://offeo-staging-assets.s3.us-east-2.amazonaws.com/external-source/image/shutterstock-273811460.jpg"
            alt="bridge"
          />
          <div
            v-for="order in 3"
            :key="order"
            class="image-glitch__item"
            :class="`item--${order}`"
            :style="imageGlitchItemStyle"
          />
        </div>
        <div class="image__glitch-container container--margin-top">
          <img
            src="https://offeo-staging-assets.s3.us-east-2.amazonaws.com/external-source/image/shutterstock-273811460.jpg"
            alt="bridge"
          />
          <div
            v-for="order in 3"
            :key="order"
            :id="`image-glitch-item-${order}`"
            class="image-glitch__item"
            :class="`item--${order}`"
            :style="imageGlitchItemStyle"
          />
        </div>

        <!-- ---------------- -->
        <!-- Text Light Sweep -->
        <!-- ---------------- -->
        <p ref="lightsweepText" class="text-lightsweep">温良恭俭让</p>

        <!-- ----------------- -->
        <!-- Image Light Sweep -->
        <!-- ----------------- -->
        <div class="image__light-sweep-container">
          <img
            src="https://offeo-staging-assets.s3.us-east-2.amazonaws.com/external-source/image/shutterstock-273811460.jpg"
            alt="shutterstock"
          />
          <div class="image-lightsweep" ref="lightsweepImage">
            <img
              src="https://offeo-staging-assets.s3.us-east-2.amazonaws.com/external-source/image/shutterstock-273811460.jpg"
              alt="shutterstock"
            />
          </div>
        </div>

        <!-- ---------------------------------- -->
        <!-- Video / Other Elements Light Sweep -->
        <!-- ---------------------------------- -->
        <div class="video__light-sweep-container container--margin-top">
          <video playsinline loop autoplay muted>
            <source
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
            />
          </video>

          <div class="video-lightsweep" />
        </div>

        <hr />

        <!-- ----------- -->
        <!-- Text Glitch -->
        <!-- ----------- -->
        <div class="text__glitch-container">
          <h5 class="text-glitch--main">Glitch Text</h5>
          <h5 class="text-glitch--before">Glitch Text</h5>
          <h5 class="text-glitch--after">Glitch Text</h5>
        </div>

        <div class="text__glitch-container container--margin-top">
          <h5 id="text-glitch--main" class="text-glitch--main">Glitch Text</h5>
          <h5 id="text-glitch--before" class="text-glitch--before">
            Glitch Text
          </h5>
          <h5 id="text-glitch--after" class="text-glitch--after">
            Glitch Text
          </h5>
        </div>
      </div>
    </div>

    <hr />

    <div class="playground-testing">
      <h1>Engineering For Tomorrow</h1>
      <button @click="playSampleAnimation">watch here</button>
      <button id="addbutton" @click="animateMe">Add</button>
      <button id="addbutton" @click="stopTimeline">Kill Animations</button>
      <h1 class="header">letsgo</h1>

      <div class="panel">
        <img
          src="https://www.transparentpng.com/thumb/light-bulb/ulA8ip-light-bulb-clipart-hd.png"
          id="light"
        />
        <p id="sample-text">
          Some great line about engineering and how we did something everyone
          will love.
        </p>
        <div class="box"></div>
      </div>
      <div id="circle"></div>
    </div>
  </div>
</template>

<script>
/*
  --- Tweenmax useful urls ---
  https://greensock.com/docs/v2/TweenMax
  https://greensock.com/timelinelite/
  https://greensock.com/docs/v2/Easing
  https://github.com/designcourse/gsap-tweenmax-tutorial-project/blob/master/css/main.scss
  https://github.com/TheDevEnv/vue-gsap-stagger-animation/blob/main/src/App.vue
  https://www.youtube.com/watch?v=sXJKg8SUSLI&feature=youtu.be - timelineLite
  https://greensock.com/understanding-keyframes/ - available on latest version of gsap, where you can use percentage of keyframes
  -----------------------------
*/
import {
  Sine,
  Elastic,
  Linear,
  Back,
  Expo,
  Power0,
  Power2,
  Power3,
} from "gsap/TweenMax"; // easing
import { TweenLite, TweenMax } from "gsap";
import { TimelineLite, TimelineMax } from "gsap/TweenMax";

export default {
  name: "Tweenmax",
  data() {
    return {
      timeline: new TimelineLite(),
      isTimelinePlaying: false,
      isLoopTimeline: true,
      // to ensure consistent glitch result rather than using 'Math.Random()', numbers here are tested to get a good glitch look
      textGlitchSequence: [
        {
          clipBefore: [80, 59],
          clipAfter: [38, 41],
          skewBefore: 0.33,
          skewAfter: 0.33,
        },
        {
          clipBefore: [56, 50],
          clipAfter: [53, 56],
          skewBefore: 0.11,
          skewAfter: 0.46,
        },
        {
          clipBefore: [29, 10],
          clipAfter: [95, 66],
          skewBefore: 0.55,
          skewAfter: 0.94,
        },
        {
          clipBefore: [78, 13],
          clipAfter: [65, 44],
          skewBefore: 0.65,
          skewAfter: 0.02,
        },
        {
          clipBefore: [72, 42],
          clipAfter: [27, 67],
          skewBefore: 0.41,
          skewAfter: 0.2,
        },
        {
          clipBefore: [42, 27],
          clipAfter: [68, 96],
          skewBefore: 0.07,
          skewAfter: 0.36,
        },
        {
          clipBefore: [94, 23],
          clipAfter: [57, 12],
          skewBefore: 0.53,
          skewAfter: 0.34,
        },
        {
          clipBefore: [93, 13],
          clipAfter: [21, 28],
          skewBefore: 0.87,
          skewAfter: 0.15,
        },
        {
          clipBefore: [99, 23],
          clipAfter: [4, 91],
          skewBefore: 0.26,
          skewAfter: 0.54,
        },
        {
          clipBefore: [38, 61],
          clipAfter: [29, 23],
          skewBefore: 0.77,
          skewAfter: 0.54,
        },
        {
          clipBefore: [9, 74],
          clipAfter: [56, 87],
          skewBefore: 1,
          skewAfter: 0.3,
        },
        {
          clipBefore: [51, 89],
          clipAfter: [50, 16],
          skewBefore: 0.92,
          skewAfter: 0.94,
        },
        {
          clipBefore: [61, 4],
          clipAfter: [41, 54],
          skewBefore: 0.64,
          skewAfter: 0.14,
        },
        {
          clipBefore: [75, 57],
          clipAfter: [1, 37],
          skewBefore: 0.5,
          skewAfter: 0.13,
        },
        {
          clipBefore: [58, 56],
          clipAfter: [16, 38],
          skewBefore: 0.77,
          skewAfter: 0.38,
        },
        {
          clipBefore: [93, 68],
          clipAfter: [1, 90],
          skewBefore: 0.59,
          skewAfter: 0.66,
        },
        {
          clipBefore: [1, 43],
          clipAfter: [67, 68],
          skewBefore: 0.38,
          skewAfter: 0.99,
        },
        {
          clipBefore: [10, 19],
          clipAfter: [80, 22],
          skewBefore: 0.94,
          skewAfter: 0.79,
        },
        {
          clipBefore: [83, 6],
          clipAfter: [60, 16],
          skewBefore: 0.19,
          skewAfter: 0.08,
        },
        {
          clipBefore: [57, 61],
          clipAfter: [49, 43],
          skewBefore: 0.8,
          skewAfter: 0.23,
        },
      ],
      imageGlitchSequence: {
        imageGlitchItem2: {
          totalClipPathSequence: 42,
          totalOpacityTransformSequence: 10,
          clipPathSequence: [0, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20, 23, 25, 27, 29, 31, 33, 35, 37, 39, 40, 43, 45, 47, 49, 51, 55, 55, 57, 59, 60, 63, 65, 67, 69, 71, 77, 75, 77, 79, 80, 100],
          opacityTransformSequence: [0, 21, 22, 42, 44, 63, 66, 81, 82, 100],
          clipPathValues: [
            "polygon(0 25%, 100% 25%, 100% 30%, 0 30%)",
            "polygon(0 3%, 100% 3%, 100% 3%, 0 3%)",
            "polygon(0 5%, 100% 5%, 100% 20%, 0 20%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 40%, 100% 40%, 100% 40%, 0 40%)",
            "polygon(0 52%, 100% 52%, 100% 59%, 0 59%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 75%, 100% 75%, 100% 75%, 0 75%)",
            "polygon(0 65%, 100% 65%, 100% 40%, 0 40%)",
            "polygon(0 45%, 100% 45%, 100% 50%, 0 50%)",
            "polygon(0 14%, 100% 14%, 100% 33%, 0 33%)",
            "polygon(0 45%, 100% 45%, 100% 50%, 0 50%)",
            "polygon(0 3%, 100% 3%, 100% 3%, 0 3%)",
            "polygon(0 5%, 100% 5%, 100% 20%, 0 20%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 40%, 100% 40%, 100% 40%, 0 40%)",
            "polygon(0 52%, 100% 52%, 100% 59%, 0 59%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 75%, 100% 75%, 100% 75%, 0 75%)",
            "polygon(0 65%, 100% 65%, 100% 40%, 0 40%)",
            "polygon(0 14%, 100% 14%, 100% 33%, 0 33%)",
            "polygon(0 45%, 100% 45%, 100% 50%, 0 50%)",
            "polygon(0 3%, 100% 3%, 100% 3%, 0 3%)",
            "polygon(0 5%, 100% 5%, 100% 20%, 0 20%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 52%, 100% 52%, 100% 59%, 0 59%)",
            "polygon(0 40%, 100% 40%, 100% 40%, 0 40%)",
            "polygon(0 75%, 100% 75%, 100% 75%, 0 75%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 65%, 100% 65%, 100% 40%, 0 40%)",
            "polygon(0 14%, 100% 14%, 100% 33%, 0 33%)",
            "polygon(0 3%, 100% 3%, 100% 3%, 0 3%)",
            "polygon(0 5%, 100% 5%, 100% 20%, 0 20%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 40%, 100% 40%, 100% 40%, 0 40%)",
            "polygon(0 52%, 100% 52%, 100% 59%, 0 59%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 75%, 100% 75%, 100% 75%, 0 75%)",
            "polygon(0 65%, 100% 65%, 100% 40%, 0 40%)",
            "polygon(0 45%, 100% 45%, 100% 50%, 0 50%)",
            "polygon(0 14%, 100% 14%, 100% 33%, 0 33%)",
            "polygon(0 0, 0 0, 0 0, 0 0)",
          ],
          opacityValues: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        },
        imageGlitchItem3: {
          totalClipPathSequence: 74,
          totalOpacityTransformSequence: 10,
          clipPathSequence: [0, 1.5, 2, 2.5, 3, 5, 5.5, 7, 8, 9, 10.5, 11, 13, 14, 14.5, 15, 16, 18, 20, 21.5, 22, 22.5, 23, 25, 25.5, 27, 28, 29, 30.5, 31, 33, 34, 34.5, 35, 36, 38, 40, 41.5, 42, 42.5, 43, 45, 45.5, 47, 48, 49, 50.5, 51, 53, 54, 54.5, 55, 56, 58, 60, 61.5, 62, 62.5, 63, 65, 65.5, 67, 68, 69, 70.5, 71, 73, 74, 74.5, 75, 76, 78, 80, 100],
          opacityTransformSequence: [0, 21, 22, 42, 44, 63, 66, 81, 82, 100],
          clipPathValues: [
            "polygon(0 1%, 100% 1%, 100% 3%, 0 3%)",
            "polygon(0 10%, 100% 10%, 100% 9%, 0 9%)",
            "polygon(0 5%, 100% 5%, 100% 6%, 0 6%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 10%, 100% 10%, 100% 10%, 0 10%)",
            "polygon(0 30%, 100% 30%, 100% 25%, 0 25%)",
            "polygon(0 15%, 100% 15%, 100% 16%, 0 16%)",
            "polygon(0 40%, 100% 40%, 100% 39%, 0 39%)",
            "polygon(0 20%, 100% 20%, 100% 21%, 0 21%)",
            "polygon(0 60%, 100% 60%, 100% 55%, 0 55%)",
            "polygon(0 30%, 100% 30%, 100% 31%, 0 31%)",
            "polygon(0 70%, 100% 70%, 100% 69%, 0 69%)",
            "polygon(0 40%, 100% 40%, 100% 41%, 0 41%)",
            "polygon(0 80%, 100% 80%, 100% 75%, 0 75%)",
            "polygon(0 50%, 100% 50%, 100% 51%, 0 51%)",
            "polygon(0 90%, 100% 90%, 100% 90%, 0 90%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 100%, 100% 100%, 100% 99%, 0 99%)",
            "polygon(0 70%, 100% 70%, 100% 71%, 0 71%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 100%, 100% 100%, 100% 99%, 0 99%)",
            "polygon(0 10%, 100% 10%, 100% 9%, 0 9%)",
            "polygon(0 5%, 100% 5%, 100% 6%, 0 6%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 10%, 100% 10%, 100% 10%, 0 10%)",
            "polygon(0 30%, 100% 30%, 100% 25%, 0 25%)",
            "polygon(0 15%, 100% 15%, 100% 16%, 0 16%)",
            "polygon(0 40%, 100% 40%, 100% 39%, 0 39%)",
            "polygon(0 20%, 100% 20%, 100% 21%, 0 21%)",
            "polygon(0 60%, 100% 60%, 100% 55%, 0 55%)",
            "polygon(0 30%, 100% 30%, 100% 31%, 0 31%)",
            "polygon(0 70%, 100% 70%, 100% 69%, 0 69%)",
            "polygon(0 40%, 100% 40%, 100% 41%, 0 41%)",
            "polygon(0 80%, 100% 80%, 100% 75%, 0 75%)",
            "polygon(0 50%, 100% 50%, 100% 51%, 0 51%)",
            "polygon(0 90%, 100% 90%, 100% 90%, 0 90%)",
            "polygon(0 70%, 100% 70%, 100% 71%, 0 71%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 100%, 100% 100%, 100% 99%, 0 99%)",
            "polygon(0 10%, 100% 10%, 100% 9%, 0 9%)",
            "polygon(0 5%, 100% 5%, 100% 6%, 0 6%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 10%, 100% 10%, 100% 10%, 0 10%)",
            "polygon(0 30%, 100% 30%, 100% 25%, 0 25%)",
            "polygon(0 15%, 100% 15%, 100% 16%, 0 16%)",
            "polygon(0 60%, 100% 60%, 100% 55%, 0 55%)",
            "polygon(0 30%, 100% 30%, 100% 31%, 0 31%)",
            "polygon(0 40%, 100% 40%, 100% 39%, 0 39%)",
            "polygon(0 20%, 100% 20%, 100% 21%, 0 21%)",
            "polygon(0 80%, 100% 80%, 100% 75%, 0 75%)",
            "polygon(0 50%, 100% 50%, 100% 51%, 0 51%)",
            "polygon(0 70%, 100% 70%, 100% 69%, 0 69%)",
            "polygon(0 40%, 100% 40%, 100% 41%, 0 41%)",
            "polygon(0 90%, 100% 90%, 100% 90%, 0 90%)",
            "polygon(0 70%, 100% 70%, 100% 71%, 0 71%)",
            "polygon(0 10%, 100% 10%, 100% 9%, 0 9%)",
            "polygon(0 5%, 100% 5%, 100% 6%, 0 6%)",
            "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
            "polygon(0 10%, 100% 10%, 100% 10%, 0 10%)",
            "polygon(0 30%, 100% 30%, 100% 25%, 0 25%)",
            "polygon(0 15%, 100% 15%, 100% 16%, 0 16%)",
            "polygon(0 40%, 100% 40%, 100% 39%, 0 39%)",
            "polygon(0 20%, 100% 20%, 100% 21%, 0 21%)",
            "polygon(0 60%, 100% 60%, 100% 55%, 0 55%)",
            "polygon(0 30%, 100% 30%, 100% 31%, 0 31%)",
            "polygon(0 70%, 100% 70%, 100% 69%, 0 69%)",
            "polygon(0 40%, 100% 40%, 100% 41%, 0 41%)",
            "polygon(0 80%, 100% 80%, 100% 75%, 0 75%)",
            "polygon(0 50%, 100% 50%, 100% 51%, 0 51%)",
            "polygon(0 90%, 100% 90%, 100% 90%, 0 90%)",
            "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
            "polygon(0 100%, 100% 100%, 100% 99%, 0 99%)",
            "polygon(0 70%, 100% 70%, 100% 71%, 0 71%)",
            "polygon(0 0, 0 0, 0 0, 0 0)",
          ],
          opacityValues: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        },
      },

      // original image sequence - 25 jan 2022
      // originalImageGlitchSequence: {
      //   imageGlitchItem2: {
      //     totalClipPathSequence: 12,
      //     totalOpacityTransformSequence: 4,
      //     clipPathSequence: [0, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20, 100],
      //     opacityTransformSequence: [0, 21, 22, 100],
      //     clipPathValues: [
      //       'polygon(0 25%, 100% 25%, 100% 30%, 0 30%)',
      //       'polygon(0 3%, 100% 3%, 100% 3%, 0 3%)',
      //       'polygon(0 5%, 100% 5%, 100% 20%, 0 20%)',
      //       'polygon(0 20%, 100% 20%, 100% 20%, 0 20%)',
      //       'polygon(0 40%, 100% 40%, 100% 40%, 0 40%)',
      //       'polygon(0 52%, 100% 52%, 100% 59%, 0 59%)',
      //       'polygon(0 60%, 100% 60%, 100% 60%, 0 60%)',
      //       'polygon(0 75%, 100% 75%, 100% 75%, 0 75%)',
      //       'polygon(0 65%, 100% 65%, 100% 40%, 0 40%)',
      //       'polygon(0 45%, 100% 45%, 100% 50%, 0 50%)',
      //       'polygon(0 14%, 100% 14%, 100% 33%, 0 33%)',
      //       'polygon(0 0, 0 0, 0 0, 0 0)',
      //     ],
      //     opacityValues: [1, 1, 0, 1],
      //   },
      //   imageGlitchItem3: {
      //     totalClipPathSequence: 20,
      //     totalOpacityTransformSequence: 4,
      //     clipPathSequence: [0, 1.5, 2, 2.5, 3, 5, 5.5, 7, 8, 9, 10.5, 11, 13, 14, 14.5, 15, 16, 18, 20, 100],
      //     opacityTransformSequence: [0, 21, 22, 100],
      //     clipPathValues: [
      //       'polygon(0 1%, 100% 1%, 100% 3%, 0 3%)',
      //       'polygon(0 10%, 100% 10%, 100% 9%, 0 9%)',
      //       'polygon(0 5%, 100% 5%, 100% 6%, 0 6%)',
      //       'polygon(0 20%, 100% 20%, 100% 20%, 0 20%)',
      //       'polygon(0 10%, 100% 10%, 100% 10%, 0 10%)',
      //       'polygon(0 30%, 100% 30%, 100% 25%, 0 25%)',
      //       'polygon(0 15%, 100% 15%, 100% 16%, 0 16%)',
      //       'polygon(0 40%, 100% 40%, 100% 39%, 0 39%)',
      //       'polygon(0 20%, 100% 20%, 100% 21%, 0 21%)',
      //       'polygon(0 60%, 100% 60%, 100% 55%, 0 55%)',
      //       'polygon(0 30%, 100% 30%, 100% 31%, 0 31%)',
      //       'polygon(0 70%, 100% 70%, 100% 69%, 0 69%)',
      //       'polygon(0 40%, 100% 40%, 100% 41%, 0 41%)',
      //       'polygon(0 80%, 100% 80%, 100% 75%, 0 75%)',
      //       'polygon(0 50%, 100% 50%, 100% 51%, 0 51%)',
      //       'polygon(0 90%, 100% 90%, 100% 90%, 0 90%)',
      //       'polygon(0 60%, 100% 60%, 100% 60%, 0 60%)',
      //       'polygon(0 100%, 100% 100%, 100% 99%, 0 99%)',
      //       'polygon(0 70%, 100% 70%, 100% 71%, 0 71%)',
      //       'polygon(0 0, 0 0, 0 0, 0 0)',
      //     ],
      //     opacityValues: [1, 1, 0, 1],
      //   },
      // },
    };
  },
  computed: {
    imageGlitchItemStyle() {
      const style = {};
      const imageUrl =
        "https://offeo-staging-assets.s3.us-east-2.amazonaws.com/external-source/image/shutterstock-273811460.jpg";
      style.background = `url(${imageUrl}) no-repeat 50% 50% / cover`;

      return style;
    },
  },
  methods: {
    playTimeline() {
      this.timeline.play();
      this.isTimelinePlaying = true;
    },
    pauseTimeline() {
      this.timeline.pause();
      this.isTimelinePlaying = false;
    },
    resumeTimeline() {
      this.timeline.resume();
      this.isTimelinePlaying = true;
    },
    restartTimeline() {
      this.timeline.restart();
      this.isTimelinePlaying = true;
    },
    reverseTimeline() {
      this.timeline.reverse();
      this.isTimelinePlaying = true;
    },
    stopTimeline() {
      // need to reset then clear so, the animation will start from beginning while its cleared.
      this.timeline.progress(0);
      this.timeline.clear();
      this.isTimelinePlaying = false;
    },
    toggleLoopTimeline() {
      this.isLoopTimeline = !this.isLoopTimeline;
      this.stopTimeline();
    },

    setupTimeline() {
      // just add the timeline continuously, the next tween/sequence will play after the previous one done automatically.

      // -----------
      // Light Sweep
      // -----------
      const getLightsweepTextWidth = this.$refs.lightsweepText.offsetWidth;

      this.timeline
        .to(
          ".text-lightsweep",
          5,
          {
            backgroundPosition: `${getLightsweepTextWidth + 100}px center`,
            repeat: this.isLoopTimeline ? -1 : 0, // -1 for infinite loop, 0 for no loop
            ease: Sine.easeIn,
          },
          "start"
        )
        .fromTo(
          ".image-lightsweep",
          5,
          {
            webkitMaskPosition: "90%",
          },
          {
            webkitMaskPosition: "0",
            repeat: this.isLoopTimeline ? -1 : 0, // -1 for infinite loop, 0 for no loop
            ease: Sine.easeIn,
          },
          "start"
        )
        .to(
          ".video-lightsweep",
          5,
          {
            left: "150%",
            repeat: this.isLoopTimeline ? -1 : 0, // -1 for infinite loop, 0 for no loop
            ease: Sine.easeIn,
          },
          "start"
        );

      // -----------
      // Text Glitch
      // -----------
      const glitchSteps = 20;

      // here you can change with speed slider as well
      // note - minimum duration so can run well
      const glitchTotalDuration = {
        main: 1,
        before: 5,
        after: 1,
      };

      const fakeAnimationDuration = 50; // lets say glitch duration is 5s (example), it could be 10s as well
      const durationPerGlitchBeforeAnim =
        glitchTotalDuration.before / glitchSteps;
      const durationPerGlitchAfterAnim =
        glitchTotalDuration.after / glitchSteps;
      const maxGlitchBeforeAnimLoop = Math.ceil(
        fakeAnimationDuration / glitchTotalDuration.before
      );
      const maxGlitchAfterAnimLoop = Math.ceil(
        fakeAnimationDuration / glitchTotalDuration.after
      );

      let loopedTextGlitchBeforeAnimStartingTime = 0;
      let loopedTextGlitchAfterAnimStartingTime = 0;

      // loop the animation multiple times - glitch--before section
      for (let i = 0; i < maxGlitchBeforeAnimLoop; i++) {
        for (let index = 0; index < glitchSteps; index++) {
          const { textGlitchSequence } = this;

          // calculate current step with duration, to create keyframe scheme
          // e.g - 10 * (1 / 20) = 10 * 0.05 = 0.5 , then calculate with duration -> e.g 5s, then 5 * 0.5 = 2.5s. and so on because "getCurrentStep" value is based by index
          const getCurrentStep = index * (1 / glitchSteps);
          const glitchBeforeStartPoint = glitchTotalDuration.before * getCurrentStep;

          this.timeline.to(
            "#text-glitch--before",
            durationPerGlitchBeforeAnim,
            {
              clip: `rect(${textGlitchSequence[index].clipBefore[0]}px, 9999px, ${textGlitchSequence[index].clipBefore[1]}px, 0)`,
              transform: `skew(${textGlitchSequence[index].skewBefore}deg)`,
            },
            `start+=${loopedTextGlitchBeforeAnimStartingTime +
              glitchBeforeStartPoint}`
          );
        }

        loopedTextGlitchBeforeAnimStartingTime = glitchTotalDuration.before + loopedTextGlitchBeforeAnimStartingTime;
      }

      // loop the animation multiple times - glitch--after section
      for (let i = 0; i < maxGlitchAfterAnimLoop; i++) {
        for (let index = 0; index < glitchSteps; index++) {
          const { textGlitchSequence } = this;

          // calculate current step with duration, to create keyframe scheme
          // e.g - 10 * (1 / 20) = 10 * 0.05 = 0.5 , then calculate with duration -> e.g 5s, then 5 * 0.5 = 2.5s. and so on because "getCurrentStep" value is based by index
          const getCurrentStep = index * (1 / glitchSteps);
          const glitchAfterStartPoint = glitchTotalDuration.after * getCurrentStep;

          this.timeline.to(
            "#text-glitch--after",
            durationPerGlitchAfterAnim,
            {
              clip: `rect(${textGlitchSequence[index].clipAfter[0]}px, 9999px, ${textGlitchSequence[index].clipAfter[1]}px, 0)`,
              transform: `skew(${textGlitchSequence[index].skewAfter}deg)`,
            },
            `start+=${loopedTextGlitchAfterAnimStartingTime +
              glitchAfterStartPoint}`
          );
        }

        loopedTextGlitchAfterAnimStartingTime = glitchTotalDuration.after + loopedTextGlitchAfterAnimStartingTime;
      }

      // ------------
      // Image Glitch
      // ------------
      const horizontalGap = 10;
      const verticalGap = 5;
      const allSceneDuration = 15;
      const imageGlitchAnimationTime = 5; // fake animation duration, can change later in offeo with sliders

      // "transform: translate3d()" parameters = "translate3d(tx, ty, tz)"
      const txCalculation = -1 * horizontalGap + 'px';
      const tyCalculation = -1 * verticalGap + 'px';
      const xTranslateImageGlitchItem2Values = [
        txCalculation,
        txCalculation,
        0,
        0,
      ];
      const yTranslateImageGlitchItem3Values = [
        tyCalculation,
        tyCalculation,
        0,
        0,
      ];

      const durationPerImageGlitchAnimation = imageGlitchAnimationTime / 100; // css keyframe started from 0 to 100%. if 5 seconds, means 1% = 0.05s.
      const maxImageGlitchLoop = Math.ceil(allSceneDuration / imageGlitchAnimationTime);

      // #2 section
      let loopedImageGlitch2AnimStartingTime = 0;

      // console.log({maxImageGlitchLoop, loopedImageGlitch2AnimStartingTime, durationPerImageGlitchAnimation});
      for (let i = 0; i < maxImageGlitchLoop; i++) {
        const imageGlitchItem2 = this.imageGlitchSequence.imageGlitchItem2;

        // clip-path section
        // console.log('first for', imageGlitchItem2.totalClipPathSequence);
        for (let index = 0; index < imageGlitchItem2.totalClipPathSequence; index++) {
          const currentStep = imageGlitchItem2.clipPathSequence[index];
          const getCurrentClipPathValue = imageGlitchItem2.clipPathValues[index];

          // example -> startPoint = 10 * 4(duration) / 100 = 0.4s, so 10th step or 10% of animation with 4 seconds duration is 0.4s
          const startPoint = currentStep * imageGlitchAnimationTime / 100;

          // console.log('text 2', {currentStep, getCurrentClipPathValue, startPoint}, loopedImageGlitch2AnimStartingTime + startPoint);

          this.timeline.to(
            "#image-glitch-item-2",
            durationPerImageGlitchAnimation,
            {
              webkitClipPath: getCurrentClipPathValue,
            },
            `start+=${loopedImageGlitch2AnimStartingTime + startPoint}`
          );
        }

        // opacity transform section
        // console.log('second for', imageGlitchItem2.totalOpacityTransformSequence);
        for (let index = 0; index < imageGlitchItem2.totalOpacityTransformSequence; index++) {
          const currentStep = imageGlitchItem2.opacityTransformSequence[index];
          const getCurrentOpacityValue = imageGlitchItem2.opacityValues[index];
          const getCurrentXTranslateValue = xTranslateImageGlitchItem2Values[index];

          // example -> startPoint = 10 * 4(duration) / 100 = 0.4s, so 10th step or 10% of animation with 4 seconds duration is 0.4s
          const startPoint = currentStep * imageGlitchAnimationTime / 100;

          // console.log('text 2', {currentStep, getCurrentOpacityValue, getCurrentXTranslateValue, startPoint}, loopedImageGlitch2AnimStartingTime + startPoint);

          this.timeline.to(
            "#image-glitch-item-2",
            durationPerImageGlitchAnimation,
            {
              x: getCurrentXTranslateValue,
              y: 0,
              z: 0,
              opacity: getCurrentOpacityValue,
            },
            `start+=${loopedImageGlitch2AnimStartingTime + startPoint}`
          );
        }

        loopedImageGlitch2AnimStartingTime = imageGlitchAnimationTime + loopedImageGlitch2AnimStartingTime;
      }

      // #3 section
      let loopedImageGlitch3AnimStartingTime = 0;

      for (let i = 0; i < maxImageGlitchLoop; i++) {
        const imageGlitchItem3 = this.imageGlitchSequence.imageGlitchItem3;

        // clip-path section
        for (let index = 0; index < imageGlitchItem3.totalClipPathSequence; index++) {
          const currentStep = imageGlitchItem3.clipPathSequence[index];
          const getCurrentClipPathValue = imageGlitchItem3.clipPathValues[index];

          // example -> startPoint = 10 * 4(duration) / 100 = 0.4s, so 10th step or 10% of animation with 4 seconds duration is 0.4s
          const startPoint = currentStep * imageGlitchAnimationTime / 100;

          this.timeline.to(
            "#image-glitch-item-3",
            durationPerImageGlitchAnimation,
            {
              webkitClipPath: getCurrentClipPathValue,
            },
            `start+=${loopedImageGlitch3AnimStartingTime + startPoint}`
          );
        }

        // opacity transform section
        for (let index = 0; index < imageGlitchItem3.totalOpacityTransformSequence; index++) {
          const currentStep = imageGlitchItem3.opacityTransformSequence[index];
          const getCurrentOpacityValue = imageGlitchItem3.opacityValues[index];
          const getCurrentYTranslateValue = yTranslateImageGlitchItem3Values[index];

          // example -> startPoint = 10 * 4(duration) / 100 = 0.4s, so 10th step or 10% of animation with 4 seconds duration is 0.4s
          const startPoint = currentStep * imageGlitchAnimationTime / 100;

          // console.log('text 3', {currentStep, getCurrentOpacityValue, getCurrentYTranslateValue, startPoint});

          this.timeline.to(
            "#image-glitch-item-3",
            durationPerImageGlitchAnimation,
            {
              x: 0,
              y: getCurrentYTranslateValue,
              z: 0,
              scaleX: -1,
              scaleY: -1,
              scaleZ: 1,
              opacity: getCurrentOpacityValue,
            },
            `start+=${loopedImageGlitch3AnimStartingTime + startPoint}`
          );
        }

        loopedImageGlitch3AnimStartingTime = imageGlitchAnimationTime + loopedImageGlitch3AnimStartingTime;
      }

      this.pauseTimeline(); // need to pause since will only start play when we click play
    },

    // -----------------------
    // -----------------------

    // supposely decimalPlaces = 1, but since this project mostly needs 2 then we update
    convertNumberToDecimal(number, decimalPlaces = 2) {
      const multiplier = Math.pow(10, decimalPlaces);
      return Math.round(number * multiplier) / multiplier;
    },
    playSampleAnimation() {
      this.timeline
        .to(".panel", 1.5, { scaleY: 1, height: "100vh", ease: Circ.easeOut })
        .to("#light", 1, {
          opacity: 1,
          y: 0,
          ease: Back.easeOut.config(1.7),
        })
        .to("#sample-text", 1, { opacity: 1, y: 20 })
        .to(".box", 3, {
          opacity: 1,
          scale: 1,
          ease: Elastic.easeOut.config(1, 0.3),
        });

      if (!this.isTimelinePlaying) {
        this.timeline.play();
      } else {
        this.timeline.reverse();
      }

      this.isTimelinePlaying = !this.isTimelinePlaying;
    },
    animateMe() {
      // this.timeline.fromTo(
      //   ".header",
      //   2,
      //   { opacity: 1, scale: 2, },
      //   { opacity: 0.5, scale: 0.5, }
      // );

      // this.timeline.set(
      //   ".header",
      //   { opacity: 0.5, scale: 2, ease: Elastic.easeOut.config(1, 0.3), },
      //   2,
      // );

      // always wrap tweens/sequences in animation so easy to control
      this.timeline.add(
        TweenMax.fromTo(
          ".header",
          2,
          { opacity: 0.5, color: "yellow" },
          { opacity: 1, color: "white" }
        )
      );

      // (note: TweenLite doesn't support looping)
      // loop example, with yoyo attribute where the loop will come from end
      this.timeline.add(
        TweenMax.fromTo(
          "#circle",
          1,
          { opacity: 0 },
          {
            opacity: 1,
            repeat: -1,
            yoyo: true,
            ease: SlowMo.ease.config(0.01, 0.7, true),
          }
        )
      );

      this.timeline.play();
    },
  },
};
</script>

<style lang="scss">
.main-container {
  padding: 30px;

  button {
    background: none;
    border: 1px solid black;
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 1.5em;
    padding: 0.5em 1em;
    cursor: pointer;

    &:hover {
      transition: background 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
        color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
        border-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      background: blanchedalmond;
      color: black;
      border-color: blanchedalmond;
    }

    &.button--active {
      background: black;
      color: white;
      border-color: black;
    }
  }

  hr {
    margin: 30px 0;
  }

  .playground-testing {
    background: rgb(10, 92, 146);

    h1 {
      font-size: 5em;
      width: 25%;
      color: red;
      line-height: 1em;
    }

    .panel {
      position: absolute;
      width: 55%;
      bottom: 0;
      right: 0;
      background: #eaeaea;
      box-sizing: border-box;
      padding: 15% 7%;
      transform: scaleY(0);
      transform-origin: bottom;

      img {
        width: 120px;
        float: left;
        margin-right: 50px;
        opacity: 0;
        transform: translateY(-200px);
      }

      p {
        font-size: 1.9em;
        width: 80%;
        opacity: 0;
      }

      .box {
        border: 5px solid lightgray;
        width: 65%;
        height: 40%;
        position: absolute;
        left: -7%;
        top: 15%;
        z-index: -1;
        opacity: 0;
        transform: scale(0);
      }
    }

    #circle {
      width: 100px;
      height: 100px;
      background-color: red;
      border-radius: 50%;
    }
  }

  // ----------------
  // Work Purposes
  // ----------------

  .playground {
    background: rgb(153, 212, 97);
    padding: 30px;

    .playground-title {
      margin-bottom: 20px;
    }

    .container--margin-top {
      margin-top: 20px;
    }

    // ----------------
    // Text Light Sweep
    // ----------------
    .text-lightsweep {
      font-size: 50px;
      font-weight: 800;
      margin-top: 20px;
      display: inline-block;
      background-image: linear-gradient(
        315deg,
        rgb(0, 0, 0),
        rgb(225, 226, 57),
        rgb(0, 0, 0)
      );
      background-repeat: no-repeat;
      background-position: -70px center;
      background-size: 70px;
      -webkit-text-fill-color: rgba(0, 0, 0, 0.3);
      background-clip: text;
    }

    // -----------------
    // Image Light Sweep
    // -----------------
    .image__light-sweep-container {
      width: 400px;
      height: 250px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }

      .image-lightsweep {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 5;
        overflow: hidden;

        filter: brightness(1.4);
        -webkit-mask-size: 300%;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 40%,
          rgba(255, 255, 255, 0.75) 45%,
          rgba(255, 255, 255, 0.85) 47%,
          rgba(255, 255, 255, 0.9) 50%,
          rgba(255, 255, 255, 0.85) 53%,
          rgba(255, 255, 255, 0.75) 55%,
          rgba(255, 255, 255, 0) 60%
        );
      }
    }

    // ----------------------------------
    // Video / Other Elements Light Sweep
    // ----------------------------------
    .video__light-sweep-container {
      width: 400px;
      height: 250px;
      position: relative;
      overflow: hidden;

      video {
        width: 100%;
        height: 100%;
        object-fit: cover; // so lightsweep won't overflowed, another approach can be : remove the height & do calculation of the video height and bind with lightsweep
      }

      .video-lightsweep {
        display: block;
        height: 100%;
        width: 44%;
        left: -50%;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 30%,
          rgba(255, 255, 255, 0.8) 70%,
          rgba(255, 255, 255, 0) 100%
        );
        position: absolute;
        top: 0;
        z-index: 3;
        mix-blend-mode: overlay;
      }
    }

    // -----------
    // Text Glitch, reference -> https://codepen.io/cipherbeta/pen/YLdVjw
    // -----------
    .text__glitch-container {
      position: relative;
      color: rgb(255, 255, 255);
      font-size: 3.5rem;
      height: 100px;

      .text-glitch--main,
      .text-glitch--before,
      .text-glitch--after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 20px 0;
      }

      .text-glitch--before {
        left: 2px;
        clip: rect(0, 0, 0, 0);
        text-shadow: -2px 0 #ff00c1;
      }

      .text-glitch--after {
        left: -2px;
        clip: rect(0, 0, 0, 0);
        text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
      }

      &:not(.container--margin-top) {
        .text-glitch--before {
          animation: text-glitch-anim 5s infinite linear;
        }
        .text-glitch--after {
          animation: text-glitch-anim2 1s infinite linear;
        }
      }

      @keyframes text-glitch-anim {
        $steps: 20;
        @for $i from 0 through $steps {
          #{percentage($i*(1/$steps))} {
            // clip-path: inset(random(100) + px, 9999px, random(100) + px, 0);
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
    }

    // ------------
    // Image Glitch, reference -> https://codepen.io/AlainBarrios/pen/OEOKgm
    // ------------

    .image__glitch-container {
      --gap-horizontal: 10px;
      --gap-vertical: 5px;
      --animation-time: 4s;

      width: 400px;
      height: 250px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }

      .image-glitch__item {
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
        z-index: 5;
      }

      .image-glitch__item.item--2,
      .image-glitch__item.item--3 {
        opacity: 0;
        animation-duration: var(--animation-time);
        animation-delay: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        // opacity: 0;
        // transform: translate3d(0, 0, 0);
      }

      &:not(.container--margin-top) {
        .image-glitch__item.item--2 {
          animation-name: image-glitch-anim-2;
        }

        .image-glitch__item.item--3 {
          animation-name: image-glitch-anim-3;
        }
      }

      @keyframes image-glitch-anim-2 {
        0% {
          opacity: 1;
          transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0);
          clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
        }
        3% {
          clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
        }
        5% {
          clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
        }
        7% {
          clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
        }
        9% {
          clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
        }
        11% {
          clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
        }
        13% {
          clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
        }
        15% {
          clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
        }
        17% {
          clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
        }
        19% {
          clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
        }
        20% {
          clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
        }
        21.9% {
          opacity: 1;
          transform: translate3d(calc(-1 * var(--gap-horizontal)), 0, 0);
        }
        22%,
        100% {
          opacity: 0;
          transform: translate3d(0, 0, 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
        }
      }

      @keyframes image-glitch-anim-3 {
        0% {
          opacity: 1;
          transform: translate3d(0, calc(-1 * var(--gap-vertical)), 0) scale3d(-1, -1, 1);
          clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
        }
        1.5% {
          clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
        }
        2% {
          clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
        }
        2.5% {
          clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
        }
        3% {
          clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
        }
        5% {
          clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
        }
        5.5% {
          clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
        }
        7% {
          clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
        }
        8% {
          clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
        }
        9% {
          clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
        }
        10.5% {
          clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
        }
        11% {
          clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
        }
        13% {
          clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
        }
        14% {
          clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
        }
        14.5% {
          clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
        }
        15% {
          clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
        }
        16% {
          clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
        }
        18% {
          clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
        }
        20% {
          clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
        }
        21.9% {
          opacity: 1;
          transform: translate3d(0, calc(-1 * var(--gap-vertical)), 0) scale3d(-1, -1, 1);
        }
        22%,
        100% {
          opacity: 0;
          transform: translate3d(0, 0, 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
        }
      }
    }
  }
}
</style>
