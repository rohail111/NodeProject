const fetch = require('node-fetch');
const model = require('../utilities/parser')
const globalVariable = require('../constants/global')

module.exports = {

    fetchTitlesFromUrl: async (req, res) => {

        if (Object.keys(req.query).length > 0) {
            let { address } = req.query
            let myObj = { title: [], address: [] }

            if (!Array.isArray(address)) {

                if (String(address).includes(globalVariable.dotCom)) {
                    const condition = [globalVariable.http, globalVariable.https]
                    const test = condition.some(el => address.includes(el))
                    address = test == true ? address : globalVariable.http + address

                    try {
                        let response = await fetch(address)
                        let result = await response.text()
                        let title = model.parseTitle(result)
                        myObj.title.push(title)
                    } catch (error) {
                        myObj.title.push(globalVariable.noResponseError)
                    }
                } else {
                    myObj.title.push(globalVariable.noResponseError)
                }
                myObj.address.push(address)
            } else {
                for (let index = 0; index < address.length; index++) {
                    let url = address[index]

                    if (String(url).includes(globalVariable.dotCom)) {
                        let condition = [globalVariable.http, globalVariable.https]
                        let test = condition.some(el => url.includes(el))
                        url = test == true ? url : globalVariable.http + url
                        try {
                            let response = await fetch(url)
                            let result = await response.text()
                            let title = model.parseTitle(result)
                            myObj.title.push(title)
                        } catch (error) {
                            myObj.title.push(globalVariable.noResponseError)
                        }
                    }
                    else {
                        myObj.title.push(globalVariable.noResponseError)
                    }
                    myObj.address.push(url)
                }
            }
            return res.status(200).render(globalVariable.title, { url: myObj })
        } else {
            return res.status(404).send(globalVariable.noAddressError)
        }
    }
}