<template>
  <div class="mx-auto flex flex-col items-center">
    <div
      class="flex flex-wrap items-center justify-between rounded-full px-2 md:px-6 py-4"
    >
      <span
        @click="flipbook.flipLeft"
        class="rounded-full p-2 flex mr-2"
        :class="[
          flipbook.canFlipLeft
            ? 'cursor-pointer shadow-md bg-white md:hover:bg-gray-200'
            : 'bg-gray-200  cursor-not-allowed',
        ]"
      >
        <svg
          class="w-5 h-5 md:w-8 md:h-8 fill-current"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.707 5.29279C14.8945 5.48031 14.9998 5.73462 14.9998 5.99979C14.9998 6.26495 14.8945 6.51926 14.707 6.70679L9.41403 11.9998L14.707 17.2928C14.8892 17.4814 14.99 17.734 14.9877 17.9962C14.9854 18.2584 14.8803 18.5092 14.6948 18.6946C14.5094 18.88 14.2586 18.9852 13.9964 18.9875C13.7342 18.9897 13.4816 18.8889 13.293 18.7068L7.29303 12.7068C7.10556 12.5193 7.00024 12.265 7.00024 11.9998C7.00024 11.7346 7.10556 11.4803 7.29303 11.2928L13.293 5.29279C13.4806 5.10532 13.7349 5 14 5C14.2652 5 14.5195 5.10532 14.707 5.29279V5.29279Z"
          />
        </svg>
      </span>
      <span
        @click="flipbook.zoomIn"
        class="rounded-full p-3 flex mx-2"
        :class="[
          flipbook.canZoomIn
            ? 'cursor-pointer  shadow-md bg-white md:hover:bg-gray-200'
            : 'bg-gray-200  cursor-not-allowed',
        ]"
      >
        <svg
          class="w-4 h-4 md:h-6 md:w-6 fill-current"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9375 11.0625C12.5625 10.6875 12.1354 10.5729 11.6562 10.7188L10.6562 9.71875C11.5521 8.61458 12 7.375 12 6C12 4.33333 11.4167 2.91667 10.25 1.75C9.08333 0.583333 7.66667 0 6 0C4.33333 0 2.91667 0.583333 1.75 1.75C0.583333 2.91667 0 4.33333 0 6C0 7.66667 0.583333 9.08333 1.75 10.25C2.91667 11.4167 4.33333 12 6 12C7.45833 12 8.69792 11.5521 9.71875 10.6562L10.7188 11.6562C10.5938 12.1562 10.7083 12.5833 11.0625 12.9375L13.7188 15.5938C13.9896 15.8646 14.3021 16 14.6562 16C15.0312 16 15.3438 15.8646 15.5938 15.5938C15.8646 15.3229 16 15.0104 16 14.6562C16 14.3021 15.8646 13.9896 15.5938 13.7188L12.9375 11.0625ZM6 10.6562C4.70833 10.6562 3.60938 10.2031 2.70312 9.29688C1.79688 8.39062 1.34375 7.29167 1.34375 6C1.34375 4.70833 1.79688 3.60938 2.70312 2.70312C3.60938 1.79688 4.70833 1.34375 6 1.34375C7.29167 1.34375 8.39062 1.79688 9.29688 2.70312C10.2031 3.60938 10.6562 4.70833 10.6562 6C10.6562 7.29167 10.2031 8.39062 9.29688 9.29688C8.39062 10.2031 7.29167 10.6562 6 10.6562ZM8 5.34375H6.65625V4C6.65625 3.5625 6.4375 3.34375 6 3.34375C5.5625 3.34375 5.34375 3.5625 5.34375 4V5.34375H4C3.5625 5.34375 3.34375 5.5625 3.34375 6C3.34375 6.4375 3.5625 6.65625 4 6.65625H5.34375V8C5.34375 8.4375 5.5625 8.65625 6 8.65625C6.4375 8.65625 6.65625 8.4375 6.65625 8V6.65625H8C8.4375 6.65625 8.65625 6.4375 8.65625 6C8.65625 5.5625 8.4375 5.34375 8 5.34375Z"
          />
        </svg>
      </span>
      <span
        class="mx-4 font-semibold select-none text-sm md:text-lg flex flex-shrink-0"
        >Page {{ isMobile ? flipbook.page - 1 : flipbook.page }} of
        {{ flipbook.numPages - 1 }}
      </span>
      <span
        @click="flipbook.zoomOut"
        class="rounded-full p-3 flex"
        :class="[
          flipbook.canZoomOut
            ? 'cursor-pointer  shadow-md bg-white md:hover:bg-gray-200'
            : 'bg-gray-200  cursor-not-allowed',
        ]"
      >
        <svg
          class="w-4 h-4 md:h-6 md:w-6 fill-current"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12C8.54167 12 7.30208 11.5521 6.28125 10.6562L5.28125 11.6562C5.40625 12.1562 5.29167 12.5833 4.9375 12.9375L2.28125 15.5938C2.01042 15.8646 1.69792 16 1.34375 16C0.96875 16 0.65625 15.8646 0.40625 15.5938C0.135417 15.3229 0 15.0104 0 14.6562C0 14.3021 0.135417 13.9896 0.40625 13.7188L3.0625 11.0625C3.4375 10.6875 3.86458 10.5729 4.34375 10.7188L5.34375 9.71875C4.44792 8.61458 4 7.375 4 6C4 4.33333 4.58333 2.91667 5.75 1.75C6.91667 0.583333 8.33333 0 10 0C11.6667 0 13.0833 0.583333 14.25 1.75C15.4167 2.91667 16 4.33333 16 6C16 7.66667 15.4167 9.08333 14.25 10.25C13.0833 11.4167 11.6667 12 10 12ZM10 1.34375C8.70833 1.34375 7.60938 1.79688 6.70312 2.70312C5.79688 3.60938 5.34375 4.70833 5.34375 6C5.34375 7.29167 5.79688 8.39062 6.70312 9.29688C7.60938 10.2031 8.70833 10.6562 10 10.6562C11.2917 10.6562 12.3906 10.2031 13.2969 9.29688C14.2031 8.39062 14.6562 7.29167 14.6562 6C14.6562 4.70833 14.2031 3.60938 13.2969 2.70312C12.3906 1.79688 11.2917 1.34375 10 1.34375ZM12 6.65625H8C7.5625 6.65625 7.34375 6.4375 7.34375 6C7.34375 5.5625 7.5625 5.34375 8 5.34375H12C12.4375 5.34375 12.6562 5.5625 12.6562 6C12.6562 6.4375 12.4375 6.65625 12 6.65625Z"
          />
        </svg>
      </span>
      <span
        @click="flipbook.flipRight"
        class="rounded-full p-2 flex mx-2"
        :class="[
          flipbook.canFlipRight
            ? 'cursor-pointer  shadow-md bg-white md:hover:bg-gray-200'
            : 'bg-gray-200  cursor-not-allowed',
        ]"
      >
        <svg
          class="w-5 h-5 md:w-8 md:h-8 fill-current"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.29303 18.7069C9.10556 18.5194 9.00024 18.2651 9.00024 17.9999C9.00024 17.7348 9.10556 17.4804 9.29303 17.2929L14.586 11.9999L9.29303 6.70692C9.11087 6.51832 9.01008 6.26571 9.01236 6.00352C9.01464 5.74132 9.1198 5.49051 9.30521 5.3051C9.49062 5.11969 9.74143 5.01452 10.0036 5.01224C10.2658 5.00997 10.5184 5.11076 10.707 5.29292L16.707 11.2929C16.8945 11.4804 16.9998 11.7348 16.9998 11.9999C16.9998 12.2651 16.8945 12.5194 16.707 12.7069L10.707 18.7069C10.5195 18.8944 10.2652 18.9997 10 18.9997C9.73487 18.9997 9.48056 18.8944 9.29303 18.7069V18.7069Z"
          />
        </svg>
      </span>
    </div>
    <span
      @click="goBack"
      class="flex font-semibold px-4 py-2 rounded-full outline-none focus:outline-none hover:bg-gray-200 hover:shadow-md cursor-pointer select-none"
      :class="{ 'bg-gray-200': isMobile }"
      >GO BACK</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { usePdfManager } from "../providers/provider";

export default defineComponent({
  props: {
    flipbook: {
      type: Object,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const pdfManager = usePdfManager();
    const goBack = () => {
      pdfManager.discardDocument();
    };
    return { goBack };
  },
});
</script>

<style></style>
