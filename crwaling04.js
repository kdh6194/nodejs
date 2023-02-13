// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=FM5Mq6NZeNln0s%2B2bQ1bW6ExJo6RUAYRWt9rH9GWfrnyAKE1KpOTfAzotyYJllPtBCpEEdXtJwU4lgyVpLrsXA%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=서울&ver=1.0


//사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios'); //Ajax 라이브러리
const cheerio = require('cheerio'); //DOM 라이브러리
const  fs = require('fs');
const  path = require('path');

async function main() { //비동기 I/O 지원 함수 정의
        // http 로 쓴 이유 : 인증을 아직 안해서라고 했던것 같음
        //접속할 url, 쿼리스트링,  지정
        const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
        const params = {'serviceKey' : 'FM5Mq6NZeNln0s+2bQ1bW6ExJo6RUAYRWt9rH9GWfrnyAKE1KpOTfAzotyYJllPtBCpEEdXtJwU4lgyVpLrsXA==',
        'returnType' : 'json', 'sidoName' : '서울' , 'numOfRows':'1000', 'ver':1.3};
        //params의 빈칸이 생겨 오류가 발생함
        const headers = {'User-Agent' :'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'};


        //axios로 접속해서 대기오염정보를 받아옴
        const json = await axios.get(URL,{
                params : params, headers : headers
        });

        // JSON 으로 불러오기
        let items = json.data['response']['body']['items'];

        // 등급별 이모지
        //😍 : 1 😐 : 2 😰 : 3 😱 : 4
        // 함수를 이용해서 만들면 된다
        // grade에 값을 넣고 이모지가 나오게 만들라

        // 미세먼지 정보 출력
        // pm25Value는 출력 안됨  -> 'ver':1.3 버젼 문제로 출력이 되지 않았음
        for (let item of items){
                let pmGrade = (pm25Grade) => {
                        let emoji = `매우나쁨 😱`
                        switch (pm25Grade != 0) {
                                case pm25Grade > 1 : emoji = `좋음 😍`; break;
                                case pm25Grade > 2 : emoji = `보통 😐`; break;
                                case pm25Grade > 3 : emoji = `나쁨 😰`; break;

                        }
                        return emoji

                        // let emojis = ['😱','😰','😐','😍']
                        // return emojis[parseInt(pm25Grade)-1]
                        //      -> null값때문에 undefined가 결과값으로 출력되는 모양이다
                }

                console.log(item.sidoName, item.stationName,item.pm10Value,item.pm25Value,item.dataTime,
                 pmGrade(item.pm10Value),pmGrade(item.pm25Value))
                }




        }
        main();




