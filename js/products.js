const products = [

    {
        id: 1,
        name: "Chocolate Truffle Cake",
        price: 550,
        category: "Cakes",
        description: "Rich chocolate cake with smooth chocolate ganache.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        stock: 10
    },

    {
        id: 2,
        name: "Red Velvet Cake",
        price: 650,
        category: "Cakes",
        description: "Soft red velvet cake with cream cheese frosting.",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600",
        stock: 8
    },

    {
        id: 3,
        name: "Strawberry Cake",
        price: 600,
        category: "Cakes",
        description: "Fresh strawberry cake with delicious cream.",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600",
        stock: 12
    },

    {
        id: 4,
        name: "Black Forest Cake",
        price: 700,
        category: "Cakes",
        description: "Chocolate layers with whipped cream and cherries.",
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600",
        stock: 7
    },

    {
        id: 5,
        name: "Vanilla Cream Cake",
        price: 500,
        category: "Cakes",
        description: "Classic vanilla cake with creamy frosting.",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600",
        stock: 10
    },

    {
        id: 6,
        name: "Blueberry Cheesecake",
        price: 450,
        category: "Desserts",
        description: "Creamy cheesecake topped with blueberries.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
        stock: 5
    },

    {
        id: 7,
        name: "Chocolate Cupcake",
        price: 100,
        category: "Cupcakes",
        description: "Chocolate cupcake with rich frosting.",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600",
        stock: 15
    },

    {
        id: 8,
        name: "Fresh Croissant",
        price: 120,
        category: "Pastries",
        description: "Golden and buttery freshly baked croissant.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
        stock: 15
    },

    {
        id: 9,
        name: "Chocolate Brownie",
        price: 150,
        category: "Desserts",
        description: "Soft and fudgy chocolate brownie.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
        stock: 0
    },

    {
        id: 10,
        name: "Strawberry Cupcake",
        price: 110,
        category: "Cupcakes",
        description: "Delicious cupcake with strawberry frosting.",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600",
        stock: 10
    },

    {
        id: 11,
        name: "Chocolate Donut",
        price: 90,
        category: "Desserts",
        description: "Soft donut covered with chocolate glaze.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600",
        stock: 0
    },

    {
        id: 12,
        name: "Pineapple Cake",
        price: 550,
        category: "Cakes",
        description: "Light pineapple cake with fresh cream.",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600",
        stock: 9
    }

];

function getProductById(id) {
    return products.find(product => product.id === Number(id));
}