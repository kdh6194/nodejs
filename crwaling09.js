// hanbit.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긁어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html
// 수집된 데이터들은 newbooks라는 테이블에 저장해 둠

// create table newbooks (
//     bookno number(6),
//     title varchar2(250) not null,
//     writer varchar(100) not null,
//     price number not null,
//     regdate date default sysdate,
//     primary key (bookno)
// );
//
// create sequence bkno; // --> 순번 생성기

const axios = require('axios');
const cheerio = require('cheerio');
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

async function main() {
    //지정한 사이트로부터 도서제목, 저자, 가격을 추출해서 JSON객체로 저장

    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';
    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'};

    let [titles, writers, prices, books] = [[],[],[],[]];
    //전개연산자 : 각자 순서에 맞는 짝궁 찾아가는거임

    const html = await axios.get(URL, {
        headers: headers
    });
    const dom = cheerio.load(html.data);

    let elements = dom('.book_tit');
    elements.each((idx, title) => {
        titles.push(dom(title).text());
    });

    let athor = dom('.book_writer');
    athor.each((idx, writer) => {
        writers.push(dom(writer).text());
    });

    let price = dom('.price');
    price.each((idx, price) => {
        prices.push(dom(price).text());
    })

    for (let i = 0; i < titles.length; ++i) {
        let book = {};
        book.title = titles[i].trim();
        book.writer = writers[i].replace(/ /g, '');
        book.price = prices[i].replace(/[,|원]/g, '');
        books.push(book);
    }

    //오라클 테이블에 저장
    let conn = null;
    let sql ='insert into newbooks (bookno,title,writer,price)' +
        'values (bkno.nextval, :1,:2,:3)';
    let params = [];

    try{
        oracledb.initOracleClient({libDir:'C:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);

        for (let bk of books) {
            params = [bk.title,bk.writer,bk.price];
            let result = await conn.execute(sql, params);
            await conn.commit();
            console.log(result)
        }

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