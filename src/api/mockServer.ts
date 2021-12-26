import { createServer, Response } from "miragejs"
import { totalmem, userInfo } from "os"





const server = createServer({
  routes() {
    this.namespace = "api"



    this.post("/user-tariff", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      //attrs.id = Math.floor(Math.random() * 100)

      return schema.db.userTariff.update(attrs)
      // server.db.movies.insert({ title: "The Dark Knight" })
      //  schema.db.userTariff = calcTariff();
      //  return schema.db.userTariff
    })

    this.get("/tariffs", (schema) => {
      return {
        tariffOptions: schema.db.tariffOptions,
        trafficCombo: schema.db.trafficCombo,
        userTariff: schema.db.userTariff,
      }
      //   return new Response(500, headers, data)
    })
  },
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
    minutes: '400 мин',
    gigs: '10ГБ',
    sms: '50',
    messengers: [],
  },

}

  // function calcTariff(): any {

  //   const templateObject = {
  //     minutes: {
  //       '200 мин': 100,
  //       '400 мин': 200,
  //       '500 мин': 400,
  //       '800 мин': 500
  //     },
  //     gigs: {
  //       '3ГБ': 100,
  //       '10ГБ': 200,
  //       '40 мин': 400,
  //     },
  //     sms: {
  //       "10": 10,
  //       "50": 20,
  //       "100": 30,
  //       "300": 40,
  //       "500": 50
  //     }
  //   }
  //   //@ts-ignore
  //   return templateObject.minutes[this.minutes]
  // }

)

