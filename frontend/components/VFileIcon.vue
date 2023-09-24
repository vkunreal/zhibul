<template>
  <span style="width: 32px; height: 32px">
    <svg v-if="icon === 'book'" width="32" height="32">
      <use xlink:href="@/static/icons.svg#book" />
    </svg>
    <svg v-if="icon === 'options'" width="32" height="32">
      <use xlink:href="@/static/icons.svg#options" />
    </svg>
    <svg v-if="icon === 'warning'" width="32" height="32">
      <use xlink:href="@/static/icons.svg#warning" />
    </svg>
  </span>
</template>

<script>
export default {
  name: "VFileIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
