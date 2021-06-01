module.exports = {
    fetchTitlesFromUrl: (req, res) => {
        if (Object.keys(req.query).length > 0) {
            let queryString = { address: [] }
            if (!Array.isArray(req.query.address)) {
                queryString.address = [req.query.address]
            } else {
                queryString = req.query
            }
            var titles = []
            for (let index = 0; index < queryString.address.length; index++) {
                var regex = /.+\/\/|www.|\..+/g
                let url = queryString.address[index]
                if (String(url).includes('.com')) {
                    titles.push(url.replace(regex, ''))
                } else {
                    titles.push('NO RESPONSE')
                }
            }
            let myObj = { title: [], address: [] }
            for (let index = 0; index < queryString.address.length; index++) {
                myObj.title.push(titles[index].toUpperCase())
                myObj.address.push(queryString.address[index])
            }
            return res.status(200).render('title', { url: myObj })
        } else {
            res.status(404).send('Site not reachable!')
            console.log('no addess')
            return res.send('No Web address')
        }
    }
}