<script setup>
defineProps({
  lessons: {
    type: Array,
    required: true
  },
  addtocart: {
    type: Function,
    required: true
  }
})

</script>

<!-- <script> -->
<!-- export default { -->
<!--   methods: { -->
<!--     addtocart: function(item) { -->
<!--       if (item.spaces >= 1) { -->
<!--         item.spaces = item.spaces - 1; -->
<!--         this.cart.push(item); -->
<!--       } -->
<!--       return item; -->
<!--     }, -->
<!--   }, -->
<!-- } -->
<!-- </script> -->

<template>
  <div style = "white-space:pre" class="content">
      <p v-for="item in lessons" :key="item.id" class="box" style="width:200px" >
          <img v-bind:src="'/src/assets/img/' + item.image" style="margin-left: 60px;" alt="" width="60" height="60">
          <br/>
          Subject: {{item.subject}}
          <br/>
          Location: {{item.location}}
          <br/>
          Price: {{item.price}}
          <br/>
          Spaces: {{item.spaces}}
          <br/>
          <button class="cartbutton" v-on:click= "addtocart(item)" style="margin-left: 0px;" >Add to cart</button>
      </p>
  </div>
</template>
