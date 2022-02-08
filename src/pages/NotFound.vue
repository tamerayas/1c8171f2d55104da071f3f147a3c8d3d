<template>
  <a-result status="404" title="404" sub-title="Üzgünüz bu kayıt silinmiş!">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">Back Home</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
