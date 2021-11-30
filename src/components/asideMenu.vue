<template>
  <div class="aside-menu">
    <div class="wraps">
      <label>
        縣市：<select v-model="currCity">
          <option v-for="city in cityList" :key="city">{{ city }}</option>
        </select>
      </label>
      <label>
        行政區：<select v-model="currDistrict">
          <option v-for="district in districtList" :key="district.id">{{ district.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字" v-model.trim="keyword" />
      </label>
    </div>

    <ul class="store-lists">
      <li
        class="store-info wraps"
        v-for="store in filterStores"
        :key="store.id"
        @click="$emit('triggerMarkerPopup', store.id)"
      >
        <h1 v-html="keywordHighlight(store.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ store.mask_adult }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: {{ store.mask_child }} 個</span>
        </div>

        <div class="mask-info">最後更新時間: {{ store.updated }}</div>

        <button class="btn-store-detail" @click="openModal(store.id)">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'asideMenu',
  methods: {
    keywordHighlight(val) {
      return val.replace(
        new RegExp(this.keyword, 'g'),
        `<span class="highlight">${this.keyword}</span>`,
      );
    },
    openModal(id) {
      this.showModal = true;
      this.infoboxId = id;
    },
  },
  computed: {
    currCity: {
      get() {
        return this.$store.state.currCity;
      },
      set(val) {
        this.$store.commit('setCurrCity', val);
      },
    },
    currDistrict: {
      get() {
        return this.$store.state.currDistrict;
      },
      set(val) {
        this.$store.commit('setCurrDistrict', val);
      },
    },
    keyword: {
      get() {
        return this.$store.state.keyword;
      },
      set(val) {
        this.$store.commit('setKeyword', val);
      },
    },
    showModal: {
      get() {
        return this.$store.state.showModal;
      },
      set(value) {
        this.$store.commit('setShowModal', value);
      },
    },
    infoboxId: {
      get() {
        return this.$store.state.infoboxId;
      },
      set(value) {
        this.$store.commit('setInfoboxId', value);
      },
    },
    ...mapGetters(['cityList', 'districtList', 'filterStores']),
  },
  watch: {
    districtList(v) {
      const [arr] = v;
      this.currDistrict = arr.name;
    },
  },
};
</script>
<style>
.highlight {
  color: #f08d49;
}
</style>
