const oracledb = require('oracledb');

async function main () {

    const sql = 'select distinct sido from ZIPCODE2013';
    let params = {}; //insert, update, delete, where
    let options = {
        resultSet : true,
        outFormat : oracledb.OUT_FORMAT_OBJECT
    };  //oracle db를 위한 옵션 정의

    let conn = null; // 디비 연결 객체

    try{
        // \\로 되어있는 부분 /로 바꿔도 됨
        // 오라클 인스턴스 클라이언트 초기화
        oracledb.initOracleClient({libDir:"C:/Java/instantclient_19_17"})

        // 오라클 접속정보를 이용해서 오라클 연결객체 하나 생성
        // connectionString : "ip주소:포트번호/SID
        conn = await oracledb.getConnection({
            user: 'bigdata', password : 'bigdata',
            connectionString : '13.125.199.59:1521/XE'
        });
        console.log('오라클 데이터베이스 접속 성공')

        //sql문을 실행하고 결과를 받아옴
        let result = await conn.execute(sql, params, options);

        // 실행결과를 결과집합 객체로 변환
        let rs = await result.resultSet;

        // 결과집합 객체의 각 요소를 순회하면서 내용 출력
        let row = null;
        while((row = await rs.getRow())) { // outFormat 설정 필요
            console.log(row.SIDO); // 해당 컬럼명을 대문자로 기입
        }

        // 작업이 끝나면 결과집합 객체를 닫음
        rs.close();

        //ajax를 할때 요걸 참고하면 좋음
    }catch (ex){
        console.error(ex);
    }finally {
        if (conn) {
            try{
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공')
            }catch(ex){console.error(ex);}
        }
    }

}

main();