# vue-mobile-event
 vue mobile event

## install
npm
```
npm i vue-mobile-event -S
```

yarn
 ```
 yarn add vue-mobile-event
 ```

## use example

 ``` js
//  main.js
  import Vue from 'vue'
  import VueMobileEvent from 'vue-mobile-event'
  Vue.use(VueMobileEvent)
 ```

 ``` html
 <!-- *.vue -->

<template>
   <!-- 点击事件 -->
  <div v-event:tap="tapEvent" />

  <!-- 长按事件 -->
  <div v-event:longTap="longTapEvent" />

  <!-- 左划事件 -->
  <div v-event:leftSlip="leftSlipEvent" />

  <!-- 右划事件 -->
  <div v-event:rightSlip="rightSlipEvent" />

  <!-- 上滑事件 -->
  <div v-event:upSlip="upSlipEvent" />

  <!-- 下滑事件 -->
  <div v-event:downSlip="downSlipEvent" />
</template>
 ```
