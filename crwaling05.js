// 코로나 19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 정보 출력
//https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
//?serviceKey=FM5Mq6NZeNln0s%2B2bQ1bW6ExJo6RUAYRWt9rH9GWfrnyAKE1KpOTfAzotyYJllPtBCpEEdXtJwU4lgyVpLrsXA%3D%3D&pageNo=1&numOfRows=500&apiType=xml&std_day=2023-02-13&gubun=서울

//사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios'); //Ajax 라이브러리;
const {XMLParser} = require('fast-xml-parser') // xml 처리기 라이브러리

async function main() { //비동기 I/O 지원 함수 정의
        // 인증 vs 인가
        //접속할 url, 쿼리스트링,  지정
        const URL = 'http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api';
        const params = {'serviceKey' : 'FM5Mq6NZeNln0s+2bQ1bW6ExJo6RUAYRWt9rH9GWfrnyAKE1KpOTfAzotyYJllPtBCpEEdXtJwU4lgyVpLrsXA==',
        'apiType' : 'xml','std_day':'2023-02-13','gubun':'','numOfRows':'500','ver':1.3};
        // servicKey는 일반 인증키를 넣어야 작동 도메인 주소창에 뜨는 servicekey는 넣는 것이 아님
        // apiType이나 returnType으로 작성해도 상관없다 apiType : xml 또는 JSON
        // pageNo=1&numOfRows=500&apiType=xml&std_day=2023-02-13&gubun=서울 여기서 데이터 값들을 확인
        // 지정한 데이터 값이 다르면 인식을 하지못해서 에러 발생
        //params의 빈칸이 생겨 오류가 발생함
        const headers = {'User-Agent' :'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'};


        //axios로 접속해서 대기오염정보를 받아옴
        const xml = await axios.get(URL,{
                params : params, headers : headers
        });

        // 받아온 데이터 잠시 확인
        // console.log(xml.data);
        // 선택자 태그를 달고 출력됨  ex) <deathCnt>1296</deathCnt>

        // XML로 변환하기
        const parser = new XMLParser();
        let json = parser.parse(xml.data);

        // JSON 으로 불러오기
        let items = json['response']['body']['items'];
        // console.log(items['item']);
        // json형식을 출력됨  ex) deathCnt: 8297

        // 전국 확진자 정보 출력
        for (let item of items['item']){
                console.log(`지역 : ${item.gubun}, 전일 확진자수 : ${item.incDec}, 총 확진자수 : ${item.defCnt}, 사망자수 : ${item.deathCnt}, 측정일 : ${item.stdDay}`)

        }

        }
        main();




