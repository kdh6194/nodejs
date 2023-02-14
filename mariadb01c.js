const mariadb = require('mariadb')
const dbconfig = require('./dbconfig2.js')

async function main () {
    // 테이블명 신경 많이 써야한다 대소문자로 에러발생이 허다하다
    const sql = 'select distinct dong from zipcode2013 where sido = ? and gugun = ? order by dong ';
    const params = ['서울','강남구'];

    let conn = null;

    try{
        conn = await mariadb.createConnection(dbconfig);

        let result = await conn.execute(sql,params);

        for(let row of result) {
            console.log(row.dong);
        }


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