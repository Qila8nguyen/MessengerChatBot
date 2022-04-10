# Messenger ChatBot

This is a basic Chatbox using Nodejs

get node_modules

```bash
npm install
```

## Problems

1. In chatboxController.js contains every functions to set up webhook and process webhook_event
2. Whenever a user sends a message to the page, webhook is invoked so we need to access the sender_id to get the right user which leads to an continuous call to database for updating request. How to avoid?
3. When user enter a request via text message to answer the postback buttons received previously, would there be a way to save the request without processing the string ?
4. How to connect db? connect mongoose to connect mongodb ?
5. Format for a user ? 
```
user_name
user_id
request = {
    bounds: int[],
    time: int[]    //mins, the interval time for getting a coin ???
}
```

### Reference

https://developers.facebook.com/docs/messenger-platform/reference/buttons/postback
https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/
