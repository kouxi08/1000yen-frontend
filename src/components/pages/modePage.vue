<template>
  <div class="w-screen h-screen">
    <div class="bg-detective-offices">
      <div class="flex justify-between items-center px-[24px] pt-[56px]">
        <div class="flex gap-[16px]">
          <Level />
          <XP value="4" class="bg-white border-2 border-primary rounded-[4px]" />
        </div>
        <div class="bg-[#FDFDFD] rounded-full p-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] cursor-pointer"
          @click="router.push({ name: 'profilePage' })">
          <Icon name="user" />
        </div>
      </div>
      <div>
        <div class="bg-[#FFF8D6] h-[488px] mx-[24px] mt-[32px] relative p-[16px] rounded-[8px] overflow-hidden">
          <Icon name="arrow-left-line" class="absolute top-[16px] cursor-pointer" width="24" height="24"
            @click="router.push({ name: 'mainPage' })" />
          <p class="font-zenMaru font-bold text-[15px] text-center mb-[16px]">
            モード選択画面
          </p>
          <div class="flex flex-col gap-[8px]">
            <div v-for="mode in modes" :key="mode"
              class="bg-white p-[16px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] flex justify-between items-center rounded-[8px] cursor-pointer"
              @click="router.push({ name: 'difficultyPage', params: { type: mode.name } })">
              <p class="px-[8px] py-[2px] rounded-[6px] font-bold font-zenMaru text-white bg-gradient-to-r text-[24px] text-center"
                :class="getBackground(mode.name)">
                {{ mode.name }}
              </p>
              <p class="font-zenMaru text-[14px]">
                {{ mode.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Level from '@/components/modules/LevelComponent.vue'
import XP from '@/components/modules/XpComponent.vue'
import Icon from "@/components/modules/IconComponent.vue"
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router"
import AxiosInstance from '@/axiosInstance.js'
const router = useRouter()

onMounted(async () => {
  const modeData = await AxiosInstance.get('/quiz/mode')
  console.log(modeData.data)
  modes.value = modeData.data
})

const getBackground = (modeName) => {
  switch (modeName) {
    case "バトル":
      return "from-[#FF1A1A] to-[#F19E29]"
    case "スピード":
      return "from-[#65B2BD] to-[#90FFE1]"
    case "ランク":
      return "from-[#8A42E2] to-[#59BAFE]"
    case "ムゲン":
      return "from-[#E24242] to-[#6441CC]"
    case "トリセツ":
      return "from-[#EAEA15] to-[#22DA1B]"
  }
}

const modes = ref([])
</script>
