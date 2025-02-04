<template>
  <div class="font-zenMaru bg-white mx-[48px] p-[16px] shadow-lg rounded-[8px] flex flex-col">
    <!-- Header Section -->
    <div class="w-full h-[40px] grid grid-cols-3 justify-between items-center top-4">
      <Button size="xs" color="accent" class="justify-self-start" @click="showNews">問題へ</Button>
      <p class="font-bold text-[16px] text-center">解説</p>
      <Button size="xs" color="danger" class="justify-self-end">報告</Button>
    </div>

    <!-- 本当のニュースかフェイクかフェイクか -->
    <div v-if="type === 'true_or_false'" class="w-full grid grid-cols-3 justify-between items-center pt-[24px]">
      <p class="justify-self-start bg-accent font-bold text-white text-[16px] py-[4px] px-[8px] rounded-[8px]">
        正解
      </p>
      <Icon class="justify-self-center" :name="answer ? 'correct' : 'incorrect'" width="24" height="24" />
      <a v-if="answer === 'true'" class="justify-self-end text-blue-500 text-[12px] font-bold" href="example.com"
        target="_blank">
        ニュース記事へ
      </a>
    </div>

    <div v-if="type === 'multiple_choice'" class="mt-[16px]">
      <!-- 正解表示 -->
      <div v-if="answer === 'true'" class="w-full grid grid-cols-3 justify-between items-center pt-[24px]">
        <p class="justify-self-start bg-accent font-bold text-white text-[16px] py-[4px] px-[8px] rounded-[8px]">
          正解
        </p>
        <p class="font-bold text-[16px] text-center">正解の選択肢</p>
        <div v-for="(option, index) in options" :key="index"
          class="flex items-center justify-center w-[200px] h-[50px] border-[3px] rounded-md" :class="{
            'border-red-500 text-red-500': index === correctIndex && indexColor === 'red',
            'border-yellow-500 text-yellow-500': index === correctIndex && indexColor === 'yellow',
            'border-green-500 text-green-500': index === correctIndex && indexColor === 'green',
            'border-blue-500 text-blue-500': index === correctIndex && indexColor === 'blue',
          }">
          <Icon name="check-circle" width="24" height="24" class="mr-2" />
          <span class="font-bold text-[14px]">{{ option }}</span>
        </div>
      </div>
    </div>

    <div class="mt-[32px] flex items-center justify-between border rounded-full p-[8px] shadow">
      <p class="text-black font-bold text-[12px] px-[8px] flex-1">
        {{ keyword }}
      </p>
      <button class="bg-primary text-black font-bold text-[14px] py-[6px] px-[16px] rounded-full shadow"
        @click="searchGoogle">
        検索
      </button>
    </div>

    <p class="mt-[32px] font-bold text-[12px] tracking-wider leading-[32px]">
      {{ explanation }}
    </p>
  </div>
</template>

<script setup>
import Button from "@/components/modules/ButtonComponent.vue";
import Icon from "@/components/modules/IconComponent.vue";

// Propsを定義
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["true_or_false", "multiple_choice"].includes(value),
  },
  answer: {
    type: Boolean,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  correctIndex: {
    type: Number,
    default: -1,
  },
});

// State管理
import { ref } from "vue";

const isAnswered = ref(false);
const selectedOption = ref(null);

// Emitsの定義
const emit = defineEmits(["showNewsEvent"]);

// ニュースを表示する関数
const showNews = () => {
  emit("showNewsEvent");
};

// Google検索用関数
function searchGoogle() {
  const query = encodeURIComponent(props.keyword); // propsからkeywordを取得
  const googleSearchUrl = `https://www.google.com/search?q=${query}`;
  window.open(googleSearchUrl, "_blank"); // 新しいタブで検索を開く
}
</script>
