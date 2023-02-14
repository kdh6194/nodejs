// zipcode2013에서 서울시에 있는 모든 구를 조회해서 출력하세요
// 지금하고 있는 방식은 Raw SQL Queries 방식이다.

const oracledb = require('oracledb')

async function main () {

    // where절 뒤에 오는 조건에서 문자열로 찾아야 하는 경우 "(큰따옴표)가 아닌 '(작은 따옴표)로 해야한다
    // const sql = `select distinct gugun from ZIPCODE2013 where sido = '서울' order by gugun `
    const sql = ` select distinct gㅐugun from ZIPCODE2013 where sido = :sido order by gugun `//이렇게도 가능
    const params = {sido:'인천'};
    // 키,값에 따라서 객체 형태로 만들어 쓸 수 있음
    // const params = {};
    const options = ({
        resultSet : true ,
        outFormat : oracledb.OUT_FORMAT_OBJECT
    });

    let conn = null;
    // 여기서 정의가 되어야 한다
    try{
        oracledb.initOracleClient({libDir:'C:/Java/instantclient_19_17'});

        conn = await oracledb.getConnection({
            user : 'bigdata', password : 'bigdata', connectionString : '13.125.199.59:1521/XE'
        });
        console.log('오라클 데이터베이스 접속 성공')

        let result = await conn.execute(sql,params,options);

        let rs = await result.resultSet;

        let row = null;
        while((row = await rs.getRow())){
            console.log(row.GUGUN);
        }
        rs.close();

    }catch (ex){
        console.log(ex);
    }finally {
        if(conn){
            try{
                await conn.close();
                console.log('접속 해제')
            }catch (ex){
                console.error(ex);
            }
        }
    }


}

main();