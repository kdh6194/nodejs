const mariadb = require('mariadb')
const dbconfig = require('./dbconfig2.js')

async function main () {
    const sql = 'select distinct sido from zipcode2013'
    const params = {};

    let conn = null;

    try{
        conn = await mariadb.createConnection(dbconfig);

        let result = await conn.execute(sql);
        // console.log(result);  -> JSON형식으로 출력이 됨

        for(let row of result) {
            console.log(row.sido);
        }

        // const rows = await conn.query("SELECT 1 as val")
        // console.log(rows);
        // const res = await conn.query("INSERT INTO zipcode2013 value (sido,'서울')",[1,"서울"])
        // console.log(res);

    }catch (ex){
        console.error(ex);
    }finally {
        if (conn) {
            try {await conn.close();}
            catch (ex){}
        }
    }

}

main();