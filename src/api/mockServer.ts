import { createServer, Response } from "miragejs"

const server = createServer({
  routes() {
    this.namespace = "api"

    this.get("/tariffs", (schema) => {
        return {
            tariffOptions: schema.db.tariffOptions,
            trafficCombo: schema.db.trafficCombo,
            userTariff: schema.db.userTariff,
        }
      //   return new Response(500, headers, data)
    })

    this.post("/user-tariff", (schema, request) => {
        // let attrs = JSON.parse(request.requestBody)
        // attrs.id = Math.floor(Math.random() * 100)

        // return { movie: attrs }
        // server.db.movies.insert({ title: "The Dark Knight" })
        schema.db.userTariff = calcTariff();
        return schema.db.userTariff
    })
},
})

server.db.loadData({
    movies: [
      { title: "Interstellarrrrr" },
      { title: "Inception" },
      { title: "Dunkirk" },
    ],
  })

server.db.loadData({
    tariffOptions: {
        minutes: ["200 мин", "400 мин", "500 мин", "800 мин"],
        gigs: ["3ГБ", "10ГБ", "40ГБ"],
        sms: ["10", "50", "100", "300", "500"],
        messengers: ["fb", "vk", "ok", "inst", "tt"]
    },
    trafficCombo: [
        {
            gigs: "3ГБ",
            messengers: {
              fb: false,
              vk: false,
              ok: false,
              inst: false,
              tt: false
            }
          },
      
          {
            gigs: "10ГБ",
            messengers: {
              fb: true,
              vk: true,
              ok: true,
              inst: false,
              tt: false
            }
          },
      
          {
            gigs: "40ГБ",
            messengers: {
              fb: true,
              vk: true,
              ok: true,
              inst: true,
              tt: true
            }
          }
    ], 
    userTariff: {
        minutes: '200 мин',
        gigs: '10ГБ',
        sms: '10',
        messengers: [],
        totalPrice: 200
    },
})

function calcTariff(): any {

}