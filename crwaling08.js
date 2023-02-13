// 셀레니엄을 이용해서 k-apt.go.kr에서
// 2023,1월, 서울특별시 강남구, 삼성도, 아이파크삼성동의 주차장


const {Builder,Browser,By,Key,until, Select} = require('selenium-webdriver');

async function main() {
    const URL = 'https://k-apt.go.kr/';

    const chrome = await new Builder(Browser.CHROME).forBrowser(Browser.CHROME).build();

    try {
        await chrome.get(URL);

        // 기본단지 기본정보 버튼이 표시될때까지 5초 대기
        await chrome.wait(until.elementLocated(By.css('#nav > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)')),5000);
        //단지정보 버튼 클릭
        // let btn = await chrome.findElement(By.css('ul.wp220 li a'));
        // xpath를 사용하면 상당히 직관적으로 찾을 수 있다.
        // By.xpath('//태그[@선택자="지칭하는 단어"]')
        let btn = await chrome.findElement(By.xpath('//a[@title="단지정보"]'));
        await chrome.actions().move({origin : btn}).click().perform();
        //우리단지 기본정보 버튼 클릭
        let btn1 = await chrome.findElement(By.xpath('//a[@title="우리단지 기본정보"]'));
        await chrome.actions().move({origin : btn1}).click().perform();

        await chrome.sleep(1000)

        //------------------------
            let syear = '2023년';
            let smonth = '01월';
            let sido = '서울특별시';
            let gugun = '강남구';
            let dong = '삼성동';
            let apt = '아이파크삼성동';

            // 검색년도 값 설정
            let select = await chrome.findElement(By.name('searchYYYY'));
            await new Select(select).selectByVisibleText(syear);
            await sleep(500);
            //검색 월 값 설정
            let select1 = await chrome.findElement(By.name('searchMM'));
            await new Select(select1).selectByVisibleText(smonth);
            await sleep(500);
            //검색시도 값 설정
            let select2 = await chrome.findElement(By.name('combo_SIDO'));
            await new Select(select2).selectByVisibleText(sido);
            await sleep(500);
            //검색구군 값 설정
            let select3 = await chrome.findElement(By.name('combo_SGG'));
            await new Select(select3).selectByVisibleText(gugun);
            await sleep(500);
            //검색동 값 설정
            let select4 = await chrome.findElement(By.name('combo_EMD'));
            await new Select(select4).selectByVisibleText(dong);
            await sleep(500);
            //검색결과 출력 - 아파트명, 주소
            let select5 = await chrome.findElements(By.css('.aptS_rLName'));
            let select6 = await chrome.findElements(By.css('.aptS_rLAdd'));

            let pickss = [], Addr= []
            await chrome.getPageSource();
            for(let pick of select5){
            let pick1 = (await pick.getAttribute('textContent')).trim();
            pickss.push(pick1);
            }
            for(let pick of select6){
                let pick1 = (await pick.getAttribute('textContent')).trim();
                Addr.push(pick1);
            }
            for(let i =0; i <pickss.length;++i) {
                console.log(`${pickss[i]} ${Addr[i]}`)
            }

            await sleep(500);

    }catch (ex){
        console.log(ex);
    }finally {
        await  chrome.quit();
    }
}

const sleep = (ms) => new Promise(resolve=>setTimeout(resolve,ms));

main();