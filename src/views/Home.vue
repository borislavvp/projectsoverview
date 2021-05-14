<template>
  <div class="relative">
    <documents-list />
  </div>
</template>

<script>
  import DocumentsList from "@/components/DocumentsList.vue";

  export default {
    name: "Home",
    components: {
      DocumentsList,
    },
  };
</script>
