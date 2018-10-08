# Component to parent events:

## html:
```html
<product @add-to-cart=“updateCart”></product>
```

## component:
```javascript
Vue.component(‘product’,{
    methods: {
        addToCart: function() {
            this.$emit(‘add-to-cart’)
        }
    },

    template: `
        <button @click=“addToCart”>Add to cart</button>
    `
}
```

## Vue instance:
```javascript
methods: {
    updateCart() {
        this.cart += 1;
    }
}
```

## Sequence:
1. Button @click
2. Calls component’s `addToCart` method
3. Which emits `add-to-cart` event
4. Which triggers `updateCart` method in Vue instance
