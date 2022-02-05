<template>
  <template>
    <a-steps :current="current">
      <a-step>
        <!-- <span slot="title">Finished</span> -->
        <template #title>Finished</template>
        <template #description>
          <span>This is a description.</span>
        </template>
      </a-step>
      <a-step
        title="In Progress"
        sub-title="Left 00:00:08"
        description="This is a description."
      />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
  </template>
</template>

<script>
export default {
  name: "Steps",
  props: {
    current: {
      default: 1,
      required: false,
      type: Number,
    },
  },
};
</script>

<style></style>
