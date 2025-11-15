<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Weather</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Weather</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card 
      v-for="(item, index) in weatherData.isUpdate.status.mappedApiData" 
      v-bind:key="index"
      v-if="weatherData.isUpdate.status.type === 'success'">
        <ion-card-header>
          <ion-card-title>
            {{ toTimeLocale(item.time) }}
          </ion-card-title>
          <ion-card-subtitle>
            {{ item.temp }} {{ item.unitTemp }}
          </ion-card-subtitle>
        </ion-card-header>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { getWeatherData, weatherData } from '@/composeable/getWeather';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard,
  //IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/vue';
import { onMounted, onUnmounted, watch } from 'vue';
import { toTimeLocale } from "@/composeable/toTimeLocale";

onMounted(() => {
  getWeatherData();
  const intervalId:NodeJS.Timeout = setInterval(() => {
    getWeatherData();
  }, 30000);
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

watch(() => weatherData.value.isUpdate.status, (newStatus) => {
  if (newStatus.type === 'success') {
    // console.info('Weather data updated successfully.');
    void 0;
  } else if (newStatus.type === 'error') {
    alert(`Error fetching weather data: ${newStatus.errorMessage}`);
  } else if (newStatus.type === 'loading') {
    console.info('Weather data still loading.'); 
  } else {
    console.error('Weather data status unknown.');
  };
});

watch(() => weatherData.value.urlApi, (newUrl, oldUrl) => {
  if (newUrl !== oldUrl) {
    getWeatherData();
  }
});

</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
