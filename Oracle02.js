const oracledb = require('oracledb')
const dbconfig = require('./dbconfig.js')

async function main () {

    const sql1 ='create table sungjuk (name varchar(100), kor number(3), eng number(3),mat number(3))';
    const sql2 = 'insert into sungjuk values(:1,:2,:3,:4)';
    const sql3 = 'update sungjuk set kor = :1, eng = :2, mat = :3 where name = :4';
    const sql4 = 'delete from sungjuk where name = :1';
    const sql5 = 'select * from sungjuk';
    let params = [];
    let conn = null;

    try{
        oracledb.initOracleClient({libDir:'C:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);

        // let result = await conn.executeMany(
        //     sql1,sql2,sql3,sql4,sql5,params,{resultSet:true});
        // const rs = result.resultSet;
        // let row = null;
        // let i = 1;
        // while((row = await rs.getRow())){
        //     console.log("getRow(): row"+ i++);
        //     console.log(row);
        // }
        // rs.close();

        //-------------------------------------------

        // let result = await conn.execute(sql1)

        params = ['혜교',99,98,99];
        let result = await conn.execute(sql2,params);
        await conn.commit();

        // params = [11,22,33,'혜교']
        // let result = await conn.execute(sql3,params);
        // await conn.commit();

        // params = ['혜교']
        // let result = await conn.execute(sql4,params);
        // await conn.commit();

        result = await conn.execute(sql5)
        console.log(result)

    }catch (ex){
        console.log(ex);
    }finally {
        if(conn){
            try{
                await conn.close();
            }catch (ex){
                console.error(ex);
            }
        }
    }


}

main();