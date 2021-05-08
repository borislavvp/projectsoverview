<template>
  <div class="home">
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
