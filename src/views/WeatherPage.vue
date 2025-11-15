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

      <ion-card v-for="(item, index) in weatherData.mappedApiData" v-bind:key="index">
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
import { onMounted } from 'vue';
import { toTimeLocale } from "@/composeable/toTimeLocale";

onMounted(() => {
  getWeatherData();
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
