package getcoin

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func GetAllCoins() {

	url := "https://api.livecoinwatch.com/coins/list"
	method := "POST"

	payload := strings.NewReader(`{
    "currency": "USD",
    "sort": "rank",
    "order": "ascending",
    "offset": 0,
    "limit": 20,
    "meta": false
}`)

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("content-type", "application/json")
	req.Header.Add("x-api-key", "<YOUR_API_KEY>")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
}
