<template>
  <div>
    <p>{{ progressText }}</p>
    <p>{{ progressPercent }}%</p>

    <hr />
    <p>Fake progress bar until 10%</p>
    <p>{{ progressPercentWithLimit }}%</p>
  </div>
</template>

<script>
export default {
  name: "MockProgressBar",
  data() {
    return {
      fakeCounter: 0,
      fakeCounterWithLimit: 0,
    };
  },
  computed: {
    progressPercentWithLimit() {
      return this.fakeCounterWithLimit;
    },
    progressPercent() {
      return this.fakeCounter;
    },
    progressText() {
      let text = "";
      if (this.progressPercent >= 0 && this.progressPercent < 30)
        text = "Preparing";
      if (this.progressPercent >= 30 && this.progressPercent < 50)
        text = "Rendering";
      if (this.progressPercent >= 50 && this.progressPercent < 70)
        text = "Converting";
      if (this.progressPercent >= 70 && this.progressPercent < 100)
        text = "Uploading";
      if (this.progressPercent === 100) text = "Done";

      return `${text}...`;
    },
  },
  methods: {
    updateFakeCounter() {
      // max progress is 100
      if (this.fakeCounter < 100) {
        setTimeout(() => {
          this.fakeCounter += 1;
          this.updateFakeCounter();
        }, Math.floor((Math.random() * (2.5 - 1) + 1) * 200)); // can set how fast the fake progress bar here - update the formula by yourself
      }
    },
    updateFakeCounterWithLimit() {
      if (this.fakeCounterWithLimit < 10) {
        setTimeout(() => {
          this.fakeCounterWithLimit += 1;
          this.updateFakeCounterWithLimit();
        }, Math.floor((Math.random() * (2.5 - 1) + 1) * 1000));
      }
    },
  },
  mounted() {
    this.updateFakeCounter();
    this.updateFakeCounterWithLimit();
  },
};
</script>

<style></style>
