<template>
  <div
    ref="thumbnailsRef"
    class="thumbnails w-48 p-4 h-full flex-col overflow-y-auto rounded shadow-inner"
  >
    <span :key="i" :id="i" v-for="(img, i) in thumbnails">
      <div class="flex flex-col mb-4 items-center">
        <img
          v-if="i"
          @click="selectPage(i)"
          :src="img"
          class="transition-default border-2 transform duration-500"
          :class="[
            i === currentPage + 1
              ? ' border-blue-600 shadow-xl'
              : 'opacity-75 hover:opacity-100 hover:border-blue-600  hover:shadow-xl',
          ]"
        />
        <span class="text-gray-700" v-if="i">{{ i }}</span>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "@vue/composition-api";

export default defineComponent({
  props: {
    thumbnails: {
      type: Array,
      required: true,
    },
    flipbook: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const thumbnailsRef = ref((null as unknown) as HTMLElement);

    const currentPage = computed(() =>
      props.flipbook ? props.flipbook.currentPage : 0
    );

    const selectPage = (page: number) => {
      if (page === 1) {
        props.flipbook.currentPage = 2;
        props.flipbook.flipLeft();
      } else if (page === props.thumbnails.length - 1) {
        props.flipbook.currentPage = page - 2;
        props.flipbook.flipRight();
      } else {
        props.flipbook.currentPage = page - 1;
      }
    };

    const scrollToThumbnail = (thumbnailId: number) => {
      const thumbnail = document.getElementById(`${thumbnailId}`);
      if (!thumbnail) {
        return;
      }
      let shouldScroll = false;
      const rectElem = thumbnail.getBoundingClientRect();
      const rectContainer = thumbnailsRef.value.getBoundingClientRect();

      /* Checks if the element is not visible on the screen and sets the shouldScroll variable */
      shouldScroll =
        rectElem.bottom > rectContainer.bottom ||
        rectElem.top < rectContainer.top;
      if (shouldScroll) {
        /* Scrolls to the element */
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    };

    watch(
      () => props.flipbook?.page,
      (value) => {
        scrollToThumbnail(value);
      }
    );

    return {
      currentPage,
      thumbnailsRef,
      selectPage,
    };
  },
});
</script>
<style scoped>
.thumbnails {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(198, 205, 210, 0.6) 52%,
    rgba(255, 255, 255, 0) 100%
  );
}
.thumbnails::-webkit-scrollbar {
  background-color: transparent;
  width: 8px;
}

.thumbnails::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 100px;
}

.thumbnails::-webkit-scrollbar-thumb {
  background-color: #e0e0e0;
  border-radius: 100px;
}
</style>
