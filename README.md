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
//  main.js 全局注册
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

  <!-- 长按带结束回调 -->

  <div v-event:longTap="{startHandle, endHandle}"></div>

  <!-- 左划事件 -->
  <div v-event:leftSlip="leftSlipEvent" />

  <!-- 右划事件 -->
  <div v-event:rightSlip="rightSlipEvent" />

  <!-- 上滑事件 -->
  <div v-event:upSlip="upSlipEvent" />

  <!-- 下滑事件 -->
  <div v-event:downSlip="downSlipEvent" />
</template>
<script>
export default {
  methods: {
    tapEvent(e){
    },
    longTapEvent(e){
    },
    startHandle(e) {
    },
    endHandle(e){
    }
    leftSlipEvent(e){
    },
    rightSlipEvent(e){},
    upSlipEvent(e){},
    downSlipEvent(e){}
  }
}
</script>
 ```

``` js 
// 局部注册
import {inserted} from 'vue-mobile-event'

directives: {
  event: { // 可自定义
    inserted
  }
}
```