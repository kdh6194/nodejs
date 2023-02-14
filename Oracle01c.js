// zipcode2013에서 서울시, 강남구에 있는 모든 동을 조회해서 출력하세요
// 지금하고 있는 방식은 Raw SQL Queries 방식이다.

const oracledb = require('oracledb')

async function main () {
    // placeholder를 이용해서 동적으로 sql질의문을 작성할 수 있음
    // :인덱스 => 배열로 정의 , 키 => 객체로 정의
    // const sql = "select distinct dong from ZIPCODE2013 where sido = '서울' and gugun = '강남구' order by dong ";
    const sql = "select distinct dong from ZIPCODE2013 where sido = :1 and gugun = :2 order by dong ";
    const params = ['서울','강남구'];
        //placeholder로 작동하는 방식이다 -> 쓰는 이유: 보안상의 이유때문에/단점 : 수정시에 헷갈릴 수 있다.
    const options = ({
        resultSet : true ,
        outFormat : oracledb.OUT_FORMAT_OBJECT
    });

    let conn = null;

    try {
        oracledb.initOracleClient({libDir:'C:/Java/instantclient_19_17'});

        conn = await oracledb.getConnection({
            user : 'bigdata', password : 'bigdata', connectionString : '13.125.199.59:1521/XE'
        });
        let result = await conn.execute(sql,params,options);
        //  result 자리에 변수명.execute(sql,params,options)이다
        let rs = await result.resultSet;

        let row = null; //await는 빼먹으면 구문 실행이 제대로 이뤄지지 않음
        while((row = await rs.getRow())){
            console.log(row.DONG);
        }
        rs.close();

    }catch(ex){
        console.log(ex)
    }finally {
        if (conn) {
            try{
                await conn.close();
                console.log('접속 해제');
            }catch (ex){console.error(ex)}

        }
    }




}

main();