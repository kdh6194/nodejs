// 코로나 19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 정보 출력
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=FM5Mq6NZeNln0s%2B2bQ1bW6ExJo6RUAYRWt9rH9GWfrnyAKE1KpOTfAzotyYJllPtBCpEEdXtJwU4lgyVpLrsXA%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=서울&ver=1.0


//사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios'); //Ajax 라이브러리
const cheerio = require('cheerio'); //DOM 라이브러리
const  fs = require('fs');
const  path = require('path');
const {XMLParser} = require('fast-xml-parser') // xml 처리기 라이브러리

async function main() { //비동기 I/O 지원 함수 정의
        // 인증 vs 인가
        //접속할 url, 쿼리스트링,  지정
        const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
        const params = {'serviceKey' : 'FM5Mq6NZeNln0s+2bQ1bW6ExJo6RUAYRWt9rH9GWfrnyAKE1KpOTfAzotyYJllPtBCpEEdXtJwU4lgyVpLrsXA==',
        'returnType' : 'xml', 'sidoName' : '서울' , 'numOfRows':'1000', 'ver':1.3};
        //params의 빈칸이 생겨 오류가 발생함
        const headers = {'User-Agent' :'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'};


        //axios로 접속해서 대기오염정보를 받아옴
        const xml = await axios.get(URL,{
                params : params, headers : headers
        });

        // 받아온 데이터 잠시 확인
        // console.log(xml.data);

        // XML로 변환하기
        const parser = new XMLParser();
        let json = parser.parse(xml.data);

        // JSON 으로 불러오기
        let items = json['response']['body']['items'];
        console.log(items['item']);

        // // 미세먼지 정보 출력
        // // pm25Value는 출력 안됨
        for (let item of items['item']){
                console.log(item.sidoName, item.stationName,item.pm10Value,item.pm25Value,item.dataTime,
                item.pm10Grade, item.pm25Grade)


        let pmGrade = (pm25Grade) => {

                let emojis = ['😱', '😰', '😐', '😍']
                return emojis[parseInt(pm25Grade) - 1]
                }
        }

        }
        main();




