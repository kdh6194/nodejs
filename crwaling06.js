// movie.daum.net 사이트에서 '상영중인 영화'에 대한 정보를 긁어오기
// 순위, 영화제목, 예약율, 평점
// 동적페이지들을은 ajax등이 실행되어야 코드를 긁어올수있다
// axios 으로는 긁어올 수 없다.
// csr(클라이언트 서버 렌더링)

//사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios'); //Ajax 라이브러리
const cheerio = require('cheerio'); //DOM 라이브러리
const {Builder,Browser,By,Key,until} = require('selenium-webdriver')


async function movie() { //비동기 I/O 지원 함수 정의
        //접속할 url 지정
        const URL = 'https://movie.daum.net/main';

        // 크롬 자동화 브라우져 객체 생성
        const chrome = await new Builder().forBrowser(Browser.CHROME).setChromeOptions().build();

        try {
                // 지정한 url로 접속
                await chrome.get(URL);

                // 특정 요소가 화면에 위치할때까지 최대 5초간 기다려 줌
                await chrome.wait(until.elementLocated(By.css('.feature_home div:nth-child(3).slide_ranking .tit_item')), 5000);

                // 접속한 사이트의 html 소스를 가져옴
                const html = await chrome.getPageSource();
                // console.log(html);

                // 5초 정도 잠시 대기 -> 굳이 필요없어서 주석 처리 해버림
                // await chrome.sleep(5000);

                //페이지소스를 DOM객체롤 변환
                const dom = cheerio.load(html);

                // 영화제목들 추출
                let movies = dom('.feature_home div:nth-child(3).slide_ranking .tit_item');
                let avgs = dom('.feature_home div:nth-child(3).slide_ranking .txt_num:first-child');
                let reserves = dom('.feature_home div:nth-child(3).slide_ranking .txt_num:last-child');
                let ranks = dom('.feature_home div:nth-child(3).slide_ranking .rank_num');
                //클래스 안에 각각의 값이 입력 되어있지만 클래스 명이 같은 경우
                //:last-child와 :first-child를 입력하여 해당순번의 값을 가져온다
                // 그외에 여러개면 :nth-child(해당 순번)를 입력하면 된다

                //추출한 결과를 저장하기 위한 배열 선언
                let moviess = [], rankss = [], reservess = [], avgss = [];

                // 추출된 영화제목 출력
                movies.each((idx, movie) => {
                        let point = dom(movie).text().trim()
                        // console.log(dom(movie).text().trim())
                        moviess.push(point)
                }); // dom(movie).text 이렇게 쓰면 에러가 발생합니다(값 출력이 되지 않음)
                avgs.each((idx, avg) => {
                        let point = dom(avg).text()
                        avgss.push(point)
                })
                reserves.each((idx, reserve) => {
                        let point = dom(reserve).text()
                        reservess.push(point)
                })
                ranks.each((idx, rank) => {
                        let point = dom(rank).text()
                        rankss.push(point)
                })

                // 한번에 모아서 출력
                for (let i = 0; i < moviess.length; ++i) {
                        console.log(`${moviess[i]},${rankss[i]},${reservess[i]},${avgss[i]}`)
                }

        }catch(ex){
                console.log(ex);
        }finally {
                await chrome.quit(); //크롬 브라우져를 닫아야 리소스를 줄일 수 있다.
        }

        //axios로 접속해서 html를 불러옴
        const html = await axios.get(URL,{
                headers : {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'}
        }); // 서버 요청시 User-Agent 헤더(headers)사용



        }

        movie();




