<template>
  <div id="app">
    <!-- aside-menu 左側欄 -->
    <aside-menu @triggerMarkerPopup="openPopup" ref="menu"></aside-menu>
    <!-- 地圖區塊 -->
    <mask-map ref="map"></mask-map>
    <light-box></light-box>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import asideMenu from './components/asideMenu.vue';
import lightBox from './components/lightBox.vue';
import maskMap from './components/maskMap.vue';

export default {
  name: 'App',
  components: {
    asideMenu,
    lightBox,
    maskMap,
  },
  methods: {
    ...mapActions(['fetchLocations', 'fetchPharmacies']),
    openPopup(id) {
      this.$refs.map.triggerPopup(id);
    },
  },
  mounted() {
    this.fetchLocations();
    this.fetchPharmacies();
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
