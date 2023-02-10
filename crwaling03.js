// hanbit.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html
// https://www.hanbit.co.kr/store/books/new_book_list.html
// https://www.hanbit.co.kr/store/books/new_book_list.html

//사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios'); //Ajax 라이브러리
const cheerio = require('cheerio'); //DOM 라이브러리
const  fs = require('fs');      //파일시스템 관련 라이브러리
const  path = require('path');  //파일경로 관련 라이브러리


async function main() { //비동기 I/O 지원 함수 정의
        //접속할 url 지정
        const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';

        //수집한 개별정보를 저장하기 위해 배열 선언
        let titles = [], writers = [], prices = [];
        let books = [];

        //axios로 접속해서 html를 불러옴
        const html = await axios.get(URL,{
                headers : {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'}
        }); // 서버 요청시 User-Agent 헤더(headers)사용
        // 웹페이지의 검사기에서
        // 네트워크-> 네트워크파일 -> 머리글(헤더)
        // ->요청헤더-> User-Agent 의 정보를 가져와야함

        // 불러온 html을 parsing해서 DOM 생성
        const dom = cheerio.load(html.data);
        //console.log(dom) 출력 확인용

        // css 선택자로 도서 제목을 담고 있는 요소 지정
        let elements = dom('.book_tit');
        // css 선택자로 저자를 담고 있는 요소 지정
        let athor = dom('.book_writer');

        let price = dom('.price');

        // 찾은 요소를 순회

        elements.each((idx,title)=>{
                // console.log(dom(title).text());
                titles.push(dom(title).text());
        });

        athor.each((idx,writer)=>{
                // console.log(dom(writer).text());
                writers.push(dom(writer).text());
        });

        price.each((idx,price)=>{
                // console.log(dom(price).text());
                prices.push(dom(price).text());
        })

        // 저장된 배열 요소 갯수 확인
        console.log(titles.length,writers.length,prices.length);

        // 수집한 정보들을 JSON 객체로 생성
        for(let i = 0; i <titles.length; ++i) {
                let book = {};
                book.title = titles[i].trim();
                book.writer = writers[i].replace(/ /g,'');
                book.price = prices[i].replace(/[,|원]/g,'');
                books.push(book);
        }
        //생성된 도서 객체 확인
        console.log(books);
        //.replace(/[,|원]/g,'') 사용자가 지우려하는 텍스트,공백을 설정하면 실행
        //.trim은 공백제거하는데 탁월함

        // 생성된 도서 객체를 JSON 문자열로 변환
        const bookJSON = JSON.stringify(books);

        // data 라는 폴더가 있는지 확인 - 없으면 생성
        !fs.existsSync('data') && fs.mkdirSync('data');

        // 저장위치와 파일명 지정후 파일에 저장
        // __dirname : 현재 디렉토리 경로
        const fpath = path.join(__dirname, 'data','books.json');
        fs.writeFileSync(fpath,bookJSON)


        }

        main();




