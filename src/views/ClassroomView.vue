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
                <v-card class="mx-auto mb-2 mt-4" color="pair.color" max-width="400" prepend-icon="mdi-twitter"
                    title="Funeeet">
                    <template v-slot:prepend>
                        <v-icon size="x-large"></v-icon>
                    </template>

                    <v-card-text class="text-h5 py-2">
                        {{ pair.funeeet.text }}
                    </v-card-text>

                    <v-card-actions>
                        <v-list-item class="w-100">
                            <template v-slot:prepend>
                                <v-avatar color="grey-darken-3"
                                    image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
                            </template>

                            <v-list-item-title>{{ pair.funeeet.name }}</v-list-item-title>


                            <template v-slot:append>
                                <div class="justify-self-end">
                                    <!-- このアイコンをボタンに変えて、@clickでpair.funeeet.likesを増やす -->

                                    <v-btn class="mr-1" icon="mdi-thumb-up"
                                        @click="(pair.funeeet.likes = pair.funeeet.likes + 1)"></v-btn>

                                    <span class="subheading mr-2">{{ pair.funeeet.likes }}</span>
                                </div>
                            </template>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </div>

            <!-- 新規投稿用のボタンとダイアログ -->
            <div class="mx-auto" style="display: flex; justify-content: flex-end; max-width: 400px;">
                <v-btn icon="mdi-plus" class="mr-4" style="position: fixed; bottom:0;" color="info">
                    <v-dialog v-model="dialog" activator="parent" style="max-width: 400px;">
                        <v-card>
                            <v-textarea clearable clear-icon="mdi-close-circle" label="Funeeet yourself!"
                                v-model="currentFuneeet">
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
                <v-pagination v-model="page" :length="pageNum"></v-pagination>
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
                { "id": 1, "name": "飯島 美穂", "text": "test", "date": "2022-02-22T10:25:39", "likes": 1 },
                { "id": 2, "name": "田中", "text": "テスト", "date": "2022-02-22T10:25:34", "likes": 2 },
                { "id": 3, "name": "小林", "text": "テストです", "date": "2022-02-22T10:23:27", "likes": 3 },
                { "id": 4, "name": "小林", "text": "こんにちは", "date": "2022-02-22T10:23:22", "likes": 4 },
                { "id": 5, "name": "小川", "text": "どうも", "date": "2022-02-22T10:20:51", "likes": 2 },
                { "id": 6, "name": "佐々木", "text": "こんばんは", "date": "2022-02-22T10:20:01", "likes": 3 },
                { "id": 7, "name": "小林", "text": "おはよう", "date": "2022-02-22T10:19:18", "likes": 1 },
                { "id": 8, "name": "飯島 美穂", "text": "ありがとう", "date": "2022-02-22T10:18:21", "likes": 7 },
                { "id": 9, "name": "田中", "text": "おもしろい！", "date": "2022-02-22T10:15:56", "likes": 3},
                { "id": 10, "name": "もんじゃ", "text": "おいしい！", "date": "2022-02-22T10:14:32", "likes": 2 },
                { "id": 11, "name": "かに", "text": "おいしすぎる！", "date": "2022-02-22T10:13:21", "likes": 2 },
                { "id": 12, "name": "田中", "text": "そうなのか", "date": "2022-02-22T10:11:20", "likes": 5 },
                { "id": 13, "name": "ラザニア", "text": "うまい！", "date": "2022-02-22T10:11:12", "likes": 10 },
                { "id": 14, "name": "もんじゃ", "text": "しっかり焼きます", "date": "2022-02-22T10:10:32", "likes": 20 },
                { "id": 15, "name": "かに", "text": "剥くのが大変です", "date": "2022-02-22T10:10:30", "likes": 30 },
                { "id": 16, "name": "ラザニア", "text": "作ります", "date": "2022-02-22T10:05:30", "likes": 40 },
                { "id": 17, "name": "もんじゃ", "text": "焦げ目がいいです", "date": "2022-02-22T10:03:30", "likes": 50 },
                { "id": 18, "name": "かに", "text": "食べると黙ります", "date": "2022-02-22T10:02:40", "likes": 60 },
                { "id": 19, "name": "ラザニア", "text": "重ねるとおいしいです", "date": "2022-02-22T10:02:20", "likes": 70 },
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
    mounted: function () {
        for (let i = 0; i < this.funeeets.length; i++) {
            this.colors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
        }
        this.lastId = this.funeeets.length - 1;
    },
    methods: {
        onFuneeet() {
            this.dialog = false;
            this.lastId += 1;
            this.funeeets.unshift({
                "id": this.lastId,
                "text": this.currentFuneeet,
                "name": this.currentUserName,
                "likes": 0
            })
            this.colors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
            this.currentFuneeet = "";
        }
    }
}
</script>
