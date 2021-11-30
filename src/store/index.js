import { createStore } from 'vuex';

export default createStore({
  state: {
    currCity: '臺北市',
    currDistrict: '北投區',
    location: [],
    stores: [],
    keyword: '',
    showModal: false,
    infoboxId: '',
  },
  mutations: {
    setCurrCity(state, payload) {
      state.currCity = payload;
    },
    setCurrDistrict(state, payload) {
      state.currDistrict = payload;
    },
    setLocation(state, payload) {
      state.location = payload;
    },
    setStores(state, payload) {
      state.stores = payload;
    },
    setKeyword(state, payload) {
      state.keyword = payload;
    },
    setShowModal(state, payload) {
      state.showModal = payload;
    },
    setInfoboxId(state, payload) {
      state.infoboxId = payload;
    },
  },
  actions: {
    async fetchLocations({ commit }) {
      const json = await fetch(
        'https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json',
      ).then((res) => res.json());
      commit('setLocation', json);
    },
    async fetchPharmacies({ commit }) {
      const json = await fetch(
        'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',
      ).then((res) => res.json());
      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));
      commit('setStores', data);
    },
  },
  modules: {},
  getters: {
    cityList(state) {
      return state.location.map((d) => d.name);
    },
    districtList(state) {
      const dl = state.location.filter((d) => d.name === state.currCity)[0];
      return dl ? dl.districts : [];
    },
    filterStores(state) {
      return state.stores.filter((d) => {
        const { keyword } = state;
        if (keyword === '') {
          return d.county === state.currCity && d.town === state.currDistrict;
        }
        return d.name.indexOf(keyword) !== -1;
      });
    },
    currDistrictInfo(state, getters) {
      return getters.districtList.find((d) => d.name === state.currDistrict) || {};
    },
  },
});
