const LIST_COINS = {
    title: "list 20 most popular coins",
    payload: "list-coins"
}
const SET_UPPER_BOUND = {
    title: "set upper bound",
    payload: "set-upper-bound",
}
const SET_LOWER_BOUND = {
    title: "set lower bound",
    payload: "ser-lower-bound",
}
const STOP_BOUND = {
    title: "stop setting bound",
    payload: "stop-bound",
}
const SET_INTERVAL_TIME = {
    title: "set interval time",
    payload: "set-interval-time",
}

// const BTN_2OPTIONS = {
//     "attachment": {
//       "type": "template",
//       "payload": {
//         "template_type": "button",
//           // "text": "Postback button testing",
//           "buttons": [
//             {
//               "type": "postback",
//               "title": SET_UPPER_BOUND,
//               "payload": SET_UPPER_BOUND,
//             },
//             {
//               "type": "postback",
//               "title": SET_LOWER_BOUND,
//               "payload": SET_LOWER_BOUND,
//             }
//           ],
//         }
//       }
//     }

const BTN_OPTION = (option) => {
    return {
    "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
            // "text": "Postback button testing",
            "buttons": 
            option.map((each) => {
                return {
                  "type": "postback",
                  "title": each.title,
                  "payload": each.payload,
              }
            })
          }
        }
      }
}

const BTN_EXAMPLE = (attachment_url) => {
    return {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
} 
