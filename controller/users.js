const { dbConf, dbQuery } = require("../config/db");
const fs = require('fs');

module.export = {

//CREATE POST
    add: async (req, res) => {
        try {
            // console.log(req.body);
            // console.log(req.files);
            let data = JSON.parse(req.body.data);

            // Memproses data ke mysql
            let dataInput = [];
            for (const prop in data) {
                dataInput.push(dbConf.escape(data[prop]));
            }
            console.log("before", dataInput);
            dataInput.splice(4, 0, dbConf.escape(`/imgProduct/${req.files[0].filename}`))
            console.log("after", dataInput);
            let addData = await dbQuery(`INSERT INTO products (name, brand, category, description, images, stock, price) 
                values (${dataInput.join(',')});`);

            res.status(200).send({
                success: true,
                message: 'Add product Success'
            })

        } catch (error) {
            console.log(error);
            // Menghapus gambar pada directory
            fs.unlinkSync(`./public/imgProduct/${req.files[0].filename}`);
            res.status(500).send(error)
        }
    },
    update: async (req, res) => {
        try {
            if (req.dataToken.role == '{Admin}') {
                let newData = [];
                Object.keys(req.body).forEach(val => {
                    newData.push(`${val}=${dbConf.escape(req.body[val])}`);
                })
                await dbQuery(`UPDATE products set ${newData.join(', ')} where idproduct=${req.params.id}`);

                res.status(200).send({
                    success: true,
                    message: 'UPDATE product'
                })
            } else {
                res.status(401).send({
                    success: false,
                    message: 'Anda belum login :('
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

}