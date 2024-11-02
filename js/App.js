const app = Vue.createApp({
    data() {
        return {
            search: "",
            person: {
                name: null,
                phone: null,
            },
            sitename: "Course work one",
            filters: [{
                    id: 1,
                    name: "Subject",
                    checked: true,
                },
                {
                    id: 2,
                    name: "Location",
                    checked: false,
                },
                {
                    id: 3,
                    name: "Price",
                    checked: false,
                },
                {
                    id: 4,
                    name: "Availability",
                    checked: false,
                },
            ],
            secondary_filters: [{
                    id: 1,
                    name: "Ascending",
                    sign: "",
                    checked: true,
                },
                {
                    id: 2,
                    name: "Descending",
                    checked: false,
                    sign: "-",
                },
            ],
            lessons: [{
                    id: 1,
                    img: "https://static.thenounproject.com/png/3844171-200.png",
                    subject: "BIOLOGY",
                    location: "Minnesota",
                    price: 20,
                    spaces: 5,
                },
                {
                    id: 2,
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSZZs7eNHdUyzM-RsMLcHKxGUJP4NZf6YJQ&s",
                    subject: "MATHS",
                    location: "Mississippi",
                    price: 70,
                    spaces: 5,
                },
                {
                    id: 3,
                    img: "https://cdn-icons-png.flaticon.com/512/8716/8716846.png",
                    subject: "CHEMISTRY",
                    location: "LONDON",
                    price: 100,
                    spaces: 5,
                },
                {
                    id: 4,
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKsE7_MvVCRJLZPkqoCRy452rJvpF_-wIOg&s",
                    subject: "English",
                    location: "NEW YORK",
                    price: 80,
                    spaces: 5,
                },
                {
                    id: 5,
                    img: "https://cdn-icons-png.flaticon.com/512/1187/1187585.png",
                    subject: "MUSIC",
                    location: "BRISTOL",
                    price: 70,
                    spaces: 5,
                },
                {
                    id: 6,
                    img: "https://cdn-icons-png.flaticon.com/512/181/181964.png",
                    subject: "PHYSICS",
                    location: "Manchester",
                    price: 70,
                    spaces: 5,
                },
                {
                    id: 7,
                    img: "https://static.vecteezy.com/system/resources/previews/004/693/432/non_2x/simple-football-sport-icon-on-white-background-free-vector.jpg",
                    subject: "SOCCER",
                    location: "ENGLAND",
                    price: 120,
                    spaces: 5,
                },
                {
                    id: 8,
                    img: "https://www.freeiconspng.com/uploads/sports-cricket-icon-9.png",
                    subject: "CRICKET",
                    location: "INDIA",
                    price: 100,
                    spaces: 5,
                },
                {
                    id: 9,
                    img: "https://media.istockphoto.com/id/1164017258/vector/palette-icon-art-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=RICnRIzARtvMEVLIoGa_qFj4ORmYjFiWvWEWbxyeUkk=",
                    subject: "ART",
                    location: "EGYPT",
                    price: 9000,
                    spaces: 5,
                },
                {
                    id: 10,
                    img: "https://cdn-icons-png.flaticon.com/512/2784/2784576.png",
                    subject: "Geography",
                    location: "Russia",
                    price: 4020,
                    spaces: 5,
                }
            ],
            cart: [],
            total: 0,
        };
    },

    methods: {
        addToCart(course) {
            if (course.spaces > 0) {
                this.cart.push(course);
                this.total += course.price;
                course.spaces--;
            }
        },

        searching(event) {
            let value = event.target.value.toLowerCase();

            $(".single-lesson").each((i, ele) => {
                let filterableText = "";
                let hide = false;
                $(ele).addClass("d-none");

                $(ele)
                    .find(".filterable-attribute")
                    .each((i, ele2) => {
                        filterableText +=
                            " " + ele2.innerText.toLowerCase().replace(/\s\s+/g, " ");
                    });

                show = filterableText.includes(value);

                if (show) {
                    console.clear();
                    $(ele).removeClass("d-none");
                }
            });
        },

        removeFromCart(course) {
            let index = this.cart.indexOf(course)
            this.cart.splice(index, 1)
            course.spaces++;
            this.total = this.total - course.price
        },

        resetVariable() {
            this.cart = [];
            this.total = 0;
        },

        checkout() {
            let msg = `Thanks ${this.person.name} your total price is .. (£ ${this.total} pounds only)`;
            alert(msg);
            this.resetVariable();
        },

        stopNumericInput(event) {
            let keyCode = event.keyCode ? event.keyCode : event.which;
            if (keyCode > 47 && keyCode < 58) {
                event.preventDefault();
            }
        },

        stopAlphabetsInput(event) {
            let keyCode = event.keyCode ? event.keyCode : event.which;
            console.log(keyCode);
            if (keyCode >= 48 && keyCode <= 58) {
                // Allow
            } else {
                event.preventDefault();
            }
        },

        dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function(a, b) {
                var result =
                    a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
                return result * sortOrder;
            };
        },

        toggleMainFilter(filter) {
            this.filters.map((e) => {
                e.checked = false;
                if (e == filter) {
                    // Change State
                    e.checked = true;

                    this.applyFilter();
                }
            });
        },

        toggleSecondaryFilter(sfilter) {
            this.secondary_filters.map((e) => {
                e.checked = false;
                if (e == sfilter) {
                    // Change State
                    e.checked = true;

                    this.applyFilter();
                }
            });
        },

        applyFilter() {
            let sign = this.secondary_filters.filter((obj) => {
                return obj.checked;
            })[0].sign;

            let filter = this.filters
                .filter((obj) => {
                    return obj.checked;
                })[0]
                .name.toLowerCase();

            if (filter == "availability") {
                filter = "spaces";
            }

            this.lessons = this.lessons.sort(this.dynamicSort(sign + filter));
        },
    },

});

app.mount("#app");