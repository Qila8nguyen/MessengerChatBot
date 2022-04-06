require("dotenv").config();
import request from "request";
import {
  BTN_OPTION,
  BTN_EXAMPLE,
  SET_UPPER_BOUND,
  SET_LOWER_BOUND,
} from "../../constants";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// var userInfo = {

// }

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  const { text, attachments } = received_message;

  console.log("THE TEXT is ", text);
  // Checks if the message contains text
  if (text) {
    if (text.includes("upper")) {
      response = BTN_OPTION(SET_LOWER_BOUND);
    } else if (text.includes("lower")) {
      response = BTN_OPTION(SET_UPPER_BOUND);
    } else {
      response = BTN_OPTION([SET_UPPER_BOUND, SET_LOWER_BOUND]);

      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            buttons: [
              {
                type: "postback",
                title: "set upper bound",
                payload: "set-upper-bound",
              },
              {
                type: "postback",
                title: "set lower bound",
                payload: "set-lower-bound",
              },
            ],
          },
        },
      };
    }

    console.log("response for text = ", response);
  } else if (attachments) {
    // Get the URL of the message attachment
    let attachment_url = attachments[0].payload.url;
    response = BTN_EXAMPLE(attachment_url);
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === SET_LOWER_BOUND.payload) {
    response = { text: "Please enter the amount for LOWER bound" };
  } else if (payload === SET_UPPER_BOUND.payload) {
    response = { text: "Please enter the amount for UPPER bound" };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

let getHomepage = (req, res) => {
  res.send("Hello to Homepage");
};

let postWebHook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

let getWebHook = (req, res) => {
  // Your verify token. Should be a random string.

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

function updateInfo() {}

module.exports = {
  getHomepage: getHomepage,
  postWebHook: postWebHook,
  getWebHook: getWebHook,
};
