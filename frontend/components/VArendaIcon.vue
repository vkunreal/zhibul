<template>
  <span>
    <svg v-if="icon === 'height'" style="fill: black" width="48" height="48">
      <use xlink:href="@/static/icons.svg#height" />
    </svg>
    <svg v-if="icon === 'info'" style="fill: black" width="48" height="48">
      <use xlink:href="@/static/icons.svg#info" />
    </svg>
    <svg
      v-if="icon === 'exclamation-mark'"
      style="fill: black"
      width="48"
      height="48"
    >
      <use xlink:href="@/static/icons.svg#exclamation-mark" />
    </svg>
    <svg v-if="icon === 'options'" style="fill: black" width="48" height="48">
      <use xlink:href="@/static/icons.svg#options" />
    </svg>
    <svg v-if="icon === 'size'" style="fill: black" width="48" height="48">
      <use xlink:href="@/static/icons.svg#size" />
    </svg>
  </span>
</template>

<script>
export default {
  name: "VArendaIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
