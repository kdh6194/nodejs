// hanbit.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html
// https://www.hanbit.co.kr/store/books/new_book_list.html

//사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios'); //Ajax 라이브러리
const cheerio = require('cheerio'); //DOM 라이브러리

async function main() { //비동기 I/O 지원 함수 정의
        //접속할 url 지정
        const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';

        //axios로 접속해서 html를 불러옴
        const html = await axios.get(URL); //비동기 I/O 지원

        // 불러온 html을 parsing해서 DOM 생성
        const dom = cheerio.load(html.data)
        //console.log(dom) 출력 확인용

        // css 선택자로 도서 제목을 담고 있는 요소 지정
        let elements = dom('.book_tit');
        // css 선택자로 저자를 담고 있는 요소 지정
        let athor = dom('.book_writer');

        let price = dom('.price')

        // 찾은 요소를 순회

        // .text() : class로 지정된 태그 안에 있는
        // 태그들을 무시하고 안에 있는 텍스트만 가지고 오게 하는 메서드

        // 값을 가져오는 범위도 출력되고 있는 페이지에서만 가져오고 있다
        elements.each((idx,title)=>{
                console.log(dom(title).text());
        });

        athor.each((idx,writer)=>{
                console.log(dom(writer).text());
        });

        price.each((idx,price)=>{
                console.log(dom(price).text());
        })

        // Array.from(price).forEach((price)=>{
        //         console.log(dom(price).text());
        // }) 위에 price.each와 같은 값을 출력한다

        // Array.from(변수명).forEach(()=>{
        //      console.log(dom(변수명).text());
        // })
        // 이렇게 사용하면 값은 나오지만 엄청 많이 반복된다
        // 이유는 객체의 수(책 정보)만큼
        // 해당 페이지의 모든 가격을 호출한다고 보면된다
        // .each 나 .forEach 를 쓰면 될듯 싶다





        }

        main();




