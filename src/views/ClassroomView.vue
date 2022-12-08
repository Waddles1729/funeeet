<template>
    <v-layout>
        <v-app-bar :elevation="2">
            <template v-slot:prepend>
            </template>

            <v-app-bar-title>情報工学概論1</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn class="text-h2" variant="flat">
                FUNEEET
            </v-btn>

        </v-app-bar>
        <v-main class="ml-4 mr-4">
            <!-- funeeetの一覧表示 -->
            <div v-for="pair in pairsOnSelected" :key="pair">
                <v-card
                  class="mx-auto mb-2 mt-4"
                  color="pair.color"
                  max-width="400"
                  prepend-icon="mdi-twitter"
                  title="Funeeet"
                >
                  <template v-slot:prepend>
                    <v-icon size="x-large"></v-icon>
                  </template>

                  <v-card-text class="text-h5 py-2">
                        {{pair.funeeet.body}}
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="w-100">
                      <template v-slot:prepend>
                        <v-avatar
                          color="grey-darken-3"
                          image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        ></v-avatar>
                      </template>

                      <v-list-item-title>{{pair.funeeet.name}}</v-list-item-title>


                      <template v-slot:append>
                        <div class="justify-self-end">
                          <!-- このアイコンをボタンに変えて、@clickでpair.funeeet.likesを増やす -->
                          <v-icon class="mr-1" icon="mdi-thumb-up"></v-icon>
                          <span class="subheading mr-2">{{pair.funeeet.likes}}</span>
                        </div>
                      </template>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
            </div>
            
            <!-- 新規投稿用のボタンとダイアログ -->
            <div class="mx-auto" style="display: flex; justify-content: flex-end; max-width: 400px;">
                <v-btn icon="mdi-plus" class="mr-4" style="position: fixed; bottom:0;" color="info">
                    <v-dialog
                        v-model="dialog"
                        activator="parent"
                        style="max-width: 400px;"
                    >
                        <v-card >
                            <v-textarea
                                clearable
                                clear-icon="mdi-close-circle"
                                label="Funeeet yourself!"
                                v-model="currentFuneeet"
                            >
                            </v-textarea>

                            <v-card-actions>
                                <v-btn color="primary" block @click="onFuneeet">Funeeet</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-btn>
            </div>
            
            
            <!-- paginationの場所 -->
            <div class="text-center">
                <v-pagination
                    v-model="page"
                    :length="pageNum"
                ></v-pagination>
            </div>
        </v-main>
    </v-layout>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'ClassroomView',
    components: {
    },
    data: () => {
        return {
            funeeets: [
                {
                    "id": 1,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 2,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 3,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 4,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 5,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 6,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 7,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 8,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 9,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 10,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
                {
                    "id": 11,
                    "body": "この授業むずすぎ",
                    "name": "飯島里穂",
                    "likes": 250
                },
            ],
            colors: [],
            page: 1,
            page_size: 10,
            dialog: false,
            currentUserName: "飯島 美穂",
            currentFuneeet: "",
            lastId: 0
        }
    },
    computed: {
        funeeetColorPairs() {
            return this.funeeets.map((funeeet, i) => {
                return {
                    funeeet: funeeet,
                    color: this.colors[i]
                }
            })
        },
        pairsOnSelected() {
            if (this.page == this.pageNum) {
                return this.funeeetColorPairs.slice((this.page - 1) * this.page_size);
            }
            return this.funeeetColorPairs.slice((this.page - 1) * this.page_size, this.page * this.page_size)
        },
        pageNum() {
            return Math.ceil(this.funeeets.length / this.page_size);
        }
    },
    mounted: function() {
        for (let i = 0; i < this.funeeets.length; i++) {
            this.colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        }
        this.lastId = this.funeeets.length - 1;
    },
    methods: {
        onFuneeet() {
            this.dialog = false;
            this.lastId += 1;
            this.funeeets.unshift({
                "id": this.lastId,
                "body": this.currentFuneeet,
                "name": this.currentUserName,
                "likes": 0
            })
            this.colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            this.currentFuneeet = "";
        }
    }
}
</script>
