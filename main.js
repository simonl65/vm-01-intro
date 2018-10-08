var app = new Vue({
    el: "#app",

    data: {
        brand: 'Vue Mastery',
        product: "Socks",
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        selectedVariant: 0,
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green.jpg",
                variantQty: 10,
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue.jpg",
                variantQty: 0,
            }
        ],
        cart: 0
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[ this.selectedVariant ].variantImage;
        },
        inStock() {
            return this.variants[ this.selectedVariant ].variantQty;
        }
    },

    methods: {
        addToCart: function() {
            this.cart += 1;
        },

        updateProduct: function(index) {
            this.selectedVariant = index;
        }
    },
});
